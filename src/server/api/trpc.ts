import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "~/server/db";

type Session = {
  isAdmin: boolean;
};

type TIronSession = IronSession & {
  user: Session;
};

type CreateContextOptions = {
  session: TIronSession;
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    prisma,
    session: opts.session,
  };
};

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const session = (await getIronSession(
    opts.req,
    opts.res,
    ironOptions
  )) as TIronSession;

  return createInnerTRPCContext({ session });
};

import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { getIronSession, type IronSession } from "iron-session";
import { ironOptions } from "iron.config";

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  console.log(ctx.session);
  if (!ctx.session.user.isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
