"use client";

import { useRouter } from "next/navigation";

import { addDoctor } from "@/services/admin-doctor.service";

export default function AddDoctorPage() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const doctorData = {
      name: form.name.value,
      specialty: form.specialty.value,
      hospital: form.hospital.value,
      experience: form.experience.value,
      fee: Number(form.fee.value),
      image: form.image.value,
      rating: 4.8,
      availableDays: ["Sunday", "Monday", "Tuesday"],
    };

    await addDoctor(doctorData);

    alert("Doctor added successfully!");

    router.push("/dashboard/admin/doctors");
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        Add New Doctor
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="name"
          placeholder="Doctor Name"
          className="input input-bordered w-full"
          required
        />

        <input
          name="specialty"
          placeholder="Specialty"
          className="input input-bordered w-full"
          required
        />

        <input
          name="hospital"
          placeholder="Hospital"
          className="input input-bordered w-full"
          required
        />

        <input
          name="experience"
          placeholder="Experience (e.g. 10 Years)"
          className="input input-bordered w-full"
          required
        />

        <input
          name="fee"
          type="number"
          placeholder="Consultation Fee"
          className="input input-bordered w-full"
          required
        />

        <input
          name="image"
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />

        <button className="btn btn-primary">
          Add Doctor
        </button>
      </form>
    </div>
  );
}