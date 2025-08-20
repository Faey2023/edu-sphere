"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileText } from "lucide-react";
import { getNotices } from "@/lib/slice/notice/noticeService";
import { INotice } from "@/types";

const Notices = () => {
  const [notices, setNotices] = useState<INotice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const data = await getNotices();
        setNotices(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Failed to fetch notices:", error.message);
        } else {
          console.error("Failed to fetch notices:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Notices & Announcements
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest news, announcements, and important
              information from our institute.
            </p>
          </div>
        </section>

        {/* filter buttons */}
        <section className="py-8 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-2 justify-center">
            <Button variant="default" size="sm">
              All
            </Button>
            <Button variant="outline" size="sm">
              Exams
            </Button>
            <Button variant="outline" size="sm">
              Announcements
            </Button>
            <Button variant="outline" size="sm">
              Events
            </Button>
            <Button variant="outline" size="sm">
              Holidays
            </Button>
            <Button variant="outline" size="sm">
              Meetings
            </Button>
          </div>
        </section>

        {/* notices list */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <p className="text-center text-muted-foreground">
                Loading notices...
              </p>
            ) : notices.length > 0 ? (
              <div className="space-y-6">
                {notices.map((notice) => (
                  <Card key={notice._id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl">
                            {notice.title}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(notice.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Badge>{notice.type || "general"}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {notice.description}
                      </p>
                      {notice.attachment && (
                        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">
                            Attachment:
                          </span>
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 h-auto"
                            onClick={() =>
                              window.open(notice.attachment, "_blank")
                            }
                          >
                            View File
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No notices found.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Notices;
