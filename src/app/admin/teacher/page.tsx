"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ITeacher } from "@/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import { createTeacher } from "@/lib/slice/teacher/teacherService";
import {
  startLoading,
  addTeacherSuccess,
  setError,
} from "@/lib/slice/teacher/teacherSlice";
import Image from "next/image";
import Layout from "@/components/dashboard/Layout";
import Swal from "sweetalert2";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

const AddTeacherPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const methods = useForm<ITeacher>({
    defaultValues: {
      name: "",
      subject: "",
      email: "",
      phone: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    register,
  } = methods;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const uploadToImgBB = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    if (!data.success) throw new Error("Failed to upload image to ImgBB");
    return data.data.url;
  };

  // const onSubmit: SubmitHandler<ITeacher> = async (data) => {
  //   dispatch(startLoading());
  //   try {
  //     let imageUrl = "";
  //     if (selectedImage) {
  //       imageUrl = await uploadToImgBB(selectedImage);
  //     }

  //     const teacherData = { ...data, image: imageUrl };
  //     const newTeacher = await createTeacher(teacherData as any);
  //     dispatch(addTeacherSuccess(newTeacher));
  //     Swal.fire({
  //       icon: "success",
  //       title: "Teacher Added Successfully",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     router.push("/admin");
  //   } catch (error: any) {
  //     dispatch(setError(error.message));
  //     console.log(error.message);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Failed to add teacher: " + error.message,
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //   }
  // };

  // If ITeacher type is like this:

  const onSubmit: SubmitHandler<ITeacher> = async (data) => {
    dispatch(startLoading());
    try {
      let imageUrl = "";
      if (selectedImage) {
        imageUrl = await uploadToImgBB(selectedImage);
      }

      const teacherData: ITeacher = { ...data, image: imageUrl };

      const newTeacher = await createTeacher(teacherData);

      dispatch(addTeacherSuccess(newTeacher));
      Swal.fire({
        icon: "success",
        title: "Teacher Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/admin");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      dispatch(setError(message));
      console.log(message);
      Swal.fire({
        icon: "error",
        title: "Failed to add teacher: " + message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-screen section-padding">
        <div className="container-academic">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Add New Teacher</h1>
            <p className="text-muted-foreground">
              Fill in the teacher&apos;s information to add them to the system
            </p>
          </div>

          <Card className="card-academic">
            <CardHeader>
              <CardTitle>Teacher Information</CardTitle>
            </CardHeader>
            <CardContent>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Profile Image Upload */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Profile Photo
                      </h3>
                      <div className="flex items-center gap-6">
                        {imagePreview ? (
                          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-border">
                            <Image
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              width={96}
                              height={96}
                            />
                          </div>
                        ) : (
                          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-4 border-dashed border-border">
                            <Upload className="h-10 w-10 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full max-w-md"
                          />
                          <p className="text-sm text-muted-foreground mt-2">
                            Upload a professional photo (JPG, PNG). Recommended
                            size: 400x400px
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Basic Information */}
                  <Card>
                    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Full Name"
                            {...register("name", {
                              required: "Name is required",
                            })}
                          />
                        </FormControl>
                        {errors.name && (
                          <FormMessage>{errors.name.message}</FormMessage>
                        )}
                      </FormItem>

                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="teacher@school.edu"
                            {...register("email")}
                          />
                        </FormControl>
                        {errors.email && (
                          <FormMessage>{errors.email.message}</FormMessage>
                        )}
                      </FormItem>

                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+880 1XXX-XXXXXX"
                            {...register("phone")}
                          />
                        </FormControl>
                        {errors.phone && (
                          <FormMessage>{errors.phone.message}</FormMessage>
                        )}
                      </FormItem>

                      <FormField
                        control={control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || ""}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select subject" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="mathematics">
                                  Mathematics
                                </SelectItem>
                                <SelectItem value="physics">Physics</SelectItem>
                                <SelectItem value="chemistry">
                                  Chemistry
                                </SelectItem>
                                <SelectItem value="biology">Biology</SelectItem>
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="bangla">Bangla</SelectItem>
                                <SelectItem value="history">History</SelectItem>
                                <SelectItem value="geography">
                                  Geography
                                </SelectItem>
                                <SelectItem value="economics">
                                  Economics
                                </SelectItem>
                                <SelectItem value="ict">ICT</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Form Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/admin")}
                      className="flex-1 sm:flex-none min-w-[120px]"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="btn-academic flex-1 sm:flex-none min-w-[120px]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Adding Teacher..." : "Add Teacher"}
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AddTeacherPage;
