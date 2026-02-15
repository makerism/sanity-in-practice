import * as Sanity from 'sanity';

const Sections = Sanity.defineType({
  name: 'sections',
  title: 'Sections',
  description: 'Sections for the site',
  type: 'array',
  of: [
    { type: 'centeredImage' },
    { type: 'fullWidthImage' },
    { type: 'splitPane' },
    { type: 'textImage' },
    { type: 'upcomingEvents' },
  ],
});

export default Sections;

import CenteredImage from './centered-image';
import FullWidthImage from './full-width-image';
import SplitPane from './split-pane';
import TextImage from './text-image';
import UpcomingEvents from './upcoming-events';

export { CenteredImage, FullWidthImage, SplitPane, TextImage, UpcomingEvents };
