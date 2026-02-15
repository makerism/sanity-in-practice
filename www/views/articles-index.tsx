import * as Types from '@/lib/types';
import * as Page from '@/ui/page';
import * as Text from '@/ui/text';

import ArticleCard from '@/ui/article-card';

type ArticlesIndexProps = {
  articles: Types.Sanity.INDEX_ARTICLES_QUERY_RESULT;
};

const ArticlesIndexView: React.FC<ArticlesIndexProps> = (props) => {
  return (
    <div>
      <Page.Container className="mb-8 text-center">
        <Text.Heading>Articles</Text.Heading>
      </Page.Container>
      <Page.NarrowContainer className="grid grid-cols-12 gap-x-3 gap-y-4">
        {props.articles.map((article) => (
          <div className="col-span-12 sm:col-span-6" key={article._id}>
            <ArticleCard article={article} />
          </div>
        ))}
      </Page.NarrowContainer>
    </div>
  );
};

export default ArticlesIndexView;
