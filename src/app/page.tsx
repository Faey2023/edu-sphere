import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Award, Calendar } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Excellence in Education
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Empowering students with quality education, experienced faculty,
                and comprehensive learning programs to shape tomorrow&#39;s
                leaders.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">Apply Now</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/teachers">Meet Our Faculty</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                About Our Institute
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                With over two decades of educational excellence, we are
                committed to providing comprehensive learning experiences that
                prepare students for success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Quality Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Comprehensive curriculum designed to meet modern educational
                    standards and industry requirements.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Expert Faculty</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Highly qualified and experienced teachers dedicated to
                    student success and academic excellence.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Award className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Proven Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Outstanding academic achievements and successful alumni who
                    excel in their chosen fields.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Teachers Section */}
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
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle>Dr. Teacher Name {i}</CardTitle>
                    <CardDescription>Subject Specialist</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge variant="secondary" className="mb-2">
                      PhD in Education
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      15+ years of teaching experience with expertise in modern
                      pedagogical methods.
                    </p>
                  </CardContent>
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

        {/* Latest Notices Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-foreground">
                Latest Notices
              </h2>
              <Button variant="outline" asChild>
                <Link href="/notices">View All Notices</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Annual Examination Schedule Released",
                  date: "2024-01-15",
                  type: "exam",
                },
                {
                  title: "New Semester Registration Open",
                  date: "2024-01-10",
                  type: "announcement",
                },
                {
                  title: "Science Fair Competition 2024",
                  date: "2024-01-08",
                  type: "event",
                },
                {
                  title: "Holiday Notice - National Day",
                  date: "2024-01-05",
                  type: "holiday",
                },
              ].map((notice, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{notice.title}</CardTitle>
                      <Badge
                        variant={
                          notice.type === "exam" ? "destructive" : "secondary"
                        }
                      >
                        {notice.type}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {notice.date}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Take the first step towards academic excellence. Contact us today!
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
