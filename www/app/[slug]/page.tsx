import * as Sanity from '@/lib/sanity';
import * as Navigation from 'next/navigation';

import PageView from '@/views/page';

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const page = await Sanity.Pages.getBySlug(slug);
  if (!page) return Navigation.notFound();

  return {
    title: page.title,
    description: page.metadata.description,
    keywords: page.metadata.keywords,
    image: page.metadata.coverImage ? Sanity.urlForImage(page.metadata.coverImage) : null,
  };
};

export const generateStaticParams = async () => {
  const pages = await Sanity.Pages.index();
  return pages.map((page) => {
    return {
      slug: page.slug.current,
    };
  });
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await Sanity.Pages.getBySlug(slug);
  if (!page) return Navigation.notFound();

  return <PageView page={page} />;
}
