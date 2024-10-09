import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "..";

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api",
    req: request,
    router: appRouter,
    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };
