import "./globals.css";

import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import AuthProvider from "@/providers/AuthProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "MediCare",
  description: "Hospital Appointment & Healthcare Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <Navbar />

          <main className="min-h-screen">{children}</main>

          <Footer />

          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
