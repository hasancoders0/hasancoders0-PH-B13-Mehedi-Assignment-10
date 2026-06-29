export default function PatientFields() {
  return (
    <>
      <input
        name="name"
        type="text"
        placeholder="Full Name"
        className="input input-bordered w-full"
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email Address"
        className="input input-bordered w-full"
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        className="input input-bordered w-full"
        required
      />

      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        className="input input-bordered w-full"
        required
      />
    </>
  );
}