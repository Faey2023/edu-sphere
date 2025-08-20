"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { INotice } from "@/types";
import { getNotices } from "@/lib/slice/notice/noticeService";

const LatestNotice = () => {
  const [notices, setNotices] = useState<INotice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const data = await getNotices();
        setNotices(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch notices");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-foreground">Latest Notices</h2>
          <Button variant="outline" asChild>
            <Link href="/notices">View All Notices</Link>
          </Button>
        </div>

        {loading && <p>Loading notices...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notices.slice(0, 4).map((notice) => (
            <Card key={notice._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{notice.title}</CardTitle>
                  <Badge
                    variant={
                      notice.type === "exam"
                        ? "destructive"
                        : notice.type === "holiday"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {notice.type || "general"}
                  </Badge>
                </div>
                <CardDescription className="flex items-center">
                  <Calendar className="size-4 mr-2" />
                  {new Date(
                    notice.date || notice.createdAt || ""
                  ).toDateString()}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNotice;
