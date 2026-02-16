import * as Sanity from '@/lib/sanity';
import * as Navigation from 'next/navigation';

import ArticleView from '@/views/article';

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const article = await Sanity.Articles.getBySlug(slug);
  if (!article) return Navigation.notFound();

  return {
    title: article.title,
    description: article.excerptPlainText,
    image: article.coverImage ? Sanity.urlForImage(article.coverImage) : null,
  };
};

export const generateStaticParams = async () => {
  const articles = await Sanity.Articles.index();
  return articles.map((article) => {
    return {
      slug: article.slug.current,
    };
  });
};

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await Sanity.Articles.getBySlug(slug);
  if (!article) return Navigation.notFound();

  return <ArticleView article={article} />;
}
