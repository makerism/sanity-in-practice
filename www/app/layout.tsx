import * as Next from 'next';
import * as Sanity from '@/lib/sanity';

import Navigation from '@/ui/navigation';
import Footer from '@/ui/footer';

import './globals.css';

export const generateMetadata = async (): Promise<Next.Metadata> => {
  const globals = await Sanity.Globals.get();

  const formatFavicon = (
    favicon: NonNullable<typeof globals.settings.favicon>,
    width: number,
    height: number,
  ) => {
    return {
      url: Sanity.urlForImage(favicon).size(width, height).format('png').url(),
      sizes: `${width}x${height}`,
      type: 'image/png',
    };
  };

  const getIcons = () => {
    if (!globals.settings.favicon) return undefined;
    return {
      icon: [
        formatFavicon(globals.settings.favicon, 32, 32),
        formatFavicon(globals.settings.favicon, 16, 16),
      ],
      apple: [formatFavicon(globals.settings.favicon, 180, 180)],
    };
  };

  return {
    title: globals.settings.title,
    description: globals.settings.description,
    icons: getIcons(),
  };
};

const RootLayout: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <div className="mb-foot">{props.children}</div>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
