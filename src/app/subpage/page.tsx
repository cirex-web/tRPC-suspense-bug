import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Comp from "./client";

const wait = (ms: number) => new Promise((re) => setTimeout(re, ms));

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [["hello"], { type: "query" }],
    queryFn: async () => {
      return (
        await (
          await fetch("http://localhost:4101/api/hello", { cache: "no-store" })
        ).json()
      ).result.data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Comp />
    </HydrationBoundary>
  );
}
