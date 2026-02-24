import Announcement from './announcement';
import Article from './article';
import Event from './event';
import EventCategory from './event-category';
import Page from './page';
import Person from './person';
import Metadata from './metadata';
import Settings from './settings';

import * as Link from './link';
import * as RichText from './rich-text';
import * as Sections from './sections';

const Schemas = [
  Announcement,
  Article,
  Event,
  EventCategory,
  Link.Base,
  Link.WithLabel,
  Metadata,
  Page,
  Person,
  Settings,
  RichText.Base,
  RichText.Simple,
  RichText.Standard,
  RichText.WithImages,
  Sections.default,
  Sections.CenteredImage,
  Sections.FullWidthImage,
  Sections.SplitPane,
  Sections.TextImage,
  Sections.UpcomingEvents,
];

export default Schemas;
