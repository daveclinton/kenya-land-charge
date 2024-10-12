"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number: string;
  address: string;
}

interface ProfileFormProps {
  initialData: UserData;
  activeTab: "info" | "password";
}

export default function ProfileForm({
  initialData,
  activeTab,
}: ProfileFormProps) {
  const [userData, setUserData] = useState<UserData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Submitting form data:", userData);

    try {
      const response = await fetch("/api/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const result = await response.json();
      console.log("Profile update result:", result);
      alert("Your profile has been successfully updated!");
      router.refresh();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(
        `We couldn't update your profile at this time. Please try again later. ${
          error instanceof Error ? error.message : ""
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      alert("New passwords don't match. Please try again.");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("/api/updatePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: password.current,
          newPassword: password.new,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update password");
      }

      alert("Your password has been successfully updated!");
      setPassword({ current: "", new: "", confirm: "" });
    } catch (error) {
      console.error("Error updating password:", error);
      alert(
        `We couldn't update your password at this time. Please try again later. ${
          error instanceof Error ? error.message : ""
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (activeTab === "info") {
    return (
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-sky-800 mb-2">
            Personal Information
          </h2>
          <p className="text-sky-600 mb-6">
            Update your personal details to keep your account current.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-sky-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={userData.first_name}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-sky-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 transition-colors duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-sky-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={userData.last_name}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-sky-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 transition-colors duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="date_of_birth"
                className="block text-sm font-medium text-sky-700 mb-1"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={userData.date_of_birth}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-sky-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 transition-colors duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-sky-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={userData.phone_number}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-sky-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 transition-colors duration-200"
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-sky-800 mb-2">
            Contact Information
          </h2>
          <p className="text-sky-600 mb-6">
            Ensure we have your correct address for important communications.
          </p>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-sky-700 mb-1"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={userData.address}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-sky-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 transition-colors duration-200"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 transition-colors duration-200"
          >
            {isLoading ? "Updating Your Profile..." : "Save Changes"}
          </button>
          <p className="mt-2 text-sm text-sky-500 text-center">
            Your information is securely stored and never shared without your
            permission.
          </p>
        </div>
      </form>
    );
  }

  if (activeTab === "password") {
    return (
      <form onSubmit={handlePasswordSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-sky-800 mb-2">
            Update Password
          </h2>
          <p className="text-sky-600 mb-6">
            Ensure your account stays secure by updating your password
            regularly.
          </p>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="current_password"
                className="block text-sm font-medium text-sky-700 mb-1"
              >
                Current Password
              </label>
              <input
                type="password"
                id="current_password"
                name="current"
                value={password.current}
                onChange={handlePasswordChange}
                required
                className="block w-full rounded-md border-sky-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 transition-colors duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="new_password"
                className="block text-sm font-medium text-sky-700 mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                id="new_password"
                name="new"
                value={password.new}
                onChange={handlePasswordChange}
                required
                className="block w-full rounded-md border-sky-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 transition-colors duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-sky-700 mb-1"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm"
                value={password.confirm}
                onChange={handlePasswordChange}
                required
                className="block w-full rounded-md border-sky-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 transition-colors duration-200"
              />
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 transition-colors duration-200"
          >
            {isLoading ? "Updating Password..." : "Update Password"}
          </button>
        </div>
      </form>
    );
  }

  return null;
}
