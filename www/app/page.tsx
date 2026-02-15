import * as Sanity from '@/lib/sanity';

import PageView from '@/views/page';

export const generateMetadata = async () => {
  const homePage = await Sanity.Pages.getBySlug('home');
  if (!homePage) throw new Error('Home page not found');

  return {
    title: homePage.title,
    description: homePage.metadata.description,
    keywords: homePage.metadata.keywords,
    image: homePage.metadata.coverImage ? Sanity.urlForImage(homePage.metadata.coverImage) : null,
  };
};

export default async function HomePage() {
  const homePage = await Sanity.Pages.getBySlug('home');
  if (!homePage) throw new Error('Home page not found');

  return <PageView page={homePage} />;
}
