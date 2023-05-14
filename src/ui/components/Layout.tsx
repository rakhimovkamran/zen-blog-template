import { type ReactNode } from "react";
import Head from "next/head";

import { Header } from "./Header";
import { env } from "~/env.mjs";

interface LayoutProps {
  children: ReactNode;
  isNavigationHidden?: boolean;

  title?: string;
  description?: string;
  keywords?: string[];
}

export const Layout = ({
  children,
  isNavigationHidden,
  description,
  title,
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>
          {title
            ? `${title} | ${env.NEXT_PUBLIC_BLOG_NAME}`
            : env.NEXT_PUBLIC_BLOG_NAME}
        </title>

        <meta
          property="og:title"
          content={
            title
              ? `${title} | ${env.NEXT_PUBLIC_BLOG_NAME}`
              : env.NEXT_PUBLIC_BLOG_NAME
          }
        />

        {description && (
          <>
            <meta property="og:description" content={description} />
            <meta name="description" content={description} />
          </>
        )}

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!isNavigationHidden && <Header />}
        {children}
      </main>
    </>
  );
};
