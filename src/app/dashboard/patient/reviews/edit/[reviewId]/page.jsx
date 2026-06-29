"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

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
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [confirmModal, setConfirmModal] =
    useState(initialModalState);

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

      await updateReview(reviewId, {
        rating,
        comment,
      });

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
      message:
        "Are you sure you want to delete this review?",
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
      <div className="text-center py-20">
        Loading review...
      </div>
    );
  }

  if (!review) {
    return (
      <div className="text-center py-20">
        Review not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          Edit Review
        </h1>

        <Link
          href={`/dashboard/reviews/${review.appointmentId}`}
          className="btn btn-outline"
        >
          View Review
        </Link>
      </div>

      <div className="card bg-base-100 shadow border">
        <div className="card-body space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">
                Doctor
              </h3>

              <p>{review.doctorName}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                Patient
              </h3>

              <p>{review.patientName}</p>
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
                  setRating(Number(e.target.value))
                }
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  Comment
                </span>
              </label>

              <textarea
                rows={6}
                className="textarea textarea-bordered w-full"
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                required
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary"
              >
                {saving
                  ? "Updating..."
                  : "Update Review"}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-error"
              >
                Delete Review
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="btn btn-outline"
              >
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