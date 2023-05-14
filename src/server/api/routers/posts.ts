import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { convertToSlug } from "~/utils/text";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      select: {
        id: true,
        createdAt: true,
        title: true,
        slug: true,
        description: true,
      },
    });
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      const post = await ctx.prisma.post.findUnique({
        where: {
          slug: input.slug,
        },
      });

      return post;
    }),

  create: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const slug = convertToSlug(input.title);

      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          description: input.description,
          content: input.content,

          slug,
        },
      });

      return post;
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await ctx.prisma.post.delete({
        where: {
          id: input.id,
        },
      });

      return post;
    }),
});
