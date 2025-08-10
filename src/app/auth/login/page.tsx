"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";

import {
  loginSuccess,
  authFailure,
  startLoading,
} from "@/lib/slice/auth/authSlice";
import type { RootState, AppDispatch } from "@/lib/store";
import type { IUser } from "@/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading } = useSelector((state: RootState) => state.auth);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
  //   dispatch(startLoading());

  //   try {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     });

  //     if (!res.ok) {
  //       const errorData: { message: string } = await res.json();
  //       dispatch(authFailure(errorData.message || "Login failed"));
  //       setError("email", { message: errorData.message || "Login failed" });
  //       Swal.fire({
  //         icon: "error",
  //         title: errorData.message || "Login failed",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       return;
  //     }

  //     const jsonData: { user: IUser } = await res.json();
  //     dispatch(loginSuccess(jsonData.user));

  //     if (typeof window !== "undefined") {
  //       localStorage.setItem("user", JSON.stringify(jsonData.user));
  //     }

  //     Swal.fire({
  //       icon: "success",
  //       title: "Login Successful!",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     console.log(data)

  //     // switch (data.user.role) {
  //     //   case "Admin":
  //     //     router.push("/admin/dashboard");
  //     //     break;
  //     //   case "Student":
  //     //     router.push("/student/dashboard");
  //     //     break;

  //     //   default:
  //     //     router.push("/");
  //     // }

  //     // router.push("/");
  //   } catch (err: unknown) {
  //     let message = "Login failed";

  //     if (err instanceof Error) {
  //       message = err.message;
  //     }

  //     dispatch(authFailure(message));
  //     Swal.fire({
  //       icon: "error",
  //       title: message,
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //   }
  // };

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    dispatch(startLoading());

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData: { message: string } = await res.json();
        dispatch(authFailure(errorData.message || "Login failed"));
        setError("email", { message: errorData.message || "Login failed" });
        Swal.fire({
          icon: "error",
          title: errorData.message || "Login failed",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      const jsonData: { user: IUser } = await res.json();
      dispatch(loginSuccess(jsonData.user));

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(jsonData.user));
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Use jsonData.user.role instead of data.user.role
      switch (jsonData.user.role) {
        case "Admin":
          router.push("/admin/dashboard");
          break;
        case "Student":
          router.push("/student/dashboard");
          break;
        case "Editor":
          router.push("/editor/dashboard");
          break;
        default:
          router.push("/");
      }
    } catch (err: unknown) {
      let message = "Login failed";

      if (err instanceof Error) {
        message = err.message;
      }

      dispatch(authFailure(message));
      Swal.fire({
        icon: "error",
        title: message,
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label htmlFor="email">Email</Label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              )}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              )}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
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
