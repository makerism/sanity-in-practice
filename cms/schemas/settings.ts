import * as Sanity from 'sanity';
import * as Icons from '../lib/icons';

/*
This will live as a singleton document in the CMS. It's used to define the
site settings.
*/
const Settings = Sanity.defineType({
  name: 'settings',
  title: 'Settings',
  description: 'Settings for the site',
  type: 'document',
  icon: Icons.Settings,
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'The title of the site',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      description: 'The description of the site. This will be displayed in the meta tags.',
      type: 'text',
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    },
    {
      name: 'activeAnnouncement',
      title: 'Active Announcement',
      description: 'If a announcement is selected, it will be displayed on the site',
      type: 'reference',
      to: [{ type: 'announcement' }],
    },
  ],
});

export default Settings;
