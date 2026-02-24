import * as Sanity from 'sanity';
import * as Icons from '../lib/icons';

/*
This is a richtext field that can be used to display text with basic formatting.
It supports bold, italic, underline, and links. It's useful for things like
announcements and other simple text content.
*/
export const Base = Sanity.defineType({
  name: 'richTextBase',
  title: 'Base Rich Text',
  description: 'Base rich text field',
  type: 'array',
  icon: Icons.Richtext,
  of: [
    {
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
        ],
        annotations: [],
      },
      lists: [],
    },
  ],
});

/*
This is a simple richtext field that can be used to display text with basic formatting.
It supports bold, italic, underline, and links. It's useful for things like
announcements and other simple text content.
*/
export const Simple = Sanity.defineType({
  name: 'richTextSimple',
  title: 'Simple Rich Text',
  description: 'Simple rich text field',
  type: 'array',
  icon: Icons.Richtext,
  of: [
    {
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
        ],
        // annotations: [{ name: 'link', title: 'Link', type: 'link' }],
      },
      lists: [],
    },
  ],
});

/*
This is a standard richtext field that can be used to display text with more
advanced formatting.

It supports headings, paragraphs, lists, and links. It's useful for things like
page sections and other complex text content.
*/
export const Standard = Sanity.defineType({
  name: 'richTextStandard',
  title: 'Standard Rich Text',
  description: 'Standard rich text field',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        // annotations: [{ name: 'link', title: 'Link', type: 'link' }],
      },
    },
  ],
});

/*
This is a richtext field that can be used to display text with images.
It supports images with captions and alt text. It's useful for things like
blog posts and other complex text content.
*/
export const WithImages = Sanity.defineType({
  name: 'richTextWithImages',
  title: 'Rich Text with Images',
  type: 'array',
  of: [
    ...Standard.of,
    {
      type: 'image',
      name: 'image',
      title: 'Image',
      description: 'Image field',
      // icon: Icons.Image,
    },
  ],
});

export default Simple;
