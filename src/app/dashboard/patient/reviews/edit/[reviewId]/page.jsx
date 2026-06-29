"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FaStar,
  FaStethoscope,
  FaUser,
  FaFloppyDisk,
  FaTrash,
  FaArrowLeft,
  FaEye,
  FaCircleExclamation,
} from "react-icons/fa6";

import ConfirmModal from "@/components/shared/ConfirmModal";

import {
  getReviewById,
  updateReview,
  deleteReview,
} from "@/services/review.service";

const initialModalState = {
  open: false,
  title: "",
  message: "",
  confirmText: "Confirm",
  confirmClass: "btn-primary",
  onConfirm: null,
};

export default function EditReviewPage() {
  const router = useRouter();
  const { reviewId } = useParams();

  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [confirmModal, setConfirmModal] = useState(initialModalState);

  const closeModal = () => {
    setConfirmModal(initialModalState);
  };

  const loadReview = async () => {
    try {
      const data = await getReviewById(reviewId);
      setReview(data);
      setRating(data.rating);
      setComment(data.comment);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reviewId) {
      loadReview();
    }
  }, [reviewId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      await updateReview(reviewId, { rating, comment });
      router.push("/dashboard/patient/reviews");
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
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
          router.push("/dashboard/patient/reviews");
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

  if (!review) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-error/10 flex items-center justify-center mb-6">
          <FaCircleExclamation className="text-3xl text-error" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight">Review not found</h3>
        <p className="opacity-50 mt-2 text-sm font-light">
          The review you are trying to edit does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Edit Review
          </h1>
          <p className="text-sm opacity-50 mt-1 font-light">
            Modify your submitted feedback.
          </p>
        </div>

        <Link
          href={`/dashboard/reviews/${review.appointmentId}`}
          className="btn btn-sm bg-info/10 text-info border-0 hover:bg-info/20 gap-2 rounded-xl transition-colors duration-200 self-start"
        >
          <FaEye className="text-xs" />
          View Review
        </Link>
      </div>

      {/* Form Card */}
      <div className="bg-base-100 border border-base-300/60 rounded-3xl shadow-sm p-8 lg:p-10">
        <div className="space-y-8">
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
              <p className="font-semibold">{review.doctorName}</p>
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
              <p className="font-semibold">{review.patientName}</p>
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
                  Comment
                </span>
              </label>
              <textarea
                rows={5}
                className="textarea textarea-bordered w-full rounded-xl focus:textarea-primary transition-colors duration-200 leading-relaxed"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary flex-1 sm:flex-none rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 gap-2"
              >
                {saving ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <FaFloppyDisk className="text-sm" />
                )}
                {saving ? "Updating..." : "Update Review"}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-sm bg-error/10 text-error border-0 hover:bg-error/20 gap-2 rounded-xl transition-colors duration-200"
              >
                <FaTrash className="text-xs" />
                Delete Review
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
