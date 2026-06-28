"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getAppointmentById } from "@/services/appointment.service";
import { createReview } from "@/services/review.service";

export default function ReviewPage() {
  const { appointmentId } = useParams();

  const router = useRouter();

  const [appointment, setAppointment] =
    useState(null);

  useEffect(() => {
    if (!appointmentId) return;

    getAppointmentById(
      appointmentId
    ).then(setAppointment);
  }, [appointmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const reviewData = {
      appointmentId,

      doctorId: appointment.doctorId,
      doctorName: appointment.doctorName,

      patientName:
        appointment.patientName,
      patientEmail:
        appointment.patientEmail,

      rating: form.rating.value,
      comment: form.comment.value,
    };

    await createReview(reviewData);

    alert("Review submitted.");

    router.push(
      "/dashboard/patient"
    );
  };

  if (!appointment) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10">

      <div className="card bg-base-100 shadow">

        <div className="card-body">

          <h2 className="text-3xl font-bold">

            Write Review

          </h2>

          <div className="divider"></div>

          <p>

            <strong>Doctor:</strong>{" "}

            {appointment.doctorName}

          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 mt-6"
          >

            <select
              name="rating"
              required
              className="select select-bordered w-full"
            >
              <option value="">
                Rating
              </option>

              <option value="5">
                ⭐⭐⭐⭐⭐
              </option>

              <option value="4">
                ⭐⭐⭐⭐
              </option>

              <option value="3">
                ⭐⭐⭐
              </option>

              <option value="2">
                ⭐⭐
              </option>

              <option value="1">
                ⭐
              </option>

            </select>

            <textarea
              name="comment"
              required
              rows={5}
              className="textarea textarea-bordered w-full"
              placeholder="Write your experience..."
            />

            <button className="btn btn-primary">

              Submit Review

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}