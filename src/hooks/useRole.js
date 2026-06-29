"use client";

import { useEffect, useState } from "react";

import axiosSecure from "@/lib/axiosSecure";
import useAuth from "./useAuth";

export default function useRole() {
  const { user } = useAuth();

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setRole(null);
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const res = await axiosSecure.get(
          `/api/users/${user.email}`
        );

        setRole(res.data.user.role);
      } catch (error) {
        console.error(error);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [user]);

  return {
    role,
    loading,
  };
}