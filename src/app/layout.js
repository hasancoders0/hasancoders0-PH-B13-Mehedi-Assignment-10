import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "MediCare Connect",
  description: "Hospital Appointment Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />

          <main className="min-h-screen">{children}</main>

          <Footer />
          <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>
      </body>
    </html>
  );
}
