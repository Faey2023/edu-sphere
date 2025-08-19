"use client";

import { PlusCircle, Edit, Trash2, Search } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, ChangeEvent } from "react";
import { ITeacher } from "@/types";
import {
  getTeachers,
  updateTeacher,
  deleteTeacher,
} from "@/lib/slice/teacher/teacherService";
import Swal from "sweetalert2";

const TeacherTab = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [editingTeacher, setEditingTeacher] = useState<ITeacher | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async (): Promise<void> => {
    try {
      setLoading(true);
      const data: ITeacher[] = await getTeachers();
      setTeachers(data);
    } catch (error: unknown) {
      console.error("Failed to fetch teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const filteredTeachers: ITeacher[] = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (teacher: ITeacher): void => {
    setEditingTeacher(teacher);
    setIsDialogOpen(true);
  };

  const handleUpdate = async (): Promise<void> => {
    if (!editingTeacher) return;
    try {
      await updateTeacher(editingTeacher._id, editingTeacher);
      setIsDialogOpen(false);
      fetchTeachers();
      Swal.fire("Updated!", "Teacher details updated successfully.", "success");
    } catch (error: unknown) {
      Swal.fire("Error", "Failed to update teacher.", "error");
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteTeacher(id);
        setTeachers((prev) => prev.filter((t) => t._id !== id));
        Swal.fire("Deleted!", "Teacher has been deleted.", "success");
      } catch (error: unknown) {
        Swal.fire("Error", "Failed to delete teacher.", "error");
      }
    }
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
                  <PlusCircle className="size-4 mr-2" />
                  Add Teacher
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
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
                            <div className="size-8 rounded-full overflow-hidden border border-border">
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
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(teacher)}
                            >
                              <Edit className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(teacher._id)}
                            >
                              <Trash2 className="size-4" />
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

      {/* Update Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
          </DialogHeader>
          {editingTeacher && (
            <div className="space-y-4">
              <Input
                value={editingTeacher.name}
                onChange={(e) =>
                  setEditingTeacher({ ...editingTeacher, name: e.target.value })
                }
                placeholder="Name"
              />
              <Input
                value={editingTeacher.subject}
                onChange={(e) =>
                  setEditingTeacher({
                    ...editingTeacher,
                    subject: e.target.value,
                  })
                }
                placeholder="Subject"
              />
              <Input
                value={editingTeacher.email || ""}
                readOnly
                placeholder="Email"
              />
              <Input
                value={editingTeacher.phone || ""}
                onChange={(e) =>
                  setEditingTeacher({
                    ...editingTeacher,
                    phone: e.target.value,
                  })
                }
                placeholder="Phone"
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherTab;
