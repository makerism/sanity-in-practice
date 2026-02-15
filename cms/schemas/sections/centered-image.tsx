import * as Sanity from 'sanity';

const CenteredImage = Sanity.defineType({
  name: 'centeredImage',
  title: 'Centered Image',
  description: 'A centered image section',
  type: 'object',
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
