import * as Types from '@/lib/types';
import * as Utils from '@/lib/utils';
import * as Text from '@/ui/text';

import Image from '@/ui/image';

type SplitPaneProps = {
  key: string;
  section: Types.SplitPaneSection;
};

const SplitPane: React.FC<SplitPaneProps> = (props) => {
  return (
    <section id={props.key} className="split-pane grid grid-cols-2 border-y border-line">
      <Pane {...props.section.firstPane} index={0} />
      <Pane {...props.section.secondPane} index={1} />
    </section>
  );
};

type PaneProps = {
  eyebrow?: string;
  heading: string;
  image: Types.SplitPaneSection['firstPane']['image'];
  index: number;
};

const Pane: React.FC<PaneProps> = (props) => {
  return (
    <div
      className={Utils.cx('col-span-1 px-8 py-12', {
        'border-r border-line': props.index === 0,
        'bg-surface': props.index === 1,
      })}
    >
      <div className="relative aspect-4/3">
        <Image image={props.image} className="h-full w-full object-cover" />
      </div>
      <div className="mt-8">
        {props.eyebrow && <Text.Detail className="mb-2 text-muted">{props.eyebrow}</Text.Detail>}
        <Text.Heading>{props.heading}</Text.Heading>
      </div>
    </div>
  );
};

export default SplitPane;
