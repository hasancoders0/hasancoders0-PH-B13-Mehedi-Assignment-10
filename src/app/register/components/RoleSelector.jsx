export default function RoleSelector({
  role,
  setRole,
}) {
  return (
    <div className="tabs tabs-boxed w-full mb-6">
      <button
        type="button"
        className={`tab flex-1 ${
          role === "patient"
            ? "tab-active"
            : ""
        }`}
        onClick={() =>
          setRole("patient")
        }
      >
        Patient
      </button>

      <button
        type="button"
        className={`tab flex-1 ${
          role === "doctor"
            ? "tab-active"
            : ""
        }`}
        onClick={() =>
          setRole("doctor")
        }
      >
        Doctor
      </button>
    </div>
  );
}