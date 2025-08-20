"use client";

import { PlusCircle, Edit, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { useEffect, useState } from "react";
import { INotice } from "@/types";
import {
  getNotices,
  updateNotice,
  deleteNotice,
} from "@/lib/slice/notice/noticeService";
import Swal from "sweetalert2";

const NoticeTab = () => {
  const [notices, setNotices] = useState<INotice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [editingNotice, setEditingNotice] = useState<INotice | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const data = await getNotices();
      setNotices(data);
    } catch (error: unknown) {
      console.error("Failed to fetch notices:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (notice: INotice) => {
    setEditingNotice(notice);
    setIsDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingNotice) return;
    try {
      await updateNotice(editingNotice._id, editingNotice);
      setIsDialogOpen(false);
      fetchNotices();
      Swal.fire("Updated!", "Notice updated successfully.", "success");
    } catch (error: unknown) {
      Swal.fire("Error", "Failed to update notice.", "error");
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
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
        await deleteNotice(id);
        setNotices((prev) => prev.filter((n) => n._id !== id));
        Swal.fire("Deleted!", "Notice has been deleted.", "success");
      } catch (error: unknown) {
        Swal.fire("Error", "Failed to delete notice.", "error");
        console.log(error);
      }
    }
  };

  return (
    <TabsContent value="notices" className="space-y-6">
      <Card className="card-academic">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Notice Management</CardTitle>
              <CardDescription>
                Create and manage notices and announcements
              </CardDescription>
            </div>
            <Button className="btn-secondary-academic">
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Notice
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground">
              Loading notices...
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notices.length > 0 ? (
                    notices.map((notice) => (
                      <TableRow key={notice._id}>
                        <TableCell className="font-medium">
                          {notice.title}
                        </TableCell>
                        <TableCell>
                          <Badge>{notice.type || "general"}</Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(notice.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(notice)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(notice._id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No notices found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Notice</DialogTitle>
          </DialogHeader>
          {editingNotice && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={editingNotice.title}
                onChange={(e) =>
                  setEditingNotice({ ...editingNotice, title: e.target.value })
                }
                className="input input-bordered w-full"
              />
              <textarea
                placeholder="Description"
                value={editingNotice.description}
                onChange={(e) =>
                  setEditingNotice({
                    ...editingNotice,
                    description: e.target.value,
                  })
                }
                className="textarea textarea-bordered w-full"
              />
              <input
                type="text"
                placeholder="Type"
                value={editingNotice.type}
                onChange={(e) =>
                  setEditingNotice({ ...editingNotice, type: e.target.value })
                }
                className="input input-bordered w-full"
              />
              <input
                type="date"
                value={editingNotice.date.split("T")[0]}
                onChange={(e) =>
                  setEditingNotice({ ...editingNotice, date: e.target.value })
                }
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Attachment URL"
                value={editingNotice.attachment || ""}
                onChange={(e) =>
                  setEditingNotice({
                    ...editingNotice,
                    attachment: e.target.value,
                  })
                }
                className="input input-bordered w-full"
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TabsContent>
  );
};

export default NoticeTab;
