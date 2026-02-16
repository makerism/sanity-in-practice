import * as Types from '@/lib/types';
import * as Page from '@/ui/page';
import * as Text from '@/ui/text';
import * as Utils from '@/lib/utils';

import RichText from '@/ui/rich-text';

type ArticleViewProps = {
  article: Types.Article;
};

const ArticleView: React.FC<ArticleViewProps> = (props) => {
  return (
    <div className="mt-head">
      <div className="mb-8 text-center max-w-[400px] mx-auto">
        <Text.Detail className="text-muted">
          {Utils.formatDate(props.article.publishedAt)}
        </Text.Detail>
        <Text.Heading className="mt-1">{props.article.title}</Text.Heading>
      </div>
      <Page.EditorialContainer>
        <RichText value={props.article.content} />
      </Page.EditorialContainer>
    </div>
  );
};

export default ArticleView;
