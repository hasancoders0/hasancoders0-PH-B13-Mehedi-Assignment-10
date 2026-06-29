"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";

export default function DoctorRoute({
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
      if (!user || role !== "doctor") {
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

  if (role !== "doctor") {
    return null;
  }

  return children;
}