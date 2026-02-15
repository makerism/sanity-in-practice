import { defineQuery } from 'groq';

const IMAGE_QUERY = `
  ...,
  asset -> {
    ...
  }
`;

const RICHTEXT_QUERY = `
  ...,
  _type == "richImage" => {
    ${IMAGE_QUERY}
  }
`;

const ARTICLE_QUERY = `
  ...,
  coverImage {
    ${IMAGE_QUERY}
  },
  content[] {
    ${RICHTEXT_QUERY}
  },
`;

const SECTIONS_QUERY = `
  ...,
  _type == "centeredImage" => {
    image {
      ${IMAGE_QUERY}
    }
  },
  _type == "fullWidthImage" => {
    image {
      ${IMAGE_QUERY}
    }
  },
  _type == "splitPane" => {
    firstPane {
      ...,
      image {
        ${IMAGE_QUERY}
      }
    },
    secondPane {
      ...,
      image {
        ${IMAGE_QUERY}
      }
    }
  },
  _type == "textImage" => {
    image {
      ${IMAGE_QUERY}
    },
    content[] {
      ${RICHTEXT_QUERY}
    },
  },
`;

const PAGE_QUERY = `
  ...,
  sections[] {
    ${SECTIONS_QUERY}
  },
`;

const ANNOUNCEMENT_QUERY = `
  ...,
  content[] {
    ${RICHTEXT_QUERY}
  },
`;

const SETTINGS_QUERY = `
  ...,
  activeAnnouncement -> {
    ${ANNOUNCEMENT_QUERY}
  },
`;

const EVENT_QUERY = `
  ...,
  coverImage {
    ${IMAGE_QUERY}
  }
`;

export const INDEX_PAGES_QUERY = defineQuery(
  `*[_type == "page"] | order(publishedAt desc) { ${PAGE_QUERY} }`,
);

export const GET_PAGE_BY_SLUG_QUERY = defineQuery(
  `*[_type == "page" && slug.current == $slug][0] { ${PAGE_QUERY} }`,
);

export const INDEX_ARTICLES_QUERY = defineQuery(
  `*[_type == "article"] | order(publishedAt desc) { ${ARTICLE_QUERY} }`,
);

export const GET_ARTICLE_BY_SLUG_QUERY = defineQuery(
  `*[_type == "article" && slug.current == $slug][0] { ${ARTICLE_QUERY} }`,
);

export const GET_SETTINGS_QUERY = defineQuery(
  `*[_type == "settings" && _id == "settings"][0] { ${SETTINGS_QUERY} }`,
);

export const INDEX_EVENTS_QUERY = defineQuery(
  `*[_type == "event"] | order(startsAt desc) { ${EVENT_QUERY} }`,
);

export const GET_EVENT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "event" && slug.current == $slug][0] { ${EVENT_QUERY} }`,
);
