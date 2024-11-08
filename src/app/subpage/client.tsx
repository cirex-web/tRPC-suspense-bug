"use client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { trpc } from "../utils/trpc";
import { Suspense, useEffect, useState } from "react";

const TRPCComponent = () => {
  const otherQuery = trpc.hello.useSuspenseQuery();

  return <h1>{otherQuery[0]}</h1>;
};

const TanstackComponent = () => {
  const query = useSuspenseQuery({
    queryKey: ["non-trpc"],

    queryFn: () =>
      new Promise<string>((re) =>
        fetch("http://localhost:4101/api/hello", { cache: "no-cache" }).then(
          (data) => re(data.json().then((x) => x.result.data))
        )
      ),
  });
  return <h1>{query.data}</h1>;
};
import dynamic from "next/dynamic";
// is suspense SSR?
const DynamicComponentWithNoSSR = dynamic(
  () => Promise.resolve(TRPCComponent),
  {
    ssr: true,
  }
);
const wait = (ms: number) => new Promise((re) => setTimeout(re, ms));

export default function Comp() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(6);

  // useEffect(() => {
  //   setIsClient(10);
  // }, []);

  // return <h1>{isClient ? "This is never prerendered" : "Prerendered"}</h1>;
  return (
    <HydrationBoundary>
      {/* <div>{query.data ?? "loading"}</div> */}
      <Suspense fallback={<h1>Loading tRPC</h1>}>
        <TRPCComponent />
      </Suspense>
      {/* <Suspense fallback={<h1>Loading Tanstack Query</h1>}>
        <TanstackComponent />
      </Suspense> */}
      <button
        onClick={() => router.push("/")}
        style={{ padding: "10px 20px", fontSize: 19, margin: "20px 0" }}
      >
        Go back
      </button>
    </HydrationBoundary>
  );
}
