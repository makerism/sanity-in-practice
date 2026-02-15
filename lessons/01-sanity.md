# Lesson 1: Sanity Studio Setup

This project is a pnpm monorepo with two packages: `cms/` (Sanity Studio) and `www/` (Next.js frontend). Everything in this lesson lives in `cms/`.

---

## Create a New Studio

```bash
pnpm create sanity@latest
```

Follow the prompts. This gives you a working Studio with `sanity.config.ts`, `sanity.cli.ts`, and a `schemas/` directory.

---

## Config

[`cms/sanity.config.ts`](../cms/sanity.config.ts) — Entry point. Registers plugins and schemas.

- **`structureTool`** — Lets us customize sidebar navigation. Takes our custom structure resolver.
- **`visionTool`** — GROQ query playground inside the Studio. Great for testing queries.
- **`media`** (`sanity-plugin-media`) — Browseable media library.

---

## Pattern: Icons

[`cms/lib/icons.tsx`](../cms/lib/icons.tsx)

Set this up early. Re-export from `lucide-react` with semantic names so every schema and structure item uses a consistent icon. Editors see these in the sidebar, document lists, and array item previews. Easy to swap later without hunting through every file.

---

## Pattern: Custom Structure

[`cms/lib/structure.tsx`](../cms/lib/structure.tsx)

By default, Sanity auto-generates a sidebar from your document types. A custom structure gives you control over ordering, grouping, dividers, and singletons.

Key thing to point out: Settings uses `S.document().schemaType('settings').documentId('settings')` instead of `S.documentTypeList()`. This is the **singleton pattern** — it always opens the same document rather than showing a list.

---

## Schema: Settings (Singleton)

[`cms/schemas/settings.tsx`](../cms/schemas/settings.tsx)

The schema itself is a regular `document` type. What makes it a singleton is how we register it in `structure.tsx` — we pin it to the ID `'settings'`.

Has an `activeAnnouncement` reference field — points to a single Announcement document.

---

## Schema: Announcements

[`cms/schemas/announcement.tsx`](../cms/schemas/announcement.tsx)

Announcements are their own document type rather than a field on Settings. Every Sanity document has a unique `_id`, which lets us track state on the front-end — e.g. marking an announcement as "seen" when a user dismisses it (store the ID in localStorage). Also useful for analytics: attribute dismissals or clicks to a specific announcement ID.

To make one visible, reference it in Settings via `activeAnnouncement`.

References two custom types we haven't created yet: `richTextBase` and `link`.

---

## Pattern: Rich Text Variants

[`cms/schemas/rich-text.tsx`](../cms/schemas/rich-text.tsx)

Define tiers instead of one massive rich text config. Keeps the editing experience focused — an excerpt field shouldn't offer H2s and images.

- **Base** — Bold, italic, underline. No links, no headings. For announcements.
- **Simple** — Base + link annotations. For excerpts.
- **Standard** — Headings, lists, links. For page sections.
- **WithImages** — Standard + inline images. For articles.

`WithImages` spreads `Standard.of` and adds the image type. Compose up, don't repeat.

---

## Pattern: Custom Link (Internal + External)

[`cms/schemas/link.tsx`](../cms/schemas/link.tsx)

One of the most useful patterns. A single `link` type that supports either an internal reference or an external URL.

- Custom validation enforces exactly one of `reference` or `href`.
- Two-column fieldset makes it clear to editors that these are alternatives.
- `linkWithLabel` extends the base by spreading its fields and adding a required `label`.

**Gotcha**: Internal links mean your GROQ queries need to resolve the referenced document to get its slug. Queries get bigger. For most sites this is negligible, but worth knowing about.

---

## Pattern: Shared Metadata

[`cms/schemas/metadata.tsx`](../cms/schemas/metadata.tsx)

Any document type that maps to a page route should have consistent SEO metadata. Define it once as an `object` type (description, keywords, cover image) and reuse it.

Used by: `page`, `article`, `event` — each just adds `{ type: 'metadata' }` in a settings group.

---

## Schema: Rich Image

[`cms/schemas/rich-image.tsx`](../cms/schemas/rich-image.tsx)

Extends Sanity's base `image` type with a caption and hotspot support. Standard across the app — the front-end always knows how to render it.

---

## Schema: Person

