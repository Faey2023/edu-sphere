"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  loginSuccess,
  authFailure,
  startLoading,
} from "@/lib/slice/auth/authSlice";
import type { RootState, AppDispatch } from "@/lib/store";
import Link from "next/link";
import { IUser } from "@/types";
import Swal from "sweetalert2";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!email || !password) {
      setLocalError("Email and password are required");
      return;
    }

    dispatch(startLoading());

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        dispatch(authFailure(errorData.message || "Login failed"));
        setLocalError(errorData.message || "Login failed");
        return;
      }

      const data: { user: IUser } = await res.json();

      dispatch(loginSuccess(data.user));

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // switch (data.user.role) {
      //   case "Admin":
      //     router.push("/admin/dashboard");
      //     break;
      //   case "Student":
      //     router.push("/student/dashboard");
      //     break;
      //   case "Editor":
      //     router.push("/editor/dashboard");
      //     break;
      //   default:
      //     router.push("/");
      // }
      router.push("/");
    } catch (err: any) {
      dispatch(authFailure(err.message || "Login failed"));
      // setLocalError(err.message || "Login failed");
      console.log(err);
      Swal.fire({
        icon: "error",
        title: `${err.message}`,
        // title: `${err.response?.data?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold mb-2">Edu Sphere</h2>
        <p className="text-center text-gray-600 mb-6">
          Sign in to your account to continue
        </p>

        {localError && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
            {localError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-5 text-gray-600 text-center text-sm space-y-3">
          Don&lsquo;t have an account?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
