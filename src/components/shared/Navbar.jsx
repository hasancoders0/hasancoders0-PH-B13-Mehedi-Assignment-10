"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";

import Logo from "./Logo";
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
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Find Doctors",
      href: "/find-doctors",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-base-100 border-b">
        <div className="container mx-auto px-4">
          <div className="navbar min-h-20 px-0">
            {/* Logo */}
            <div className="flex-1">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`transition-colors ${
                      isActive(item.href)
                        ? "text-primary font-semibold"
                        : "hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop User */}
            <div className="hidden lg:flex items-center ml-8">
              {user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={
                          user.photoURL ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.displayName || "User",
                          )}`
                        }
                        alt={user.displayName || "User"}
                      />
                    </div>
                  </div>

                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-60"
                  >
                    <li className="px-3 py-2 border-b mb-2">
                      <p className="font-semibold">
                        {user.displayName || "User"}
                      </p>

                      <p className="text-xs opacity-70 break-all">
                        {user.email}
                      </p>
                    </li>

                    <li>
                      <Link href="/dashboard">Dashboard</Link>
                    </li>

                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login" className="btn btn-ghost btn-sm">
                    Login
                  </Link>

                  <Link href="/register" className="btn btn-primary btn-sm">
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="btn btn-ghost btn-circle lg:hidden"
              onClick={() => setIsOpen(true)}
            >
              <HiMenu className="text-3xl" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Offcanvas */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ${
          isOpen ? "visible bg-black/50" : "invisible bg-transparent"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-base-100 shadow-2xl transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b">
            <Logo />

            <button
              className="btn btn-ghost btn-circle"
              onClick={() => setIsOpen(false)}
            >
              <HiX className="text-3xl" />
            </button>
          </div>

          {/* Navigation */}
          <ul className="flex flex-col p-6 gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 ${
                    isActive(item.href) ? "text-primary font-semibold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="divider my-0" />

          {/* Mobile Auth */}
          <div className="p-6">
            {user ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={
                          user.photoURL ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.displayName || "User",
                          )}`
                        }
                        alt={user.displayName || "User"}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {user.displayName || "User"}
                    </h3>

                    <p className="text-xs opacity-70 break-all">{user.email}</p>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="btn btn-primary w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn btn-outline w-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  className="btn btn-outline w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="btn btn-primary w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
