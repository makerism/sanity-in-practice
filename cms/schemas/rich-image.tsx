import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

/*
This schema is used anytime we want to add an image field. This extends Sanity's
base image field by adding a caption and alt text. It's standard across our
app and I'll front-end will know how to render it.
*/
const RichImage = Sanity.defineType({
  type: 'image',
  name: 'richImage',
  title: 'Rich Image',
  description: 'Rich image field',
  icon: Icons.RichImage,
  options: {
    hotspot: true,
  },
  preview: {
    select: {
      caption: 'caption',
      alt: 'alt',
      asset: 'asset',
    },
    prepare({ caption, alt, asset }) {
      return { title: caption || alt || 'Image', media: asset };
    },
  },
  fields: [
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      options: {
        isHighlighted: true,
      },
    },
  ],
});

export default RichImage;
