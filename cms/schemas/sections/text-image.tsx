import * as Sanity from 'sanity';

const TextImage = Sanity.defineType({
  name: 'textImage',
  title: 'Text & Image',
  description: 'A text & image section',
  type: 'object',
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
        list: ['imageLeft', 'imageRight'],
      },
      initialValue: 'imageLeft',
      validation: (Rule) => Rule.required(),
    },
  ],
});

export default TextImage;
