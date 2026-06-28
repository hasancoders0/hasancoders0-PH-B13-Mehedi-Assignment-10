"use client";

import { useEffect, useState } from "react";

import { getAllUsers, makeAdmin } from "@/services/admin.service";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const data = await getAllUsers();

    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleMakeAdmin = async (id) => {
    await makeAdmin(id);

    alert("User promoted to admin");

    loadUsers();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Manage Users</h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name || "N/A"}</td>

                <td>{user.email}</td>

                <td>
                  <span className="badge">{user.role}</span>
                </td>

                <td>
                  {user.role === "admin" ? (
                    <span className="text-success">Admin</span>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleMakeAdmin(user._id)}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
