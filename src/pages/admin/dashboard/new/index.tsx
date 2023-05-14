import { useState } from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import matter from "gray-matter";

import { Editor, Layout } from "~/ui/components";
import { api } from "~/utils/api";
import { ironOptions } from "iron.config";

const New: NextPage = () => {
  const router = useRouter();
  const [markdown, setMarkdown] = useState("# Write something here...");

  const { mutate: createPost } = api.posts.create.useMutation();

  const handleSubmitClick = () => {
    const { data, content } = matter(markdown);

    createPost({
      description: data.description as string,
      title: data.title as string,
      content,
    });

    void router.push("/admin/dashboard");
  };

  return (
    <Layout isNavigationHidden={true}>
      <section className="mx-auto w-11/12">
        <Editor
          pageFullscreen
          modelValue={markdown}
          onChange={setMarkdown}
          onSave={handleSubmitClick}
        />
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

export default New;
