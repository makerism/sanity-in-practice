import * as Page from '@/ui/page';
import * as Text from '@/ui/text';
import * as Types from '@/lib/types';

import EventCard from '@/ui/event-card';

type EventsIndexProps = {
  events: Types.Sanity.INDEX_EVENTS_QUERY_RESULT;
};

const EventsIndexView: React.FC<EventsIndexProps> = (props) => {
  return (
    <div>
      <Page.Container className="mb-8 text-center">
        <Text.Heading>Event Calendar</Text.Heading>
      </Page.Container>
      <Page.NarrowContainer className="grid grid-cols-12 gap-x-3 gap-y-4">
        {props.events.map((event) => (
          <div className="col-span-12 sm:col-span-6" key={event._id}>
            <EventCard event={event} />
          </div>
        ))}
      </Page.NarrowContainer>
    </div>
  );
};

export default EventsIndexView;
