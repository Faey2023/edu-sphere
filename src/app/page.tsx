import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Users, Award } from "lucide-react";
import Link from "next/link";
import FeaturedTeachers from "@/components/home/FeaturedTeachers";
import LatestNotice from "@/components/home/LatestNotice";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* hero Section */}
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

        {/* about */}
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

        {/* featured section */}
        <FeaturedTeachers />

        {/* latest notice */}
        <LatestNotice />

        {/* contact section */}
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
    </div>
  );
};

export default Home;
