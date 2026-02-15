import * as Sanity from '../../www/lib/sanity/types';
import * as Utils from './utils';
import * as RichText from './richtext';

import { faker } from '@faker-js/faker';

type Params = Partial<Utils.MockDoc<Sanity.Announcement>>;

export const mock = (params: Params = {}): Utils.MockDoc<Sanity.Announcement> => ({
  _id: Utils.uuid(),
  _type: 'announcement',
  title: faker.company.catchPhrase(),
  message: RichText.Base.mock(faker.lorem.sentence({ min: 8, max: 20 })),
  link: {
    _type: 'link',
    href: faker.internet.url(),
    openInNewTab: true,
  },
  ...params,
});
