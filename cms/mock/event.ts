import * as Sanity from '../sanity.types';
import * as Utils from './utils';

import { faker } from '@faker-js/faker';

type Params = Partial<Utils.MockDoc<Sanity.Event>> & {
  coverImageAssetId?: string;
  categoryIds?: string[];
};

export const mock = (params: Params = {}): Utils.MockDoc<Sanity.Event> => {
  const { coverImageAssetId, categoryIds = [], ...overrides } = params;
  const title = overrides.title ?? faker.company.catchPhrase();
  const startsAt = faker.date.soon({ days: 90, refDate: new Date() });
  const endsAt = new Date(
    startsAt.getTime() + faker.number.int({ min: 1, max: 4 }) * 60 * 60 * 1000,
  );

  return {
    _id: Utils.uuid(),
    _type: 'event',
    title,
    slug: Utils.slugify(title),
    metadata: Utils.makeMetadata(faker.lorem.sentence(), faker.lorem.words(3).split(' ')),
    startsAt: startsAt.toISOString(),
    endsAt: endsAt.toISOString(),
    location: faker.location.city() + ', ' + faker.location.country(),
    lumaEventId: faker.string.alphanumeric(16),
    categories: faker.helpers.arrayElements(categoryIds, { min: 1, max: 3 }).map((catId) => ({
      _type: 'reference' as const,
      _ref: catId,
      _key: Utils.makeKey(),
    })),
    description: faker.lorem.paragraphs(2),
    coverImage: Utils.imageRef(coverImageAssetId ?? 'image-placeholder'),
    ...overrides,
  };
};
