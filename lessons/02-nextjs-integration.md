# Lesson 2: Next.js Integration

Everything in this lesson lives in `www/`. We're working backwards from working code — walking through the patterns used to connect a Next.js app to the Sanity Studio we built in Lesson 1.

---

## GROQ Basics

GROQ (Graph-Relational Object Queries) is Sanity's query language. If you've used GraphQL or SQL, the shape will feel familiar but the syntax is its own thing.

The basic pattern:

```groq
*[_type == "article"] | order(publishedAt desc) { title, slug, publishedAt }
```

- `*` — all documents
- `[_type == "article"]` — filter
- `| order(publishedAt desc)` — pipe to sort
- `{ title, slug, publishedAt }` — projection (which fields to return)

Add `[0]` after the filter to get a single document instead of an array:

```groq
*[_type == "article" && slug.current == $slug][0]
```

`$slug` is a parameter — passed in at query time, not hardcoded.

References are stored as IDs. To get the actual data, you **dereference** with `->`:

```groq
*[_type == "event"] {
  title,
  categories[] -> { title, slug }
}
```

Without `->`, `categories` would return `[{ _ref: "abc123..." }, ...]` — just IDs, not the actual category data.

The Vision tool in Sanity Studio lets you test GROQ queries interactively — useful for experimenting before writing any code. Now we'll see how queries are used in a Next.js app.

---

## Setting Up the Sanity Client

[`www/lib/sanity/index.ts`](../www/lib/sanity/index.ts)

Creates the client, an image URL builder, and namespaced API methods:

- **`client`** — `createClient` with project ID, dataset, API version, and `useCdn: false` (we're fetching at build time, not from a CDN edge cache).
- **`imageBuilder` / `urlForImage`** — Wraps `@sanity/image-url`. Given an image source, returns a builder you can chain `.width()`, `.height()`, `.format()` on. Used everywhere images appear.
- **`Globals.get()`** — Fetches settings (site title, description, favicon, active announcement). Returns a `Globals` type that flows through layouts.
- **`Articles`**, **`Pages`**, **`Events`** — Each namespace groups related queries: `.index()` for lists, `.getBySlug()` for detail pages.

This gives you call sites like `Sanity.Articles.getBySlug(slug)` — clear about what's being fetched and where it comes from.

---

## GROQ Query Fragments

[`www/lib/sanity/queries.ts`](../www/lib/sanity/queries.ts)

Queries get big fast. The approach here is composable fragments — private template literals that nest into each other:

- **`IMAGE_QUERY`** — Spreads all fields and follows the `asset` reference (`asset -> { ... }`). Without this, you'd just get the reference ID, not the actual image data (dimensions, URL, alt text).
- **`LINK_QUERY`** — Spreads all fields and follows the `reference` to get `_type` and `slug`. This is the cost of internal links mentioned in Lesson 1 — every link needs a dereference to resolve where it points.
- **`RICHTEXT_QUERY`** — Handles both inline images (`_type == "richImage"`) and link annotations inside `markDefs[]`. Each uses the fragments above.

These compose upward:

- **`ARTICLE_QUERY`** uses `IMAGE_QUERY` for `coverImage` and `RICHTEXT_QUERY` for `content[]`
- **`SECTIONS_QUERY`** uses `IMAGE_QUERY`, `LINK_QUERY`, and `RICHTEXT_QUERY` across section types
- **`SETTINGS_QUERY`** follows `activeAnnouncement ->` and applies `RICHTEXT_QUERY` inside it

The exported queries wrap these in `defineQuery()`:

```ts
export const GET_ARTICLE_BY_SLUG_QUERY = defineQuery(
  `*[_type == "article" && slug.current == $slug][0] { ${ARTICLE_QUERY} }`,
);
```

`defineQuery` is from the `groq` package. It marks the query string so that typegen can find it and generate a result type.

**`pt::text()` for plain text** — In `ARTICLE_QUERY`, the projection `"excerptPlainText": pt::text(excerpt)` converts Portable Text to a plain string server-side in GROQ. This gives you SEO-ready text for meta descriptions and share cards without running the PortableText renderer in JavaScript.

---

## Running Typegen

From `cms/`:

```bash
pnpm typegen
# runs: sanity schema extract --enforce-required-fields && sanity typegen generate
```

This reads the `defineQuery` calls in `www/lib/sanity/queries.ts` and generates result types into [`www/lib/sanity/types.ts`](../www/lib/sanity/types.ts). Don't edit this file — it's regenerated every time.

The generated types include both schema-derived base types (`Article`, `Event`, `Page`, `Sections`, etc.) and query result types (`GET_ARTICLE_BY_SLUG_QUERY_RESULT`, `INDEX_EVENTS_QUERY_RESULT`, etc.). The query result types are fully resolved — references are dereferenced, computed fields like `excerptPlainText` are included.

---

## App-Level Type Aliases

[`www/lib/types.ts`](../www/lib/types.ts)

Raw typegen types are verbose. This file creates clean aliases that the rest of the app imports as `Types.Article`, `Types.Event`, etc.

---

## Routing: Pages, Articles, Events

Next.js App Router structure:

```
app/
├── layout.tsx              ← root layout, site-wide metadata
├── page.tsx                ← home (fetches page with slug "home")
├── [slug]/page.tsx         ← CMS pages
├── articles/
│   ├── page.tsx            ← article index
│   └── [slug]/page.tsx     ← article detail
└── events/
    └── page.tsx            ← event index
```

### The `[slug]/page.tsx` pattern

[`www/app/[slug]/page.tsx`](../www/app/%5Bslug%5D/page.tsx)

Each dynamic route exports three things: `generateStaticParams` (build-time paths), `generateMetadata` (SEO), and the default page component. [`www/app/articles/[slug]/page.tsx`](../www/app/articles/%5Bslug%5D/page.tsx) follows the same pattern.

---

## Metadata

### Layout-level metadata

[`www/app/layout.tsx`](../www/app/layout.tsx)

`generateMetadata` fetches `Globals.get()` and returns site-wide `title`, `description`, and favicon. The favicon uses `urlForImage` to generate sized PNG URLs from the Sanity image asset.

### Page-level metadata

Each `[slug]/page.tsx` exports its own `generateMetadata`. For articles, `excerptPlainText` (from the `pt::text()` GROQ projection) becomes the meta description. For pages, it comes from the `metadata.description` field.

For og:image, `urlForImage` converts the cover image to a URL.

---

## Index Pages & Card Components

[`www/views/articles-index.tsx`](../www/views/articles-index.tsx), [`www/views/events-index.tsx`](../www/views/events-index.tsx), [`www/ui/article-card.tsx`](../www/ui/article-card.tsx), [`www/ui/event-card.tsx`](../www/ui/event-card.tsx)

Standard card components that get reused throughout the app. This is a design decision, but common in most apps — index views receive typed data as props and map over it, rendering cards in a grid.

---

## Pattern: Custom Image Component

[`www/ui/image.tsx`](../www/ui/image.tsx)

Wraps Next.js `<Image>` with Sanity's URL builder. You pass it a Sanity image object and it:

1. Builds the URL via `urlForImage`
2. Pulls `alt` from `asset.altText` (falls back to `"Image"`)
3. Pulls `width` and `height` from `asset.metadata.dimensions`

This is why `IMAGE_QUERY` follows the `asset ->` reference — without it you wouldn't have the dimensions or alt text needed for a proper `<img>` tag.

Also requires adding `cdn.sanity.io` to the allowed remote patterns in [`www/next.config.ts`](../www/next.config.ts):

```ts
images: {
  remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
},
```

---

## Pattern: Sections Component

[`www/ui/sections/index.tsx`](../www/ui/sections/index.tsx)

The component that maps section `_type` to React components:

```ts
if (section._type === 'centeredImage') return <CenteredImage key={section._key} section={section} />;
if (section._type === 'fullWidthImage') return <FullWidthImage key={section._key} section={section} />;
// ...
```

**Async sections** — [`www/ui/sections/upcoming-events.tsx`](../www/ui/sections/upcoming-events.tsx) is an async Server Component. It calls `Sanity.Events.upcoming()` directly — no props needed for the event data. This works because React Server Components can be async. Good pattern for sections that need live data rather than data passed down from the page query.

---

## Pattern: Rich Text Rendering

[`www/ui/rich-text.tsx`](../www/ui/rich-text.tsx)

Uses `@portabletext/react` to map Portable Text blocks to React components:

- **`block`** — Maps heading levels to typography components (`Text.Heading`, `Text.Subheading`, etc.)
- **`list`** — `bullet` → `<ul>`, `number` → `<ol>`
- **`types`** — `richImage` renders through the custom `Image` component
- **`marks`** — `link` renders through the custom `Link` component, which resolves Sanity references via `Paths.forEntity()`

The component wraps everything in a `<div className="rich-text">`.

### Styling: CSS, not the serializer

[`www/app/globals.css`](../www/app/globals.css) — `.rich-text` class

```css
.rich-text {
  h2 {
    margin-top: 4rem;
    margin-bottom: 2rem;
  }
  h3 {
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }
  p {
    margin-top: 1rem;
  }
  ul,
  ol {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    list-style-position: outside;
    padding-left: 1rem;
  }
  a {
    color: var(--color-primary);
    text-decoration: underline;
    text-decoration-style: dotted;
  }
  /* ... */
}
```

Key insight: spacing and list styles live in CSS, not in the PortableText serializer. The serializer maps blocks to semantic HTML elements (`<h2>`, `<p>`, `<ul>`). The `.rich-text` class handles the visual rhythm. This means if you ever render markdown or rich text from a non-Sanity source, wrapping it in `<div className="rich-text">` gives it the same styling for free.
