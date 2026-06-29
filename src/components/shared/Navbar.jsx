"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  FaHeartbeat,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaThLarge,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

import useAuth from "@/hooks/useAuth";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logoutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Find Doctors", href: "/find-doctors" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-base-200 shadow-sm font-sans">
        <div className="container mx-auto px-4">
          <div className="navbar min-h-[72px] px-0">
            {/* Logo */}
            <div className="flex-1">
              <Link
                href="/"
                className="flex items-center gap-2 text-2xl font-bold tracking-tight transition-transform hover:scale-105"
              >
                <FaHeartbeat className="text-primary text-3xl" />
                <span className="text-neutral">MediCare</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? "bg-primary text-primary-content shadow-sm"
                        : "text-neutral/70 hover:text-primary hover:bg-primary/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop User Actions */}
            <div className="hidden lg:flex items-center ml-6 gap-4">
              {user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all rounded-full"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-base-200 flex items-center justify-center">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaUserCircle className="w-full h-full text-base-300" />
                      )}
                    </div>
                  </div>

                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow-xl bg-white rounded-xl w-72 border border-base-200"
                  >
                    <li className="p-4 flex items-center gap-3 border-b border-base-200 mb-2">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-base-200 flex items-center justify-center">
                          {user.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt={user.displayName || "User"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FaUserCircle className="w-full h-full text-base-300" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="font-bold text-neutral truncate">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs text-neutral/60 truncate">
                          {user.email}
                        </p>
                      </div>
                    </li>

                    <li>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 text-neutral hover:text-primary transition-colors rounded-lg py-2"
                      >
                        <FaThLarge /> Dashboard
                      </Link>
                    </li>

                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-error hover:bg-error hover:text-white transition-colors rounded-lg py-2 w-full"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="btn btn-sm btn-outline btn-primary rounded-full font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="btn btn-sm btn-primary rounded-full font-medium shadow-sm hover:shadow-md transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="btn btn-ghost btn-circle lg:hidden"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <FaBars className="text-2xl text-neutral" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Offcanvas */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ${
          isOpen
            ? "visible bg-black/40 backdrop-blur-sm"
            : "invisible bg-transparent"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-5 border-b border-base-200">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold"
              onClick={() => setIsOpen(false)}
            >
              <FaHeartbeat className="text-primary text-2xl" />
              <span className="text-neutral">MediCare</span>
            </Link>
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes className="text-2xl text-neutral" />
            </button>
          </div>

          {/* Drawer Navigation */}
          <ul className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-primary text-primary-content shadow-sm"
                      : "text-neutral/80 hover:bg-base-200"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="divider my-0" />

          {/* Mobile Auth */}
          <div className="p-4">
            {user ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 p-3 bg-base-100 rounded-xl border border-base-200">
                  <div className="avatar">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-base-200 flex items-center justify-center">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaUserCircle className="w-full h-full text-base-300" />
                      )}
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-neutral truncate">
                      {user.displayName || "User"}
                    </h3>
                    <p className="text-xs text-neutral/60 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="btn btn-primary w-full rounded-xl"
                  onClick={() => setIsOpen(false)}
                >
                  <FaThLarge /> Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-error w-full rounded-xl"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  className="btn btn-outline btn-primary w-full rounded-xl"
                  onClick={() => setIsOpen(false)}
                >
                  <FaSignInAlt /> Login
                </Link>
                <Link
                  href="/register"
                  className="btn btn-primary w-full rounded-xl shadow-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUserPlus /> Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
