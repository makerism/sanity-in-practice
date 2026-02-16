import * as Icons from '../../lib/icons';
import * as Sanity from 'sanity';

const TextImage = Sanity.defineType({
  name: 'textImage',
  title: 'Text & Image',
  description: 'A text & image section',
  type: 'object',
  icon: Icons.TextImage,
  preview: {
    select: {
      heading: 'heading',
      image: 'image',
    },
    prepare({ heading, image }) {
      return { title: 'Text & Image', subtitle: heading, media: image };
    },
  },
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'richTextSimple',
      validation: (Rule) => Rule.required(),
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
    {
      name: 'orientation',
      title: 'Orientation',
      type: 'string',
      options: {
        list: [
          { title: 'Image Left', value: 'imageLeft' },
          { title: 'Image Right', value: 'imageRight' },
        ],
      },
      initialValue: 'imageLeft',
      validation: (Rule) => Rule.required(),
    },
  ],
});

export default TextImage;
