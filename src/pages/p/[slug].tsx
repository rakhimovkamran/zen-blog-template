import { type NextPage, type GetServerSideProps } from "next";
import moment from "moment";

import { type Post as TPost } from "@prisma/client";
import { Editor, Layout } from "~/ui/components";
import { prisma } from "~/server/db";
import { toJSON } from "~/utils/data";

interface PostProps {
  post: TPost;
}

const Post: NextPage<PostProps> = ({ post }) => {
  return (
    post && (
      <Layout title={post.title} description={post.description}>
        <section className="mx-auto mt-12 max-w-xl">
          <h1 className="text-center text-4xl font-light">{post.title}</h1>

          <div className="my-6 text-center font-light lowercase text-gray-500">
            {moment(post.createdAt).calendar()}
          </div>

          <section className="space-y-8 text-lg font-light">
            <Editor modelValue={post.content} previewOnly={true} />
          </section>
        </section>
      </Layout>
    )
  );
};

export const getServerSideProps: GetServerSideProps<{
  post: TPost | null;
}> = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const post = await prisma.post.findUnique({
    where: {
      slug: context.params?.slug as string,
    },
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: toJSON(post),
    },
  };
};
export default Post;
