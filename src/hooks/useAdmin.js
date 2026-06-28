"use client";

import useRole from "./useRole";

export default function useAdmin() {
  const { role, loading } = useRole();

  return {
    isAdmin: role === "admin",
    loading,
  };
}