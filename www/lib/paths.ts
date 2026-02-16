export const Home = {
  index: () => '/',
};

export const Articles = {
  index: () => '/articles',
  show: (slug: string) => `/articles/${slug}`,
};

export const Events = {
  index: () => '/events',
  show: (slug: string) => `/events/${slug}`,
};

export const Pages = {
  show: (slug: string) => `/${slug}`,
};

export type LinkableEntity = {
  _type: string;
  slug: {
    current: string;
  };
};

export const forEntity = (document: LinkableEntity) => {
  if (document._type === 'article') return Articles.show(document.slug.current);
  if (document._type === 'event') return Events.show(document.slug.current);
  if (document._type === 'page') return Pages.show(document.slug.current);
  throw new Error(`[Paths.forEntity] Unknown entity type: ${document._type}`);
};
