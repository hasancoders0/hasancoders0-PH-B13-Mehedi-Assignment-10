import { HiUser, HiBriefcase } from "react-icons/hi2";

const roles = [
  {
    key: "patient",
    label: "Patient",
    icon: HiUser,
  },
  {
    key: "doctor",
    label: "Doctor",
    icon: HiBriefcase,
  },
];

export default function RoleSelector({ role, setRole }) {
  return (
    <div className="grid grid-cols-2 bg-base-200 border border-base-300/50 rounded-2xl p-1.5 gap-1.5">
      {roles.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => setRole(key)}
          className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl text-sm font-semibold tracking-tight transition-all duration-300 ${
            role === key
              ? "bg-base-100 text-base-content shadow-sm scale-[1.02]"
              : "text-base-content/40 hover:text-base-content/70 hover:bg-base-100/50"
          }`}
        >
          <Icon
            className={`text-xl transition-colors duration-300 ${
              role === key ? "text-primary" : ""
            }`}
          />
          {label}
        </button>
      ))}
    </div>
  );
}
