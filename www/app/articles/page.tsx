import * as Sanity from '@/lib/sanity';

import ArticlesIndexView from '@/views/articles-index';

export const metadata = {
  title: 'Articles',
  description: 'Articles',
};

export default async function Page() {
  const articles = await Sanity.Articles.index();
  return <ArticlesIndexView articles={articles} />;
}
