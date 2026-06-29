"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  FaStar,
  FaUser,
  FaStethoscope,
  FaCalendarDays,
  FaPen,
  FaCircleXmark,
  FaEnvelope,
} from "react-icons/fa6";

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
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-error/10 flex items-center justify-center mb-6">
          <FaCircleXmark className="text-3xl text-error" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight">Review not found</h3>
        <p className="opacity-50 mt-2 text-sm font-light">
          The review you are looking for does not exist.
        </p>
      </div>
    );
  }

  const isPatient = user?.email === review.patientEmail;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Review Details
          </h1>
          <p className="text-sm opacity-50 mt-1 font-light">
            Detailed feedback for this appointment.
          </p>
        </div>

        {isPatient && (
          <Link
            href={`/dashboard/patient/reviews/edit/${review._id}`}
            className="btn btn-sm bg-warning/10 text-warning border-0 hover:bg-warning/20 gap-2 rounded-xl transition-colors duration-200 self-start"
          >
            <FaPen className="text-xs" />
            Edit Review
          </Link>
        )}
      </div>

      {/* Main Card */}
      <div className="bg-base-100 border border-base-300/60 rounded-3xl shadow-sm p-8 lg:p-10 space-y-8">
        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Patient Info */}
          <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-success/10 flex items-center justify-center">
                <FaUser className="text-sm text-success" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-40">
                Patient
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <p className="font-semibold">{review.patientName}</p>
              <div className="flex items-center gap-2 text-base-content/50 font-light">
                <FaEnvelope className="text-xs opacity-60" />
                <span>{review.patientEmail}</span>
              </div>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <FaStethoscope className="text-sm text-primary" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-40">
                Doctor
              </p>
            </div>

            <p className="text-sm font-semibold">{review.doctorName}</p>
          </div>
        </div>

        {/* Rating Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FaStar className="text-lg text-warning" />
            <h3 className="font-bold tracking-tight">Rating</h3>
          </div>

          <div className="flex items-center gap-3 bg-base-200/50 border border-base-300/30 rounded-2xl p-5">
            <div className="flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-2xl ${
                    i < review.rating
                      ? "text-warning drop-shadow-sm"
                      : "text-base-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-b from-base-content to-base-content/60 bg-clip-text text-transparent">
              {review.rating}/5
            </span>
          </div>
        </div>

        {/* Comment Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FaStar className="text-lg text-primary" />
            <h3 className="font-bold tracking-tight">Comment</h3>
          </div>

          <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-5 text-sm opacity-70 font-light leading-relaxed whitespace-pre-wrap">
            {review.comment}
          </div>
        </div>

        {/* Timestamps */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t border-base-300/50">
          <div className="flex items-center gap-2 text-xs opacity-40 font-light">
            <FaCalendarDays className="text-xs opacity-60" />
            <span>Created: {new Date(review.createdAt).toLocaleString()}</span>
          </div>

          {review.updatedAt && (
            <div className="flex items-center gap-2 text-xs opacity-40 font-light">
              <FaCalendarDays className="text-xs opacity-60" />
              <span>
                Updated: {new Date(review.updatedAt).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
