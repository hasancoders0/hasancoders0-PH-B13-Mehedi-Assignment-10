"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaStar,
  FaStethoscope,
  FaUser,
  FaPaperPlane,
  FaArrowLeft,
  FaCircleExclamation,
  FaCircleCheck,
} from "react-icons/fa6";

import useAuth from "@/hooks/useAuth";

import { getAppointmentById } from "@/services/appointment.service";
import { createReview } from "@/services/review.service";

export default function NewReviewPage() {
  const router = useRouter();
  const { appointmentId } = useParams();
  const { user } = useAuth();

  const [appointment, setAppointment] = useState(null);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadAppointment = async () => {
      try {
        const data = await getAppointmentById(appointmentId);
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
      router.push("/dashboard/patient/appointments");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-error/10 flex items-center justify-center mb-6">
          <FaCircleExclamation className="text-3xl text-error" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight">
          Appointment not found
        </h3>
        <p className="opacity-50 mt-2 text-sm font-light">
          The appointment you are trying to review does not exist.
        </p>
      </div>
    );
  }

  if (appointment.hasReview) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-success/10 flex items-center justify-center mb-6">
          <FaCircleCheck className="text-3xl text-success" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight">Already Reviewed</h3>
        <p className="opacity-50 mt-2 text-sm font-light">
          You have already submitted a review for this appointment.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Write Review</h1>
        <p className="text-sm opacity-50 mt-1 font-light">
          Share your experience to help other patients.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-base-100 border border-base-300/60 rounded-3xl shadow-sm p-8 lg:p-10">
        <div className="card-body p-0 space-y-8">
          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FaStethoscope className="text-sm text-primary" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-40">
                  Doctor
                </p>
              </div>
              <p className="font-semibold">{appointment.doctorName}</p>
              <p className="text-sm opacity-50 font-light">
                {appointment.specialization}
              </p>
            </div>

            <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-success/10 flex items-center justify-center">
                  <FaUser className="text-sm text-success" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-40">
                  Patient
                </p>
              </div>
              <p className="font-semibold">{appointment.patientName}</p>
              <p className="text-sm opacity-50 font-light">
                {appointment.patientEmail}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Star Rating */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs font-medium opacity-60">
                  Rating
                </span>
              </label>
              <div className="flex items-center gap-2 mt-1">
                {[...Array(5)].map((_, i) => {
                  const currentRating = i + 1;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(currentRating)}
                      onMouseEnter={() => setHoverRating(currentRating)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform duration-200 hover:scale-125 active:scale-95"
                    >
                      <FaStar
                        className={`text-3xl transition-colors duration-200 ${
                          currentRating <= (hoverRating || rating)
                            ? "text-warning drop-shadow-sm"
                            : "text-base-300"
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="text-sm font-semibold text-base-content/40 ml-2">
                  {hoverRating || rating}/5
                </span>
              </div>
            </div>

            {/* Comment Textarea */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs font-medium opacity-60">
                  Your Feedback
                </span>
              </label>
              <textarea
                rows={5}
                className="textarea textarea-bordered w-full rounded-xl focus:textarea-primary transition-colors duration-200 leading-relaxed"
                placeholder="Share your experience with this doctor..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary flex-1 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 gap-2"
              >
                {submitting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <FaPaperPlane className="text-sm" />
                )}
                {submitting ? "Submitting..." : "Submit Review"}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="btn btn-ghost flex-1 sm:flex-none rounded-xl hover:bg-base-200 transition-colors duration-200 gap-2"
              >
                <FaArrowLeft className="text-sm" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
