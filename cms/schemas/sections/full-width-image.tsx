import * as Icons from '../../lib/icons';
import * as Sanity from 'sanity';

const FullWidthImage = Sanity.defineType({
  name: 'fullWidthImage',
  title: 'Full Width Image',
  description: 'A full width image section',
  type: 'object',
  icon: Icons.FullWidthImage,
  preview: {
    select: {
      heading: 'heading',
      image: 'image',
    },
    prepare({ heading, image }) {
      return { title: 'Full Width Image', subtitle: heading, media: image };
    },
  },
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Subheading',
      name: 'subheading',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'cta',
      title: 'CTA',
      description: 'The call to action for the section',
      type: 'linkWithLabel',
    },
  ],
});

export default FullWidthImage;
