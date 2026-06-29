"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import useAuth from "@/hooks/useAuth";
import ConfirmModal from "@/components/shared/ConfirmModal";

import {
  getPatientReviews,
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

export default function PatientReviewsPage() {
  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [confirmModal, setConfirmModal] =
    useState(initialModalState);

  const closeModal = () => {
    setConfirmModal(initialModalState);
  };

  const loadReviews = async () => {
    try {
      if (!user?.email) return;

      const data = await getPatientReviews(
        user.email,
      );

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
      message:
        "Are you sure you want to delete this review?",
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
      <div className="text-center py-20">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          My Reviews
        </h1>

        <span className="badge badge-lg">
          Total: {reviews.length}
        </span>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-20">
          No reviews found.
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="card bg-base-100 shadow border"
            >
              <div className="card-body">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {review.doctorName}
                    </h2>

                    <p className="mt-2">
                      ⭐ {review.rating}/5
                    </p>
                  </div>

                  <p className="text-sm opacity-70">
                    {new Date(
                      review.createdAt,
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="border rounded-lg p-4 mt-4">
                  {review.comment}
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <Link
                    href={`/dashboard/reviews/${review.appointmentId}`}
                    className="btn btn-info btn-sm"
                  >
                    View Review
                  </Link>

                  <Link
                    href={`/dashboard/patient/reviews/edit/${review._id}`}
                    className="btn btn-warning btn-sm"
                  >
                    Edit Review
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(review._id)
                    }
                    className="btn btn-error btn-sm"
                  >
                    Delete Review
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