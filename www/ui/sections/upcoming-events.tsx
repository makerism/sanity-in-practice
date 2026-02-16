import * as Button from '@/ui/button';
import * as Page from '@/ui/page';
import * as Sanity from '@/lib/sanity';
import * as Text from '@/ui/text';
import * as Types from '@/lib/types';

import EventCard from '@/ui/event-card';

type UpcomingEventsProps = {
  key: string;
  section: Types.UpcomingEventsSection;
};

const UpcomingEvents: React.FC<UpcomingEventsProps> = async (props) => {
  const events = await Sanity.Events.upcoming();
  const soonestEvents = events.slice(0, 3);

  return (
    <section id={props.key} className="upcoming-events">
      <Page.Container>
        <div className="max-w-[400px] mx-auto mb-8 text-center">
          <Text.Heading>{props.section.heading}</Text.Heading>
        </div>

        {soonestEvents.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {soonestEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

        {soonestEvents.length === 0 && (
          <div className="text-center">
            <Text.Body>No upcoming events</Text.Body>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Button.Primary inline href="/events">
            {props.section.ctaOverride || 'View Full Calendar'}
          </Button.Primary>
        </div>
      </Page.Container>
    </section>
  );
};

export default UpcomingEvents;
