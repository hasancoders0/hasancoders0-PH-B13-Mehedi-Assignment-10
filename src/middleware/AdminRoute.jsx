"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";

export default function AdminRoute({
  children,
}) {
  const router = useRouter();

  const { user, loading: authLoading } =
    useAuth();

  const { role, loading: roleLoading } =
    useRole();

  useEffect(() => {
    if (
      !authLoading &&
      !roleLoading
    ) {
      if (!user || role !== "admin") {
        router.push("/");
      }
    }
  }, [
    user,
    role,
    authLoading,
    roleLoading,
    router,
  ]);

  if (
    authLoading ||
    roleLoading
  ) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  if (role !== "admin") {
    return null;
  }

  return children;
}