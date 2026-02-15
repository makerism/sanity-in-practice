import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

/*
This schema is used to create a link to a external URL or a internal page or
article.
*/
export const Base = Sanity.defineType({
  name: 'link',
  title: 'Link',
  description: 'A link to a external URL',
  type: 'object',
  icon: Icons.Link,
  fieldsets: [
    {
      name: 'link',
      title: 'Link',
      options: {
        columns: 2,
        collapsible: false,
      },
    },
  ],
  validation: (Rule) =>
    /*
    This validation:
    - Ensures that one of reference or href is present.
    - Ensures that both reference AND href aren't both present
    
    If either these conditions are met, the fields will be marked as invalid.
    */
    Rule.custom((fields) => {
      if (!fields) return true;
      if (!fields.reference && !fields.href) {
        return {
          message: 'One of reference or href must be used',
          path: ['reference', 'href'],
        };
      }
      if (fields.reference && fields.href) {
        return {
          message: 'Only one of reference or href can be used',
          path: ['reference', 'href'],
        };
      }

      return true;
    }),
  fields: [
    {
      name: 'reference',
      title: 'Reference',
      type: 'reference',
      to: [
        { type: 'page', title: 'Page' },
        { type: 'article', title: 'Article' },
      ],
      fieldset: 'link',
    },
    {
      name: 'href',
      title: 'Href',
      type: 'url',
      description: 'The href to link to',
      fieldset: 'link',
    },
    {
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      description:
        'If true, the link will open in a new tab. By default, internal links will open in the same window and external links will open in a new window.',
    },
  ],
});

export const WithLabel = Sanity.defineType({
  name: 'linkWithLabel',
  title: 'Link with Label',
  type: 'object',
  icon: Icons.Link,
  fieldsets: Base.fieldsets,
  fields: [
    ...Base.fields,
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
});

export default { Base, WithLabel };
