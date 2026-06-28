"use client";

import useRole from "@/hooks/useRole";

export default function DashboardPage() {
  const { role, loading } = useRole();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p className="mt-4">
        Current Role: {role}
      </p>
    </div>
  );
}