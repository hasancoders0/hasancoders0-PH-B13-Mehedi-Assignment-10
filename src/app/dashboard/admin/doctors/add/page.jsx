"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { addDoctor } from "@/services/admin-doctor.service";

export default function AddDoctorPage() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const doctorData = {
      name: form.name.value,
      email: form.email.value,

      specialization: form.specialization.value,

      hospital: form.hospital.value,

      experience: form.experience.value,

      consultationFee: Number(form.consultationFee.value),

      photoURL: form.photoURL.value,

      qualification: form.qualification.value,

      about: form.about.value,

      availableDays: [],

      availableTimes: [],

      createdAt: new Date(),
    };

    await addDoctor(doctorData);

    toast.success("Doctor added successfully!");

    router.push("/dashboard/admin/doctors");
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Add New Doctor</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Doctor Name"
          className="input input-bordered w-full"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Doctor Email"
          className="input input-bordered w-full"
          required
        />

        <input
          name="specialization"
          placeholder="Specialization"
          className="input input-bordered w-full"
          required
        />

        <input
          name="qualification"
          placeholder="Qualification"
          className="input input-bordered w-full"
        />

        <input
          name="hospital"
          placeholder="Hospital"
          className="input input-bordered w-full"
        />

        <input
          name="experience"
          placeholder="Experience"
          className="input input-bordered w-full"
        />

        <input
          name="consultationFee"
          type="number"
          placeholder="Consultation Fee"
          className="input input-bordered w-full"
        />

        <input
          name="photoURL"
          placeholder="Photo URL"
          className="input input-bordered w-full"
        />

        <textarea
          name="about"
          placeholder="About Doctor"
          className="textarea textarea-bordered w-full"
        />
        
        <button className="btn btn-primary">Add Doctor</button>
      </form>
    </div>
  );
}
