"use client";

import useAuth from "@/hooks/useAuth";

export default function PatientProfilePage() {
  const { user } = useAuth();

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        My Profile
      </h1>

      <div className="card bg-base-100 shadow-xl">

        <div className="card-body">

          <p>
            <strong>Name:</strong>{" "}
            {user?.displayName || "N/A"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user?.email}
          </p>

          <p>
            <strong>Role:</strong> Patient
          </p>

        </div>

      </div>

    </div>
  );
}