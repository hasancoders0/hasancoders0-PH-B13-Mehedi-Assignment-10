"use client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";

import { getAppointmentById } from "@/services/appointment.service";
import { createReview } from "@/services/review.service";

export default function NewReviewPage() {
  const router = useRouter();

  const { appointmentId } = useParams();
  const { user } = useAuth();

  const [appointment, setAppointment] = useState(null);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadAppointment = async () => {
      try {
        const data = await getAppointmentById(
          appointmentId,
        );

        setAppointment(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (appointmentId) {
      loadAppointment();
    }
  }, [appointmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Please write your feedback.");

      return;
    }

    try {
      setSubmitting(true);

      await createReview({
        appointmentId: appointment._id,

        doctorId: appointment.doctorId,
        doctorName: appointment.doctorName,

        patientName: appointment.patientName,
        patientEmail: appointment.patientEmail,

        rating,
        comment,
      });

      toast.success("Review submitted successfully.");

      router.push(
        "/dashboard/patient/appointments",
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to submit review.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading appointment...
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="text-center py-20">
        Appointment not found.
      </div>
    );
  }

  if (appointment.hasReview) {
    return (
      <div className="text-center py-20">
        You have already submitted a review.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        Write Review
      </h1>

      <div className="card bg-base-100 shadow border">
        <div className="card-body">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold mb-2">
                Doctor
              </h3>

              <p>{appointment.doctorName}</p>

              <p className="text-sm opacity-70">
                {appointment.specialization}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                Patient
              </h3>

              <p>{appointment.patientName}</p>

              <p className="text-sm opacity-70">
                {appointment.patientEmail}
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="label">
                <span className="label-text">
                  Rating
                </span>
              </label>

              <select
                className="select select-bordered w-full"
                value={rating}
                onChange={(e) =>
                  setRating(
                    Number(e.target.value),
                  )
                }
              >
                <option value={5}>
                  ⭐⭐⭐⭐⭐ (5)
                </option>

                <option value={4}>
                  ⭐⭐⭐⭐ (4)
                </option>

                <option value={3}>
                  ⭐⭐⭐ (3)
                </option>

                <option value={2}>
                  ⭐⭐ (2)
                </option>

                <option value={1}>
                  ⭐ (1)
                </option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  Your Feedback
                </span>
              </label>

              <textarea
                rows={6}
                className="textarea textarea-bordered w-full"
                placeholder="Share your experience with this doctor..."
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
              >
                {submitting
                  ? "Submitting..."
                  : "Submit Review"}
              </button>

              <button
                type="button"
                className="btn btn-outline"
                onClick={() => router.back()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}