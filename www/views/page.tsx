import * as Types from '@/lib/types';

import Sections from '@/ui/sections';

type PageProps = {
  page: NonNullable<Types.Sanity.GET_PAGE_BY_SLUG_QUERY_RESULT>;
};

const PageView: React.FC<PageProps> = (props) => {
  return <Sections sections={props.page.sections} />;
};

export default PageView;
