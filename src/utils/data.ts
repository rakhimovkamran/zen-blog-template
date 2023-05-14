import path from "path";
import fs from "fs";
import matter from "gray-matter";

export type MDXPage = {
  data: Record<string, string>;
  content: string;
};

export const getPageByPath = (page_path: string): MDXPage => {
  const pagesDir = path.join(
    path.join(process.cwd(), "data/pages"),
    `${page_path}.mdx`
  );

  const source = fs.readFileSync(pagesDir);
  const { content, data } = matter(source);

  return {
    content,
    data,
  };
};

export const toJSON = <T>(object: T) => {
  return JSON.parse(JSON.stringify(object)) as T;
};
