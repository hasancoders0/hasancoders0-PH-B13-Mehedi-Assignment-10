"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";

export default function useRole() {
  const { user } = useAuth();

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const token = localStorage.getItem("access-token");

        const res = await axios.get(
          `http://localhost:5000/api/users/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRole(res.data.user.role);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [user]);

  return { role, loading };
}