"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <FaExclamationTriangle className="text-7xl text-error mx-auto mb-6" />

        <h1 className="text-4xl font-bold mb-4">
          Something Went Wrong
        </h1>

        <p className="text-base-content/70 mb-8">
          We encountered an unexpected error while processing your request.
          Please try again or return to the homepage.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="btn btn-primary"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="btn btn-outline"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}