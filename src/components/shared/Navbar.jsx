import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
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

            <li>
              <Link href="/dashboard">
                Dashboard
              </Link>
            </li>

            <li>
              <Link href="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}