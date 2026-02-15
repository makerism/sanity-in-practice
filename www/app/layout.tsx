import * as Next from 'next';

import Navigation from '@/ui/navigation';

import './globals.css';

export const metadata: Next.Metadata = {
  title: 'Sanity in Practice · Demo Site',
  description: 'A demo site for the Sanity in Practice course',
};

const RootLayout: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <div className="mt-8 mb-48">{props.children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
