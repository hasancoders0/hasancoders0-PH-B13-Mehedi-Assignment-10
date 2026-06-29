"use client";

import { useEffect, useState } from "react";

import ConfirmModal from "@/components/shared/ConfirmModal";

import {
  getAllUsers,
  suspendUser,
  activateUser,
  deleteUser,
} from "@/services/admin.service";

const initialModalState = {
  open: false,
  title: "",
  message: "",
  confirmText: "Confirm",
  confirmClass: "btn-primary",
  onConfirm: null,
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [confirmModal, setConfirmModal] = useState(initialModalState);

  const closeModal = () => {
    setConfirmModal(initialModalState);
  };

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await getAllUsers();

      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSuspend = (id) => {
    setConfirmModal({
      open: true,
      title: "Suspend User",
      message: "Are you sure you want to suspend this user?",
      confirmText: "Suspend",
      confirmClass: "btn-warning",

      onConfirm: async () => {
        try {
          await suspendUser(id);

          closeModal();

          loadUsers();
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  const handleActivate = (id) => {
    setConfirmModal({
      open: true,
      title: "Activate User",
      message: "Are you sure you want to activate this user?",
      confirmText: "Activate",
      confirmClass: "btn-success",

      onConfirm: async () => {
        try {
          await activateUser(id);

          closeModal();

          loadUsers();
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  const handleDelete = (id) => {
    setConfirmModal({
      open: true,
      title: "Delete User",
      message: "This action cannot be undone. Delete this user permanently?",
      confirmText: "Delete",
      confirmClass: "btn-error",

      onConfirm: async () => {
        try {
          await deleteUser(id);

          closeModal();

          loadUsers();
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  if (loading) {
    return <div className="text-center py-20">Loading users...</div>;
  }

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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.displayName || user.name || "N/A"}</td>

                <td>{user.email}</td>

                <td>
                  <span className="badge badge-outline">{user.role}</span>
                </td>

                <td>
                  <span
                    className={`badge ${
                      user.status === "suspended"
                        ? "badge-error"
                        : "badge-success"
                    }`}
                  >
                    {user.status || "active"}
                  </span>
                </td>

                <td>
                  {user.role === "admin" ? (
                    <span className="font-semibold text-success">
                      Protected
                    </span>
                  ) : (
                    <div className="flex gap-2">
                      {user.status === "suspended" ? (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleActivate(user._id)}
                        >
                          Activate
                        </button>
                      ) : (
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleSuspend(user._id)}
                        >
                          Suspend
                        </button>
                      )}

                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-10">No users found.</div>
        )}
      </div>

      <ConfirmModal
        isOpen={confirmModal.open}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        confirmClass={confirmModal.confirmClass}
        onConfirm={confirmModal.onConfirm}
        onClose={closeModal}
      />
    </div>
  );
}
