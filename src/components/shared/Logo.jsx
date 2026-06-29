"use client";

import Link from "next/link";
import { FaHeartbeat } from "react-icons/fa";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary">
      <FaHeartbeat className="text-3xl" />

      <span className="text-2xl font-bold">MediCare</span>
    </Link>
  );
}
