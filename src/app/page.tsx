"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <h1>Home</h1>

      <button
        onClick={() => router.push("/subpage")}
        style={{ padding: "10px 20px", fontSize: 19, margin: "20px 0" }}
      >
        go to subpage
      </button>
    </>
  );
}
