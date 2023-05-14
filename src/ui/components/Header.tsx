import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";

import { env } from "~/env.mjs";
import { ThemeSwitcher } from "./ThemeSwitcher";
import MDXPages from "data";

export const Header = () => {
  const { query, pathname } = useRouter();

  return (
    <header className="container sticky top-0 z-50 mx-auto grid h-[64px] grid-cols-3 items-center bg-white/80 px-5 text-lg antialiased backdrop-blur-sm backdrop-saturate-200 dark:bg-black/50">
      <section className="flex justify-start">
        <Link href="/">{env.NEXT_PUBLIC_BLOG_NAME}</Link>
      </section>

      <nav className="flex justify-center space-x-6 text-sm font-light">
        <Link
          className={cn(
            "transition-opacity hover:opacity-100",
            pathname === "/" ? "opacity-100" : "opacity-60"
          )}
          href="/"
        >
          blog
        </Link>

        {Object.entries(MDXPages).map(([slug, label]) => {
          return (
            <Link
              className={cn(
                " transition-opacity hover:opacity-100",
                slug === query.path ? "opacity-100" : "opacity-60"
              )}
              href={`/${slug}`}
              key={slug}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <section className="flex justify-end">
        <ThemeSwitcher />
      </section>
    </header>
  );
};
