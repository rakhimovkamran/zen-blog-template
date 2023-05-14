import { type GetServerSideProps, type NextPage } from "next";
import { Editor, Layout } from "~/ui/components";
import { type MDXPage, getPageByPath } from "~/utils/data";

interface PageProps {
  page: MDXPage;
}

const MDXPageRenderer: NextPage<PageProps> = ({ page }) => {
  return (
    page && (
      <Layout title={page.data.title}>
        <section className="mx-auto mt-12 max-w-xl">
          {page.data.title && page.data.isTitleShown && (
            <h1 className="mb-6 text-center text-4xl font-light">
              {page.data.title}
            </h1>
          )}

          <section className="space-y-8 text-lg font-light">
            <Editor modelValue={page.content} previewOnly={true} />
          </section>
        </section>
      </Layout>
    )
  );
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const page = getPageByPath(params?.path as string);

  return {
    props: {
      page,
    },
  };
};

export default MDXPageRenderer;
