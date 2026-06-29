"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import useAuth from "@/hooks/useAuth";

import { getReviewByAppointment } from "@/services/review.service";

export default function ReviewDetailsPage() {
  const { appointmentId } = useParams();

  const { user } = useAuth();

  const [review, setReview] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReview = async () => {
      try {
        const data = await getReviewByAppointment(appointmentId);

        setReview(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (appointmentId) {
      loadReview();
    }
  }, [appointmentId]);

  if (loading) {
    return <div className="text-center py-20">Loading review...</div>;
  }

  if (!review) {
    return <div className="text-center py-20">Review not found.</div>;
  }

  const isPatient = user?.email === review.patientEmail;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Review Details</h1>

        {isPatient && (
          <Link
            href={`/dashboard/patient/reviews/edit/${review._id}`}
            className="btn btn-warning"
          >
            Edit Review
          </Link>
        )}
      </div>

      <div className="card bg-base-100 shadow border">
        <div className="card-body space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Patient</h3>

              <p>{review.patientName}</p>

              <p className="text-sm opacity-70">{review.patientEmail}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Doctor</h3>

              <p>{review.doctorName}</p>
            </div>
          </div>

          <div className="divider"></div>

          <div>
            <h3 className="font-semibold mb-3">Rating</h3>

            <p className="text-2xl">⭐ {review.rating}/5</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Comment</h3>

            <div className="border rounded-lg p-4 whitespace-pre-wrap">
              {review.comment}
            </div>
          </div>

          <div className="text-sm opacity-70">
            Created: {new Date(review.createdAt).toLocaleString()}
            {review.updatedAt && (
              <>
                <br />
                Updated: {new Date(review.updatedAt).toLocaleString()}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
