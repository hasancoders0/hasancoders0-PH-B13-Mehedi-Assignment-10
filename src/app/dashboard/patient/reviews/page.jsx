"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaStar,
  FaStethoscope,
  FaCalendarDays,
  FaPen,
  FaTrash,
  FaEye,
  FaCommentDots,
} from "react-icons/fa6";

import useAuth from "@/hooks/useAuth";
import ConfirmModal from "@/components/shared/ConfirmModal";

import { getPatientReviews, deleteReview } from "@/services/review.service";

const initialModalState = {
  open: false,
  title: "",
  message: "",
  confirmText: "Confirm",
  confirmClass: "btn-primary",
  onConfirm: null,
};

export default function PatientReviewsPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState(initialModalState);

  const closeModal = () => {
    setConfirmModal(initialModalState);
  };

  const loadReviews = async () => {
    try {
      if (!user?.email) return;
      const data = await getPatientReviews(user.email);
      setReviews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [user]);

  const handleDelete = (reviewId) => {
    setConfirmModal({
      open: true,
      title: "Delete Review",
      message: "Are you sure you want to delete this review?",
      confirmText: "Delete",
      confirmClass: "btn-error",
      onConfirm: async () => {
        try {
          await deleteReview(reviewId);
          closeModal();
          loadReviews();
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Reviews</h1>
          <p className="text-sm opacity-50 mt-1 font-light">
            Manage your submitted doctor reviews.
          </p>
        </div>

        <div className="bg-base-100 border border-base-300/60 rounded-2xl px-5 py-3 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest opacity-40">
            Total Reviews
          </p>
          <p className="text-2xl font-extrabold tracking-tight text-primary">
            {reviews.length}
          </p>
        </div>
      </div>

      {reviews.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-3xl bg-base-200 flex items-center justify-center mb-6">
            <FaCommentDots className="text-3xl text-base-content/30" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">
            No reviews found
          </h3>
          <p className="opacity-50 mt-2 text-sm font-light">
            You haven&apos;t written any reviews yet.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="group bg-base-100 border border-base-300/60 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-base-300/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="h-1 bg-warning/40 group-hover:bg-warning/70 transition-colors duration-300" />

              <div className="p-6 lg:p-8">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <FaStethoscope className="text-sm text-primary" />
                      </div>
                      <h2 className="text-xl font-extrabold tracking-tight">
                        {review.doctorName}
                      </h2>
                    </div>

                    <div className="flex items-center gap-1 pl-[52px]">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-sm ${
                            i < review.rating ? "text-warning" : "text-base-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs font-semibold ml-2 opacity-50">
                        {review.rating}/5
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs opacity-40 font-light shrink-0 sm:text-right">
                    <FaCalendarDays className="text-xs opacity-60" />
                    <span>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Comment Box */}
                <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-5 mb-6">
                  <p className="text-sm opacity-70 font-light leading-relaxed">
                    {review.comment}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/dashboard/reviews/${review.appointmentId}`}
                    className="btn btn-sm bg-info/10 text-info border-0 hover:bg-info/20 gap-2 rounded-xl transition-colors duration-200"
                  >
                    <FaEye className="text-xs" />
                    View
                  </Link>

                  <Link
                    href={`/dashboard/patient/reviews/edit/${review._id}`}
                    className="btn btn-sm bg-warning/10 text-warning border-0 hover:bg-warning/20 gap-2 rounded-xl transition-colors duration-200"
                  >
                    <FaPen className="text-xs" />
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-sm bg-error/10 text-error border-0 hover:bg-error/20 gap-2 rounded-xl transition-colors duration-200"
                  >
                    <FaTrash className="text-xs" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={confirmModal.open}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        confirmClass={confirmModal.confirmClass}
        onConfirm={confirmModal.onConfirm}
        onClose={closeModal}
      />
    </div>
  );
}
