import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

const Person = Sanity.defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: Icons.Person,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
});

export default Person;
