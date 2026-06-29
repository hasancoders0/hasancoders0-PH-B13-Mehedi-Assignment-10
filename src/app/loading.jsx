import { FaHeartbeat } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="text-center">
        <FaHeartbeat className="text-6xl text-primary mx-auto animate-pulse mb-6" />

        <h2 className="text-3xl font-bold mb-2">
          MediCare
        </h2>

        <p className="text-base-content/70 mb-6">
          Loading healthcare services...
        </p>

        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    </div>
  );
}