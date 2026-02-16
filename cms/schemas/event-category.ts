import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

const EventCategory = Sanity.defineType({
  name: 'eventCategory',
  title: 'Event Category',
  description: 'A category for events',
  type: 'document',
  icon: Icons.EventCategory,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    },
  ],
});

export default EventCategory;
