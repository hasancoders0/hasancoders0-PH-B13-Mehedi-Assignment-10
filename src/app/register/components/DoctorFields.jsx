export default function DoctorFields() {
  return (
    <>
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
        placeholder="Experience"
        className="input input-bordered w-full"
        required
      />

      <input
        name="consultationFee"
        type="number"
        placeholder="Consultation Fee"
        className="input input-bordered w-full"
        required
      />

      <input
        name="licenseNumber"
        placeholder="Medical License Number"
        className="input input-bordered w-full"
        required
      />

      <input
        name="photoURL"
        placeholder="Photo URL"
        className="input input-bordered w-full"
      />

      <textarea
        name="about"
        rows={4}
        placeholder="About Yourself"
        className="textarea textarea-bordered w-full"
        required
      />
    </>
  );
}