import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  hello: publicProcedure.query(async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return "Data returned from tRPC (updated) x2";
  }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
