import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

/*
This schema is used to create an announcement for the site.

We make them documents so they have their own ID. This is a nice pattern, in
case we want to mark as announcement as "seen" by a user, and dismiss it.

To make an announcement visible, you reference it in the Settings document.
*/
const Announcement = Sanity.defineType({
  name: 'announcement',
  title: 'Announcement',
  description: 'An announcement for the site',
  type: 'document',
  icon: Icons.Announcement,
  fields: [
    {
      name: 'title',
      description: 'The title of the announcement. This is for internal use only.',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Message',
      description: 'The message to display in the announcement',
      type: 'richTextBase',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'link',
      title: 'Link',
      description: 'If present, the announcement will be a clickable link',
      type: 'link',
    },
  ],
});

export default Announcement;
