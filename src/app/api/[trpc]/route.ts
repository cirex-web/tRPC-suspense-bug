import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "..";

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api",
    req: request,
    router: appRouter,
    createContext: () => {
      console.log("we be fetching");
      return {};
    },
  });
};

export { handler as GET, handler as POST };