[`cms/schemas/person.tsx`](../cms/schemas/person.tsx)

Minimal document type — just a name. Can serve multiple roles: article author, event instructor, team member. Because it's a document (not an embedded object), you can reference the same person from anywhere. One update propagates everywhere.

---

## Pattern: Tags and Categories as Documents

[`cms/schemas/tag.tsx`](../cms/schemas/tag.tsx), [`cms/schemas/event-category.tsx`](../cms/schemas/event-category.tsx)

Tags and categories are full document types, not string arrays. This gives you graph-like behavior: query "all articles with this tag" or "all events in this category" using references.

Each has a title and slug. Then in [`event.tsx`](../cms/schemas/event.tsx), categories is an array of references.

---

## Schema: Article

[`cms/schemas/article.tsx`](../cms/schemas/article.tsx)

Ties together many concepts. Walk through:

- **Groups** — `content` and `settings` tabs keep the editing UI organized.
- **Preview** — Shows title, publishedAt, and cover image in document lists.
- **`publishedAt`** — Manual `date` field. Sanity updates `_updatedAt` on every edit, so a typo fix would change your "published" date. A manual field gives editors control and stays stable. Use `_createdAt`/`_updatedAt` for internal sorting or "last modified" indicators, not as the display date.
- **`excerpt`** uses `richTextSimple` (no headings, no images). **`content`** uses `richTextWithImages`. Match the rich text tier to the context.
- **`metadata`** in the settings group.

---

## Schema: Event

[`cms/schemas/event.tsx`](../cms/schemas/event.tsx)

Similar structure to Article — groups, preview, metadata. Key differences: uses `datetime` instead of `date` (events need times), has a `location` field, and references `eventCategory` documents instead of tags. Walk through how the category references connect back to the document types defined earlier.

---

## Pattern: Sections (Page Builder)

[`cms/schemas/sections/`](../cms/schemas/sections/)

Pages are built from an array of section types. The front-end maps each section `_type` to a React component.

The [`sections/index.ts`](../cms/schemas/sections/index.ts) defines the array type with all available section types. Each section is an `object` with its own fields and preview.

Point out [`upcomingEvents`](../cms/schemas/sections/upcoming-events.tsx) — it has just a heading and CTA override. No event data in the schema. The front-end detects the presence of this section type and fetches event data dynamically. This is a good pattern for sections that need live data.

Then in [`page.tsx`](../cms/schemas/page.tsx), it's just `{ type: 'sections' }`. Editors compose pages from a menu of section types.

---

## Schema: Page

[`cms/schemas/page.tsx`](../cms/schemas/page.tsx)

The payoff of the sections pattern. A page document is mostly just a title, slug, and `{ type: 'sections' }`. Editors compose pages from the menu of section types defined above. Has `metadata` in a settings group for SEO.

---

## Registering Schemas

[`cms/schemas/index.ts`](../cms/schemas/index.ts)

All types collected in a single index file and passed to `sanity.config.ts`. Every type — documents, objects, arrays — needs to be here. If you define a type and don't add it to this list, Sanity won't know about it.

---

## Typegen

[`cms/sanity.cli.ts`](../cms/sanity.cli.ts) — `typegen` config block.

Sanity generates TypeScript types from your schema and GROQ queries. The config specifies where your queries live (`../www/lib/sanity/queries.ts`), the extracted schema (`schema.json`), and the output (`sanity.types.ts`).

```bash
pnpm typegen
# runs: sanity schema extract --enforce-required-fields && sanity typegen generate
```

Two steps: extract the schema to JSON, then generate types from your GROQ queries. Front-end query results are fully typed. Re-run when you change a schema field or GROQ projection.

---

## Deploying the Studio

```bash
pnpm deploy
# runs: sanity deploy
```

Builds and deploys to Sanity's hosting. Auto-updates are enabled in `sanity.cli.ts`.

---

## Seed Script

[`cms/seed.ts`](../cms/seed.ts)

For cloning this repo and getting sample content. To generate an API token:

```bash
pnpm sanity tokens add
# When prompted, select the role: "editor"
```

Add to `cms/.env.local`:

```
SANITY_API_TOKEN=sk-...
```

```bash
pnpm seed
```

Uploads images, generates people, tags, categories, announcements, articles, events, pages, and a settings document — all in a single transaction.
