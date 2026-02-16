import * as Icons from '../../lib/icons';
import * as Sanity from 'sanity';

const PaneFields = [
  Sanity.defineField({
    name: 'eyebrow',
    title: 'Eyebrow',
    type: 'string',
  }),
  Sanity.defineField({
    name: 'heading',
    title: 'Heading',
    type: 'string',
    validation: (Rule) => Rule.required(),
  }),
  Sanity.defineField({
    name: 'image',
    title: 'Image',
    type: 'image',
    validation: (Rule) => Rule.required(),
  }),
];

const SplitPane = Sanity.defineType({
  name: 'splitPane',
  title: 'Split Pane',
  description: 'A split pane section',
  type: 'object',
  icon: Icons.SplitPane,
  preview: {
    select: {
      firstPaneHeading: 'firstPane.heading',
      secondPaneHeading: 'secondPane.heading',
    },
    prepare({ firstPaneHeading, secondPaneHeading }) {
      return {
        title: 'Split Pane',
        subtitle: `${firstPaneHeading} / ${secondPaneHeading}`,
      };
    },
  },
  fields: [
    {
      name: 'firstPane',
      title: 'First Pane',
      type: 'object',
      fields: PaneFields,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'secondPane',
      title: 'Second Pane',
      type: 'object',
      fields: PaneFields,
      validation: (Rule) => Rule.required(),
    },
  ],
});

export default SplitPane;
