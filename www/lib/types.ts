import * as Sanity from '../../cms/sanity.types';
export * as Sanity from '../../cms/sanity.types';

export type Globals = {
  settings: NonNullable<Sanity.GET_SETTINGS_QUERY_RESULT>;
};

export type Sections = NonNullable<Sanity.GET_PAGE_BY_SLUG_QUERY_RESULT>['sections'];

export type FullWidthImageSection = Extract<Sections[number], { _type: 'fullWidthImage' }>;

export type CenteredImageSection = Extract<Sections[number], { _type: 'centeredImage' }>;

export type SplitPaneSection = Extract<Sections[number], { _type: 'splitPane' }>;

export type TextImageSection = Extract<Sections[number], { _type: 'textImage' }>;

export type UpcomingEventsSection = Extract<Sections[number], { _type: 'upcomingEvents' }>;

export type Article = NonNullable<Sanity.GET_ARTICLE_BY_SLUG_QUERY_RESULT>;

export type Event = NonNullable<Sanity.GET_EVENT_BY_SLUG_QUERY_RESULT>;
