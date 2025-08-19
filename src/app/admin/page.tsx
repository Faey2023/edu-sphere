import {
  Users,
  FileText,
  Calendar,
  Settings,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Layout from "../../components/dashboard/Layout";
import TeacherTab from "@/components/dashboard/tabs/teacher/TeacherTab";

type Status = "Active" | "Inactive" | "Published" | "Draft";

const variants: Record<Status, "default" | "secondary"> = {
  Active: "default",
  Inactive: "secondary",
  Published: "default",
  Draft: "secondary",
};

const AdminDashboard = () => {
  const adminStats = [
    {
      title: "Total Teachers",
      value: "25",
      icon: Users,
      color: "from-primary to-primary-light",
    },
    {
      title: "Active Notices",
      value: "12",
      icon: FileText,
      color: "from-primary to-primary-light",
    },
    {
      title: "Upcoming Events",
      value: "8",
      icon: Calendar,
      color: "from-primary to-primary-light",
    },
    {
      title: "System Health",
      value: "98%",
      icon: Settings,
      color: "from-primary to-primary-light",
    },
  ];

  const recentNotices = [
    {
      id: 1,
      title: "Annual Sports Day 2024",
      status: "Published",
      date: "2024-01-15",
      views: 245,
    },
    {
      id: 2,
      title: "Science Fair Competition",
      status: "Draft",
      date: "2024-01-14",
      views: 0,
    },
    {
      id: 3,
      title: "New Academic Session",
      status: "Published",
      date: "2024-01-01",
      views: 567,
    },
  ];

  const getStatusBadge = (status: string) => {
    const variant = variants[status as Status] ?? "default";
    return <Badge variant={variant}>{status}</Badge>;
  };

  return (
    <Layout>
      <div className="min-h-screen section-padding shrink-0 flex-1">
        <div className="container-academic">
          {/* header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your educational institute efficiently
            </p>
          </div>

          {/* stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {adminStats.map((stat, index) => (
              <Card key={index} className="card-academic">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div
                    className={`size-8 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-white`}
                  >
                    <stat.icon className="size-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* content */}
          <Tabs defaultValue="teachers" className="space-y-6">
            <TabsList className="grid w-full lg:w-auto grid-cols-4">
              <TabsTrigger value="teachers">Teachers</TabsTrigger>
              <TabsTrigger value="notices">Notices</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            {/* teachers tab */}
            <TeacherTab />

            {/* notices tab */}
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
                      <PlusCircle className="size-4 mr-2" />
                      Create Notice
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Views</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentNotices.map((notice) => (
                          <TableRow key={notice.id}>
                            <TableCell className="font-medium">
                              {notice.title}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(notice.status)}
                            </TableCell>
                            <TableCell>
                              {new Date(notice.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{notice.views}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="size-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="size-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="size-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* events tab */}
            <TabsContent value="events" className="space-y-6">
              <Card className="card-academic">
                <CardHeader>
                  <CardTitle>Event Management</CardTitle>
                  <CardDescription>
                    Schedule and manage school events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Event Management
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Create and manage school events and activities
                    </p>
                    <Button className="btn-accent-academic">
                      <PlusCircle className="size-4 mr-2" />
                      Create Event
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
