import * as Sanity from '../../www/lib/sanity/types';
import * as Utils from './utils';

const CATEGORY_NAMES = ['Workshop', 'Conference', 'Meetup', 'Webinar', 'Hackathon'];

type Params = Partial<Utils.MockDoc<Sanity.EventCategory>>;

export const mock = (params: Params = {}): Utils.MockDoc<Sanity.EventCategory> => {
  const title = params.title ?? Utils.random(CATEGORY_NAMES);
  return {
    _id: Utils.uuid(),
    _type: 'eventCategory',
    title,
    slug: Utils.slugify(title),
    ...params,
  };
};

export const NAMES = CATEGORY_NAMES;
