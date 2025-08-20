"use client";

import { useTranslations } from "next-intl";
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

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {t("heroTitle")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t("heroText")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">{t("applyNow")}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/teachers">{t("meetFaculty")}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("aboutTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("aboutText")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card>
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{t("qualityEducation")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t("qualityEducationText")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{t("expertFaculty")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t("expertFacultyText")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Award className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{t("provenResults")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t("provenResultsText")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Teachers */}
        <FeaturedTeachers />

        {/* Latest Notices */}
        <LatestNotice />

        {/* Contact Section */}
        <section className="py-16 bg-primary text-primary-foreground text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-4">{t("readyJoin")}</h2>
            <p className="text-xl mb-8 opacity-90">{t("contactText")}</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">{t("getInTouch")}</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
