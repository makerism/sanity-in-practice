import * as Sanity from 'sanity';

const UpcomingEvents = Sanity.defineType({
  name: 'upcomingEvents',
  title: 'Upcoming Events',
  description: 'A section for upcoming events',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'ctaOverride',
      title: 'CTA Override',
      description:
        'If present, this will override the default CTA for the section. If not present, the CTA will be the "View Full Calendar" link.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
});

export default UpcomingEvents;
