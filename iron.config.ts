import { env } from "~/env.mjs";

export const ironOptions = {
  cookieName: "ZEN_BLOG",

  password: env.ADMIN_AUTH_SECRET,

  cookieOptions: {
    secure: process.env.NODE_ENV === "production" ? true : false,
  },
};
