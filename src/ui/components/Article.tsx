import moment from "moment";
import Link from "next/link";
import { api } from "~/utils/api";

interface ArticleProps {
  title: string;
  description: string;
  date: Date;
  slug: string;

  isEditMode?: boolean;
  id: string;

  refetchArticles?: () => void;
}

export const Article = ({
  title,
  description,
  date,
  slug,
  isEditMode,
  id,
  refetchArticles,
}: ArticleProps) => {
  const { mutate: handleArticleDelete } = api.posts.delete.useMutation({
    onSuccess: refetchArticles,
  });

  return (
    <article className="space-y-5">
      <Link
        className="w-full border-b border-b-transparent text-3xl font-light transition-colors hover:border-b-white hover:underline dark:hover:border-b-black"
        target={isEditMode ? "_blank" : undefined}
        href={`/p/${slug}`}
      >
        {title}
      </Link>

      <p>{description}</p>

      <section className="flex items-center justify-between text-sm">
        <section className="space-x-2">
          <span className="lowercase text-gray-500">
            {moment(date).calendar()}
          </span>
          {isEditMode && (
            <Link target="_blank" href={`/p/${slug}`} className="underline">
              preview
            </Link>
          )}
        </section>

        {!isEditMode && (
          <Link href={`/p/${slug}`} className="underline">
            read more
          </Link>
        )}

        {isEditMode && (
          <section className="space-x-2">
            <a href={slug} className="text-yellow-500 underline">
              edit
            </a>

            <button
              onClick={() => {
                const isConfirmed = confirm(
                  "You're going to delete this article, are you sure?"
                );

                if (isConfirmed) {
                  handleArticleDelete({ id });
                }
              }}
              className="text-red-400 underline"
            >
              delete
            </button>
          </section>
        )}
      </section>
    </article>
  );
};
