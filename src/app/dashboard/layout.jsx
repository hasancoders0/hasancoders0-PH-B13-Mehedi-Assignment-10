import PrivateRoute from "@/middleware/PrivateRoute";

export default function DashboardLayout({ children }) {
  return (
    <PrivateRoute>
      <div className="container mx-auto py-10 px-4">
        {children}
      </div>
    </PrivateRoute>
  );
}