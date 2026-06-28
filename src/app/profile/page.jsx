"use client";

import PrivateRoute from "@/middleware/PrivateRoute";
import useAuth from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <PrivateRoute>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">
          My Profile
        </h1>

        <div className="card bg-base-100 shadow-md max-w-lg">
          <div className="card-body">
            <p>
              <strong>Name:</strong>{" "}
              {user?.displayName || "N/A"}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}