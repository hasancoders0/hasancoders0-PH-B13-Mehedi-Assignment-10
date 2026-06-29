"use client";

import { useEffect, useState } from "react";
import {
  FaUserGroup,
  FaPlay,
  FaPause,
  FaTrash,
  FaShieldHalved,
} from "react-icons/fa6";

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
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Manage Users</h1>
        <p className="text-sm opacity-50 mt-1 font-light">
          View, suspend, activate, or remove registered users.
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-base-100 border border-base-300/60 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="border-b border-base-300/50">
                <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                  Name
                </th>
                <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                  Email
                </th>
                <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                  Role
                </th>
                <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                  Status
                </th>
                <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100 text-end">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`hover:bg-base-200/50 transition-colors duration-200 ${
                    index !== users.length - 1
                      ? "border-b border-base-300/30"
                      : ""
                  }`}
                >
                  <td>
                    <div className="font-semibold text-sm">
                      {user.displayName || user.name || "N/A"}
                    </div>
                  </td>

                  <td className="text-sm opacity-60 font-light">
                    {user.email}
                  </td>

                  <td>
                    <span className="badge bg-base-200 text-base-content/70 border-0 text-xs font-medium capitalize">
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge border-0 text-xs font-medium ${
                        user.status === "suspended"
                          ? "bg-error/10 text-error"
                          : "bg-success/10 text-success"
                      }`}
                    >
                      {user.status || "active"}
                    </span>
                  </td>

                  <td>
                    {user.role === "admin" ? (
                      <div className="flex items-center justify-end gap-2 text-success text-xs font-semibold">
                        <FaShieldHalved className="text-sm" />
                        Protected
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        {user.status === "suspended" ? (
                          <button
                            className="btn btn-sm bg-success/10 text-success border-0 hover:bg-success/20 btn-square"
                            onClick={() => handleActivate(user._id)}
                            title="Activate User"
                          >
                            <FaPlay className="text-xs" />
                          </button>
                        ) : (
                          <button
                            className="btn btn-sm bg-warning/10 text-warning border-0 hover:bg-warning/20 btn-square"
                            onClick={() => handleSuspend(user._id)}
                            title="Suspend User"
                          >
                            <FaPause className="text-xs" />
                          </button>
                        )}

                        <button
                          className="btn btn-sm bg-error/10 text-error border-0 hover:bg-error/20 btn-square"
                          onClick={() => handleDelete(user._id)}
                          title="Delete User"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-3xl bg-base-200 flex items-center justify-center mb-6">
              <FaUserGroup className="text-3xl text-base-content/30" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              No users found
            </h3>
            <p className="opacity-50 mt-2 text-sm font-light">
              There are no users registered yet.
            </p>
          </div>
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
