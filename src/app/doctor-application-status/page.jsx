"use client";

import { useEffect, useState } from "react";

import useAuth from "@/hooks/useAuth";
import { getDoctorRequestByEmail } from "@/services/doctorRequest.service";

export default function DoctorApplicationStatusPage() {
  const { user } = useAuth();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequest = async () => {
      try {
        if (!user?.email) return;

        const data = await getDoctorRequestByEmail(
          user.email
        );

        setRequest(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadRequest();
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  if (!request) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4">
        <div className="alert alert-warning">
          No doctor application found.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-20 px-4">

      <div className="card bg-base-100 shadow-xl">

        <div className="card-body text-center">

          <h1 className="text-4xl font-bold">
            Doctor Application
          </h1>

          <div className="divider"></div>

          <div className="my-4">

            <span
              className={`badge badge-lg ${
                request.status === "approved"
                  ? "badge-success"
                  : request.status === "rejected"
                    ? "badge-error"
                    : "badge-warning"
              }`}
            >
              {request.status.toUpperCase()}
            </span>

          </div>

          {request.status === "pending" && (
            <div className="space-y-3">

              <p>
                Your application has been submitted
                successfully.
              </p>

              <p>
                Please wait for administrator approval.
              </p>

              <p>
                If additional documents are required,
                the administrator will contact you.
              </p>

            </div>
          )}

          {request.status === "approved" && (
            <p>
              Congratulations! Your application
              has been approved.
            </p>
          )}

          {request.status === "rejected" && (
            <p>
              Unfortunately, your application
              was rejected. Please contact
              the administrator.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}