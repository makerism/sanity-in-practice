import * as Types from '@/lib/types';

type UpcomingEventsProps = {
  key: string;
  section: Types.UpcomingEventsSection;
};

const UpcomingEvents: React.FC<UpcomingEventsProps> = (props) => {
  return (
    <section id={props.key} className="upcoming-events">
      UpcomingEvents
    </section>
  );
};

export default UpcomingEvents;
