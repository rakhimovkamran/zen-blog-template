import { type NextPage } from "next";
import { withIronSessionSsr } from "iron-session/next";
import Link from "next/link";
import { Article, Layout } from "~/ui/components";
import { api } from "~/utils/api";
import { ironOptions } from "iron.config";

const Dashboard: NextPage = () => {
  const { data: articles, refetch: refetchArticles } =
    api.posts.getAll.useQuery();

  return (
    <Layout isNavigationHidden={true}>
      <section className="mx-auto mt-12 max-w-xl space-y-12">
        <section className="sticky top-0 border-b border-gray-400 bg-white py-2 dark:bg-black">
          <Link href="/admin/dashboard/new" className="font-light underline">
            create new post
          </Link>
        </section>

        {articles?.map((article) => (
          <Article
            id={article.id}
            isEditMode={true}
            key={article.id}
            title={article.title}
            description={article.description}
            slug={article.slug}
            date={article.createdAt}
            refetchArticles={refetchArticles}
          />
        ))}
      </section>
    </Layout>
  );
};

export const getServerSideProps = withIronSessionSsr(
  function getServerSideProps({ req }) {
    const user = req.session.user as {
      isAdmin: boolean;
    };

    if (!user || user.isAdmin !== true) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        user,
      },
    };
  },
  ironOptions
);

export default Dashboard;
