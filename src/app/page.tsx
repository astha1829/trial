"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/services/auth.service";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-950 text-slate-100 font-sans">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />
        <span className="text-sm font-semibold tracking-wide text-slate-400">Loading...</span>
      </div>
    </div>
  );
}
