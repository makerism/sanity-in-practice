import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

const Page = Sanity.defineType({
  name: 'page',
  title: 'Page',
  description: 'A page for the site',
  type: 'document',
  icon: Icons.Page,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
      },
    },
    {
      name: 'metadata',
      title: 'Metadata',
      type: 'metadata',
      group: 'settings',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'sections',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
  ],
});

export default Page;
