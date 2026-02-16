import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

const Event = Sanity.defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: Icons.Event,
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
    {
      name: 'metadata',
      title: 'Metadata',
      type: 'metadata',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'startsAt',
      title: 'Start Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'endsAt',
      title: 'End Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'lumaEventId',
      title: 'Luma Event ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'eventCategory', title: 'Event Category' }] }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
  ],
});

export default Event;
