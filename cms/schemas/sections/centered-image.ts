import * as Icons from '../../lib/icons';
import * as Sanity from 'sanity';

const CenteredImage = Sanity.defineType({
  name: 'centeredImage',
  title: 'Centered Image',
  description: 'A centered image section',
  type: 'object',
  icon: Icons.CenteredImage,
  preview: {
    select: {
      heading: 'heading',
      image: 'image',
    },
    prepare({ heading, image }) {
      return { title: 'Centered Image', subtitle: heading, media: image };
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
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'cta',
      title: 'CTA',
      description: 'The call to action for the section',
      type: 'linkWithLabel',
    },
  ],
});

export default CenteredImage;
