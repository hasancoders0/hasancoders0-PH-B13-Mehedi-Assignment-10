import Link from "next/link";
import { FaUserDoctor } from "react-icons/fa6";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <FaUserDoctor className="text-8xl text-primary mx-auto mb-6" />

        <h1 className="text-6xl font-bold mb-4">
          404
        </h1>

        <h2 className="text-3xl font-semibold mb-4">
          Page Not Found
        </h2>

        <p className="text-base-content/70 mb-8">
          The page you are looking for doesn't exist or may have been moved.
          Let's get you back to MediCare safely.
        </p>

        <Link
          href="/"
          className="btn btn-primary"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}