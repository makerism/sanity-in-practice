import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

const Article = Sanity.defineType({
  name: 'article',
  title: 'Article',
  description: 'An article for the site',
  type: 'document',
  icon: Icons.Article,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      coverImage: 'coverImage',
    },
    prepare({ title, publishedAt, coverImage }) {
      return {
        title: title,
        subtitle: publishedAt,
        media: coverImage,
      };
    },
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    },
    /*
    On articles, I always have a manually set published date. This is used to
    sort the articles in the CMS and to display the published date on the
    article page. Even when Sanity update's the updatedAt date upon future
    edits, I want to display the publishedAt date as the definitive article
    date.
    */
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'person' }],
      group: 'content',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    /*
    Notice how we use richTextSimple here. This is because the excerpt is used
    in search results, sharecards, and other places where headings, lists, and
    images aren't supported.
    */
    {
      name: 'excerpt',
      title: 'Excerpt',
      description:
        'A short summary of the article. This is used to display the article in search results and other indexes.',
      type: 'richTextSimple',
      group: 'content',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'richTextWithImages',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'metadata',
      title: 'Metadata',
      type: 'metadata',
      group: 'settings',
    },
  ],
});

export default Article;
