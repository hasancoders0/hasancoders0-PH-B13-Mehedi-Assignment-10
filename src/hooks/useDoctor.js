"use client";

import useRole from "./useRole";

export default function useDoctor() {
  const { role, loading } = useRole();

  return {
    isDoctor: role === "doctor",
    loading,
  };
}