"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import { ITeacher } from "@/types";
import { getTeachers } from "@/lib/slice/teacher/teacherService";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getTeachers();
        setTeachers(data);
      } catch (error) {
        console.error("Failed to load teachers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* header */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Our Distinguished Faculty
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Meet our experienced and dedicated teachers who are committed to
                providing quality education and nurturing student success.
              </p>
            </div>
          </div>
        </section>

        {/* teachers */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <p className="text-center text-muted-foreground">
                Loading teachers...
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teachers.map((teacher) => (
                  <Card key={teacher._id} className="overflow-hidden">
                    <CardHeader className="text-center pb-4">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
                        <Image
                          src={teacher.image || "/placeholder.svg"}
                          alt={teacher.name}
                          className="w-full h-full object-cover"
                          width={128}
                          height={128}
                        />
                      </div>
                      <CardTitle className="text-xl capitalize">{teacher.name}</CardTitle>
                      <CardDescription className="text-primary font-semibold capitalize">
                        {teacher.subject}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 pt-4 border-t border-border">
                        {teacher.email && (
                          <div className="flex items-center text-sm">
                            <Mail className="h-4 w-4 mr-2 text-primary" />
                            <a
                              href={`mailto:${teacher.email}`}
                              className="text-primary hover:underline"
                            >
                              {teacher.email}
                            </a>
                          </div>
                        )}
                        {teacher.phone && (
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 mr-2 text-primary" />
                            <a
                              href={`tel:${teacher.phone}`}
                              className="text-muted-foreground hover:text-primary"
                            >
                              {teacher.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default TeachersPage;
