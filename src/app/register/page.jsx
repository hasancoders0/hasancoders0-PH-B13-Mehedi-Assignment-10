"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import useAuth from "@/hooks/useAuth";

import RoleSelector from "./components/RoleSelector";
import PatientFields from "./components/PatientFields";
import DoctorFields from "./components/DoctorFields";

import { createDoctorRequest } from "@/services/doctorRequest.service";

export default function RegisterPage() {
  const { createUser, googleLogin } = useAuth();

  const router = useRouter();

  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUser(name, email, password);

      if (role === "doctor") {
        await createDoctorRequest({
          name,
          email,

          specialization: form.specialization.value,

          qualification: form.qualification.value,

          hospital: form.hospital.value,

          experience: form.experience.value,

          consultationFee: Number(form.consultationFee.value),

          licenseNumber: form.licenseNumber.value,

          photoURL: form.photoURL.value,

          about: form.about.value,
        });

        router.push("/doctor-application-status");

        return;
      }

      router.push("/dashboard");

      router.push("/");
    } catch (err) {
      console.error(err);

      setError(err?.response?.data?.message || err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();

      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="max-w-2xl mx-auto py-20 px-4">
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h1 className="text-3xl font-bold">Register</h1>

          <RoleSelector role={role} setRole={setRole} />

          <form onSubmit={handleSubmit} className="space-y-4">
            <PatientFields />

            {role === "doctor" && <DoctorFields />}

            <button type="submit" className="btn btn-primary w-full">
              Register as {role === "doctor" ? "Doctor" : "Patient"}
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full mt-4"
          >
            Continue with Google
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold">
              Login
            </Link>
          </p>

          {error && <p className="text-error text-sm mt-3">{error}</p>}
        </div>
      </div>
    </section>
  );
}
