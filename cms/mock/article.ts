import * as Sanity from '../../www/lib/sanity/types';
import * as Utils from './utils';
import * as RichText from './richtext';

import { faker } from '@faker-js/faker';

type Params = Partial<Utils.MockDoc<Sanity.Article>> & {
  coverImageAssetId?: string;
  inlineImageAssetIds?: string[];
  authorId?: string;
};

export const mock = (params: Params = {}): Utils.MockDoc<Sanity.Article> => {
  const { coverImageAssetId, inlineImageAssetIds = [], authorId, ...overrides } = params;
  const title = overrides.title ?? faker.lorem.sentence({ min: 4, max: 8 }).replace(/\.$/, '');

  return {
    _id: Utils.uuid(),
    _type: 'article',
    title,
    slug: Utils.slugify(title),
    publishedAt: faker.date.past({ years: 2 }).toISOString().split('T')[0],
    ...(authorId ? { author: { _type: 'reference' as const, _ref: authorId } } : {}),
    coverImage: Utils.imageRef(coverImageAssetId ?? 'image-placeholder'),
    excerpt: RichText.Simple.mock([faker.lorem.paragraph({ min: 2, max: 4 })]),
    content: RichText.WithImages.mock(
      [
        {
          heading: faker.lorem.sentence({ min: 3, max: 6 }).replace(/\.$/, ''),
          text: faker.lorem.paragraphs(2),
        },
        {
          heading: faker.lorem.sentence({ min: 3, max: 6 }).replace(/\.$/, ''),
          text: faker.lorem.paragraphs(3),
        },
        { text: faker.lorem.paragraphs(2) },
      ],
      inlineImageAssetIds,
    ),
    metadata: Utils.makeMetadata(faker.lorem.sentence(), faker.lorem.words(4).split(' ')),
    ...overrides,
  };
};
