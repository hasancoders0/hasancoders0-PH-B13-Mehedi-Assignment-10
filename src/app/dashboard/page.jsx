"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import useRole from "@/hooks/useRole";

export default function DashboardPage() {
  const router = useRouter();

  const { role, loading } = useRole();

  useEffect(() => {
    if (!loading && role) {
      router.push(`/dashboard/${role}`);
    }
  }, [role, loading, router]);

  return (
    <div className="p-10">
      Redirecting...
    </div>
  );
}