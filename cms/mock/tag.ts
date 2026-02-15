import * as Sanity from '../../www/lib/sanity/types';
import * as Utils from './utils';

const TAG_NAMES = [
  'Technology',
  'Design',
  'Community',
  'Education',
  'Health',
  'Finance',
  'Culture',
  'Science',
];

type Params = Partial<Utils.MockDoc<Sanity.Tag>>;

export const mock = (params: Params = {}): Utils.MockDoc<Sanity.Tag> => {
  const title = params.title ?? Utils.random(TAG_NAMES);
  return {
    _id: Utils.uuid(),
    _type: 'tag',
    title,
    slug: Utils.slugify(title),
    ...params,
  };
};

export const NAMES = TAG_NAMES;
