import { type NextPage } from "next";
import { Layout } from "~/ui/components";

const Page404: NextPage = () => {
  return (
    <Layout isNavigationHidden={true}>
      <section className="flex h-screen w-full items-center justify-center">
        <h1 className="text-4xl font-light">page not found</h1>
      </section>
    </Layout>
  );
};

export default Page404;
