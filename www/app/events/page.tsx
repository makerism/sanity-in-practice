import * as Sanity from '@/lib/sanity';

import EventsIndexView from '@/views/events-index';

export const metadata = {
  title: 'Events',
  description: 'Events',
};

export default async function Page() {
  const events = await Sanity.Events.index();
  return <EventsIndexView events={events} />;
}
