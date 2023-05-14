import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),

    ADMIN_AUTH_LOGIN: z.string(),
    ADMIN_AUTH_PASSWORD: z.string(),
    ADMIN_AUTH_SECRET: z.string(),
  },

  client: {
    NEXT_PUBLIC_BLOG_NAME: z.string(),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,

    ADMIN_AUTH_SECRET: process.env.ADMIN_AUTH_SECRET,
    ADMIN_AUTH_LOGIN: process.env.ADMIN_AUTH_LOGIN,
    ADMIN_AUTH_PASSWORD: process.env.ADMIN_AUTH_PASSWORD,

    NEXT_PUBLIC_BLOG_NAME: process.env.NEXT_PUBLIC_BLOG_NAME,
  },
});
