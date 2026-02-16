import * as Sanity from 'sanity';
import * as Icons from '../lib/icons';

const Tags = Sanity.defineType({
  name: 'tag',
  title: 'Tags',
  type: 'document',
  icon: Icons.Tag,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    },
  ],
});

export default Tags;
