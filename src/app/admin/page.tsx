import { Users, FileText, Calendar, PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "../../components/dashboard/Layout";
import TeacherTab from "@/components/dashboard/tabs/teacher/TeacherTab";
import NoticeTab from "@/components/dashboard/tabs/notice/NoticeTab";

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
  ];

  return (
    <Layout>
      <div className="min-h-screen shrink-0 flex-1">
        <div className="container">
          {/* header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your educational institute efficiently
            </p>
          </div>

          {/* stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
            <TabsList className="grid w-full lg:w-auto grid-cols-3">
              <TabsTrigger value="teachers">Teachers</TabsTrigger>
              <TabsTrigger value="notices">Notices</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            {/* teachers tab */}
            <TeacherTab />

            {/* notices tab */}
            <NoticeTab />

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
