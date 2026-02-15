import * as Sanity from '../sanity.types';
import * as Sections from './sections';
import * as Utils from './utils';

import { faker } from '@faker-js/faker';

type SectionType =
  | 'centeredImage'
  | 'fullWidthImage'
  | 'splitPane'
  | 'textImage'
  | 'upcomingEvents';

const PAGE_CONFIGS: { title: string; sections: SectionType[] }[] = [
  { title: 'Home', sections: ['centeredImage', 'textImage', 'splitPane', 'upcomingEvents'] },
  { title: 'About', sections: ['fullWidthImage', 'textImage', 'splitPane'] },
  { title: 'Events', sections: ['centeredImage', 'upcomingEvents'] },
];

const pickImage = (assetIds: string[], index: number) =>
  assetIds.length > 0 ? assetIds[index % assetIds.length] : 'image-placeholder';

const buildSection = (type: SectionType, imageAssetIds: string[], offset: number) => {
  switch (type) {
    case 'centeredImage':
      return Sections.CenteredImage.mock({ imageAssetId: pickImage(imageAssetIds, offset) });
    case 'fullWidthImage':
      return Sections.FullWidthImage.mock({ imageAssetId: pickImage(imageAssetIds, offset) });
    case 'splitPane':
      return Sections.SplitPane.mock({
        firstImageAssetId: pickImage(imageAssetIds, offset),
        secondImageAssetId: pickImage(imageAssetIds, offset + 1),
      });
    case 'textImage':
      return Sections.TextImage.mock({ imageAssetId: pickImage(imageAssetIds, offset) });
    case 'upcomingEvents':
      return Sections.UpcomingEvents.mock();
  }
};

type Params = Partial<Utils.MockDoc<Sanity.Page>> & {
  pageIndex?: number;
  imageAssetIds?: string[];
};

export const mock = (params: Params = {}): Utils.MockDoc<Sanity.Page> => {
  const { pageIndex = 0, imageAssetIds = [], ...overrides } = params;
  const config = PAGE_CONFIGS[pageIndex % PAGE_CONFIGS.length];
  const title = overrides.title ?? config.title;

  return {
    _id: Utils.uuid(),
    _type: 'page',
    title,
    slug: Utils.slugify(title),
    metadata: Utils.makeMetadata(faker.lorem.sentence(), faker.lorem.words(4).split(' ')),
    sections: {
      _type: 'sections',
      sections: config.sections.map((type, i) =>
        buildSection(type, imageAssetIds, pageIndex * 4 + i),
      ),
    },
    ...overrides,
  };
};
