import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "iron.config";
import { env } from "~/env.mjs";

const VALID_PASSWORD = env.ADMIN_AUTH_PASSWORD;
const VALID_LOGIN = env.ADMIN_AUTH_LOGIN;

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, ironOptions);
}

async function createSessionRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { login, password } = req.body as {
      login: string;
      password: string;
    };

    if (login === VALID_LOGIN && password === VALID_PASSWORD) {
      // @ts-expect-error Need to add typings here
      req.session.user = {
        isAdmin: true,
      };

      await req.session.save();

      res.send({ ok: true });
    }
    return res.status(403).send("");
  }
  return res.status(404).send("");
}

export default withSessionRoute(createSessionRoute);
