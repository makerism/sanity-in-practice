import * as Types from '@/lib/types';

type SplitPaneProps = {
  key: string;
  section: Types.SplitPaneSection;
};

const SplitPane: React.FC<SplitPaneProps> = (props) => {
  return (
    <section id={props.key} className="split-pane">
      SplitPane
    </section>
  );
};

export default SplitPane;
