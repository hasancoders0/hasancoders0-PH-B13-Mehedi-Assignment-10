import axiosSecure from "@/lib/axiosSecure";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

// Get User by Email
export const getUserByEmail = async (email) => {
  const { data } = await axiosSecure.get(
    `${API_URL}/api/users/${email}`
  );

  return data.user;
};

// Update User Profile
export const updateUserProfile = async (
  id,
  profileData
) => {
  const { data } = await axiosSecure.patch(
    `${API_URL}/api/users/${id}`,
    profileData
  );

  return data;
};