"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ITeacher } from "@/types";
import { getTeachers } from "@/lib/slice/teacher/teacherService";
import { useEffect, useState } from "react";
import Image from "next/image";

const FeaturedTeachers = () => {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async (): Promise<void> => {
    try {
      const data: ITeacher[] = await getTeachers();
      setTeachers(data);
    } catch (error: unknown) {
      console.error("Failed to fetch teachers:", error);
    } finally {
    }
  };

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Our Distinguished Faculty
          </h2>
          <p className="text-muted-foreground">
            Meet some of our experienced educators who are passionate about
            teaching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teachers.map((teacher: ITeacher) => (
            <Card key={teacher._id}>
              <CardHeader className="text-center">
                <div className="size-24 rounded-full mx-auto mb-4 flex items-center justify-center">
                  {teacher.image && (
                    <Image
                      src={teacher.image}
                      alt={teacher.name}
                      width={100}
                      height={100}
                      className="object-cover size-24 rounded-full"
                    />
                  )}
                </div>
                <CardTitle className="capitalize">{teacher.name}</CardTitle>
                <CardDescription className="capitalize">
                  {teacher.subject}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/teachers">View All Teachers</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTeachers;
