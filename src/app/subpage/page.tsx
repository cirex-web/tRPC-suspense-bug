"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { trpc } from "../utils/trpc";
import { Suspense } from "react";

const TRPCComponent = () => {
  const otherQuery = trpc.hello.useSuspenseQuery();

  return <h1>{otherQuery[0]}</h1>;
};
const TanstackComponent = () => {
  const query = useSuspenseQuery({
    queryKey: ["non-trpc"],

    queryFn: () =>
      new Promise<string>((re) =>
        setTimeout(() => re("Data returned by tanstack"), 3000)
      ),
  });
  return <h1>{query.data}</h1>;
};
export default function Page() {
  const router = useRouter();
  return (
    <>
      {/* <div>{query.data ?? "loading"}</div> */}
      <Suspense fallback={<h1>Loading tRPC</h1>}>
        <TRPCComponent />
      </Suspense>
      <Suspense fallback={<h1>Loading Tanstack Query</h1>}>
        <TanstackComponent />
      </Suspense>
      <button
        onClick={() => router.push("/")}
        style={{ padding: "10px 20px", fontSize: 19, margin: "20px 0" }}
      >
        Go back
      </button>
    </>
  );
}
