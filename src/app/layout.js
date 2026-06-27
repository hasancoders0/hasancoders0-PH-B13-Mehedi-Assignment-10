import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AuthProvider from "@/providers/AuthProvider";

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

        <main className="min-h-screen">
          {children}
        </main>

        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}