"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerSuccess,
  authFailure,
  startLoading,
} from "@/lib/slice/auth/authSlice";
import type { RootState, AppDispatch } from "@/lib/store";
import Link from "next/link";
import { registerApi } from "@/lib/slice/auth/authService";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "Student",
  });
  const [localError, setLocalError] = useState("");
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) setLocalError(error);
  }, [error]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (localError) {
      setLocalError("");
    }
  };

  const validateForm = () => {
    if (!formData.firstName.trim())
      return setLocalError("First name is required");
    if (!formData.lastName.trim())
      return setLocalError("Last name is required");
    if (!formData.email.trim()) return setLocalError("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return setLocalError("Please enter a valid email");
    if (!formData.password) return setLocalError("Password is required");
    if (formData.password.length < 6)
      return setLocalError("Password must be at least 6 characters");
    if (!formData.role) return setLocalError("Please select a role");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!validateForm()) return;

    dispatch(startLoading());

    try {
      const user = await registerApi({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      dispatch(registerSuccess(user));
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/login");
    } catch (err: any) {
      dispatch(
        authFailure(err.response?.data?.message || "Registration failed")
      );
      Swal.fire({
        icon: "error",
        title: `${err.response?.data?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-center text-gray-600 mb-6">Register to Edu Sphere</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block mb-1 font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-1 font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* <div>
            <label
              htmlFor="role"
              className="block mb-1 font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your role</option>
              <option value="Admin">Admin</option>
              <option value="Student">Student</option>
              <option value="Editor">Editor</option>
            </select>
          </div> */}

          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 6 characters long
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
