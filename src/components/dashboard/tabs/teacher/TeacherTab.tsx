"use client";

import { PlusCircle, Edit, Trash2, Eye, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, ChangeEvent } from "react";
import { ITeacher } from "@/types";
import { getTeachers } from "@/lib/slice/teacher/teacherService";

const TeacherTab = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTeachers = async (): Promise<void> => {
      try {
        setLoading(true);
        const data: ITeacher[] = await getTeachers();
        setTeachers(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Failed to fetch teachers:", error.message);
        } else {
          console.error("Failed to fetch teachers:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const filteredTeachers: ITeacher[] = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <TabsContent value="teachers" className="space-y-6">
        <Card className="card-academic">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Teacher Management</CardTitle>
                <CardDescription>
                  Manage faculty members and their profiles
                </CardDescription>
              </div>
              <Link href="/admin/teacher">
                <Button className="btn-academic">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Teacher
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        Loading teachers...
                      </TableCell>
                    </TableRow>
                  ) : filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher: ITeacher) => (
                      <TableRow key={teacher._id}>
                        <TableCell className="flex items-center gap-2 font-medium">
                          {teacher.image && (
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-border">
                              <Image
                                src={teacher.image}
                                alt={teacher.name}
                                width={32}
                                height={32}
                                className="object-cover"
                              />
                            </div>
                          )}
                          {teacher.name}
                        </TableCell>
                        <TableCell>{teacher.subject}</TableCell>
                        <TableCell>{teacher.email || "-"}</TableCell>
                        <TableCell>{teacher.phone || "-"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No teachers found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default TeacherTab;
