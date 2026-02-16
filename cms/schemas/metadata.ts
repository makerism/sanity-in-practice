import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

/*
This schema is used to define page metadata.

We use it in schemas like Pages, Articles, and other content types we'll
register as a page route.
*/
const Metadata = Sanity.defineType({
  name: 'metadata',
  title: 'Metadata',
  description: 'Metadata for the site',
  type: 'object',
  icon: Icons.Metadata,
  fields: [
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
    },
  ],
});

export default Metadata;
