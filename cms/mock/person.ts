import * as Sanity from '../sanity.types';
import * as Utils from './utils';

import { faker } from '@faker-js/faker';

type Params = Partial<Utils.MockDoc<Sanity.Person>>;

export const mock = (params: Params = {}): Utils.MockDoc<Sanity.Person> => ({
  _id: Utils.uuid(),
  _type: 'person',
  name: faker.person.fullName(),
  ...params,
});
