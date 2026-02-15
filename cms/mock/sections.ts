import * as Sanity from '../sanity.types';
import * as Utils from './utils';
import * as RichText from './richtext';

import { faker } from '@faker-js/faker';

type CenteredImageParams = Partial<Sanity.CenteredImage & { _key: string }> & {
  imageAssetId?: string;
};

export const CenteredImage = {
  mock: (params: CenteredImageParams = {}) => {
    const { imageAssetId, ...overrides } = params;
    return {
      _type: 'centeredImage' as const,
      _key: Utils.makeKey(),
      heading: faker.lorem.sentence({ min: 3, max: 6 }).replace(/\.$/, ''),
      subheading: faker.lorem.sentence({ min: 5, max: 10 }).replace(/\.$/, ''),
      image: Utils.imageRef(imageAssetId ?? 'image-placeholder'),
      caption: faker.lorem.sentence(),
      cta: Utils.makeLinkWithLabel('Learn More', faker.internet.url()),
      ...overrides,
    };
  },
};

type FullWidthImageParams = Partial<Sanity.FullWidthImage & { _key: string }> & {
  imageAssetId?: string;
};

export const FullWidthImage = {
  mock: (params: FullWidthImageParams = {}) => {
    const { imageAssetId, ...overrides } = params;
    return {
      _type: 'fullWidthImage' as const,
      _key: Utils.makeKey(),
      heading: faker.lorem.sentence({ min: 3, max: 6 }).replace(/\.$/, ''),
      subheading: faker.lorem.sentence({ min: 5, max: 10 }).replace(/\.$/, ''),
      image: Utils.imageRef(imageAssetId ?? 'image-placeholder'),
      cta: Utils.makeLinkWithLabel('Get Started', faker.internet.url()),
      ...overrides,
    };
  },
};

type SplitPaneParams = Partial<Sanity.SplitPane & { _key: string }> & {
  firstImageAssetId?: string;
  secondImageAssetId?: string;
};

export const SplitPane = {
  mock: (params: SplitPaneParams = {}) => {
    const { firstImageAssetId, secondImageAssetId, ...overrides } = params;
    return {
      _type: 'splitPane' as const,
      _key: Utils.makeKey(),
      firstPane: {
        eyebrow: faker.lorem.word(),
        heading: faker.lorem.sentence({ min: 3, max: 6 }).replace(/\.$/, ''),
        image: Utils.imageRef(firstImageAssetId ?? 'image-placeholder'),
      },
      secondPane: {
        eyebrow: faker.lorem.word(),
        heading: faker.lorem.sentence({ min: 3, max: 6 }).replace(/\.$/, ''),
        image: Utils.imageRef(secondImageAssetId ?? 'image-placeholder'),
      },
      ...overrides,
    };
  },
};

type TextImageParams = Partial<Sanity.TextImage & { _key: string }> & {
  imageAssetId?: string;
};

export const TextImage = {
  mock: (params: TextImageParams = {}) => {
    const { imageAssetId, ...overrides } = params;
    return {
      _type: 'textImage' as const,
      _key: Utils.makeKey(),
      heading: faker.lorem.sentence({ min: 3, max: 6 }).replace(/\.$/, ''),
      subheading: faker.lorem.sentence({ min: 5, max: 10 }).replace(/\.$/, ''),
      content: RichText.Simple.mock([faker.lorem.paragraph(), faker.lorem.paragraph()]),
      image: Utils.imageRef(imageAssetId ?? 'image-placeholder'),
      cta: Utils.makeLinkWithLabel('Read More', faker.internet.url()),
      orientation: faker.helpers.arrayElement(['imageLeft', 'imageRight']) as
        | 'imageLeft'
        | 'imageRight',
      ...overrides,
    };
  },
};

type UpcomingEventsParams = Partial<Sanity.UpcomingEvents & { _key: string }>;

export const UpcomingEvents = {
  mock: (params: UpcomingEventsParams = {}) => ({
    _type: 'upcomingEvents' as const,
    _key: Utils.makeKey(),
    heading: 'Upcoming Events',
    ctaOverride: 'View Full Calendar',
    ...params,
  }),
};
