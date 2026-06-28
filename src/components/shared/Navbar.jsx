"use client";

import Link from "next/link";

import Logo from "./Logo";
import useAuth from "@/hooks/useAuth";

export default function Navbar() {
  const { user, logoutUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="navbar bg-base-100 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between w-full">
          <Logo />

          <ul className="flex items-center gap-5">
            <li>
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="/find-doctors">
                Find Doctors
              </Link>
            </li>

            <li>
              <Link href="/about">
                About
              </Link>
            </li>

            <li>
              <Link href="/contact">
                Contact
              </Link>
            </li>

            {user && (
              <li>
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </li>
            )}

            {user ? (
              <>
                <li className="text-sm">
                  {user.displayName || user.email}
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-outline"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    href="/register"
                    className="btn btn-primary btn-sm"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

