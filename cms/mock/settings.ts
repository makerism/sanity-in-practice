import * as Sanity from '../../www/lib/sanity/types';
import * as Utils from './utils';

import { faker } from '@faker-js/faker';

type Params = Partial<Utils.MockDoc<Sanity.Settings>> & {
  announcementId?: string;
  faviconAssetId?: string;
};

export const mock = (params: Params = {}): Utils.MockDoc<Sanity.Settings> => {
  const { announcementId, faviconAssetId, ...overrides } = params;
  return {
    _id: 'settings',
    _type: 'settings',
    title: 'Sanity in Practice',
    description: faker.lorem.paragraph(),
    ...(faviconAssetId ? { favicon: Utils.imageRef(faviconAssetId) } : {}),
    ...(announcementId
      ? { activeAnnouncement: { _type: 'reference' as const, _ref: announcementId } }
      : {}),
    ...overrides,
  };
};
