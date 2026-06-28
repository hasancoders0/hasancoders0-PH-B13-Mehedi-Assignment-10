"use client";

import { useEffect, useState } from "react";

import useAuth from "@/hooks/useAuth";

import {
  getPatientReviews,
  updateReview,
  deleteReview,
} from "@/services/review.service";

export default function PatientReviewsPage() {
  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleEdit = async (review) => {
    const rating = prompt(
      "Update Rating (1-5)",
      review.rating
    );

    if (!rating) return;

    const comment = prompt(
      "Update Comment",
      review.comment
    );

    if (comment === null) return;

    try {
      await updateReview(review._id, {
        rating,
        comment,
      });

      alert("Review updated successfully.");

      loadReviews();
    } catch (error) {
      console.error(error);
      alert("Failed to update review.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this review?"
    );

    if (!confirmDelete) return;

    try {
      await deleteReview(id);

      alert("Review deleted.");

      loadReviews();
    } catch (error) {
      console.error(error);
      alert("Failed to delete review.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Reviews
      </h1>

      {reviews.length === 0 ? (
        <div className="text-center py-10">
          No reviews found.
        </div>
      ) : (
        <div className="grid gap-5">

          {reviews.map((review) => (
            <div
              key={review._id}
              className="card bg-base-100 shadow-md border"
            >
              <div className="card-body">

                <h2 className="card-title">
                  {review.doctorName}
                </h2>

                <p>
                  <strong>Rating:</strong>{" "}
                  {review.rating} / 5
                </p>

                <p>{review.comment}</p>

                <p className="text-sm opacity-70">
                  {new Date(
                    review.createdAt
                  ).toLocaleDateString()}
                </p>

                <div className="card-actions justify-end">

                  <button
                    onClick={() =>
                      handleEdit(review)
                    }
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(review._id)
                    }
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}