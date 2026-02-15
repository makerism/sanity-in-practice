import * as Types from '@/lib/types';

import Sections from '@/ui/sections';

type PageProps = {
  page: Types.Sanity.Page;
};

const PageView: React.FC<PageProps> = (props) => {
  return <Sections sections={props.page.sections} />;
};

export default PageView;
