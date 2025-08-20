"use client";

import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
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
import { INotice } from "@/types";
import { useRouter } from "next/navigation";
import { createNotice } from "@/lib/slice/notice/noticeService";
import Swal from "sweetalert2";
import Layout from "@/components/dashboard/Layout";

const AddNoticePage = () => {
  const router = useRouter();

  const methods = useForm<INotice>({
    defaultValues: {
      title: "",
      description: "",
      type: "notice",
      date: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    control,
  } = methods;

  const onSubmit: SubmitHandler<INotice> = async (data) => {
    try {
      await createNotice(data);

      Swal.fire({
        icon: "success",
        title: "Notice Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      router.push("/notice");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      console.error(message);
      Swal.fire({
        icon: "error",
        title: "Failed to add notice",
        text: message,
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-10">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Add New Notice</h1>
            <p className="text-muted-foreground">
              Fill in the notice information to add it to the system
            </p>
          </div>

          <Card className="card-academic">
            <CardHeader>
              <CardTitle>Notice Information</CardTitle>
            </CardHeader>
            <CardContent>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Notice Details */}
                  <Card>
                    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormItem>
                        <FormLabel>Title *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Notice Title"
                            {...register("title", {
                              required: "Title is required",
                            })}
                          />
                        </FormControl>
                        {errors.title && (
                          <FormMessage>{errors.title.message}</FormMessage>
                        )}
                      </FormItem>

                      <FormItem>
                        <FormLabel>Date *</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...register("date", {
                              required: "Date is required",
                            })}
                          />
                        </FormControl>
                        {errors.date && (
                          <FormMessage>{errors.date.message}</FormMessage>
                        )}
                      </FormItem>

                      <FormItem className="md:col-span-2">
                        <FormLabel>Description *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Notice Description"
                            {...register("description", {
                              required: "Description is required",
                            })}
                          />
                        </FormControl>
                        {errors.description && (
                          <FormMessage>
                            {errors.description.message}
                          </FormMessage>
                        )}
                      </FormItem>

                      <FormField
                        control={control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select notice type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="notice">Notice</SelectItem>
                                <SelectItem value="announcement">
                                  Announcement
                                </SelectItem>
                                <SelectItem value="event">Event</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/admin/notices")}
                      className="flex-1 sm:flex-none min-w-[120px]"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="btn-academic flex-1 sm:flex-none min-w-[120px]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Adding Notice..." : "Add Notice"}
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

export default AddNoticePage;
