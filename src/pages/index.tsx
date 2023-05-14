import { type NextPage } from "next";
import { Article, Layout } from "~/ui/components";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: articles } = api.posts.getAll.useQuery();

  return (
    <Layout>
      <section className="mx-auto mt-12 max-w-xl space-y-12">
        {articles?.map((article) => (
          <Article
            id={article.id}
            key={article.id}
            title={article.title}
            description={article.description}
            slug={article.slug}
            date={article.createdAt}
          />
        ))}
      </section>
    </Layout>
  );
};

export default Home;
