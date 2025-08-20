"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "@/context/LocaleContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale } = useLocale();

  const navItems = [
    { href: "/", label: { en: "Home", bn: "হোম" } },
    { href: "/teachers", label: { en: "Teachers", bn: "শিক্ষক" } },
    { href: "/notices", label: { en: "Notices", bn: "নোটিশ" } },
    { href: "/exams", label: { en: "Exams", bn: "পরীক্ষা" } },
    { href: "/contact", label: { en: "Contact", bn: "যোগাযোগ" } },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              Edu Sphere
            </Link>
          </div>

          {/* Desktop Nav */}

          <div className="ml-10 flex items-baseline space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.label[locale]}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Globe className="size-4 mr-2" />
                  {locale.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLocale("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocale("bn")}>
                  বাংলা
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button>
              <Link href="/auth/login">Login</Link>
            </Button>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label[locale]}
                </Link>
              ))}

              <div className="flex items-center space-x-2 px-3 py-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Globe className="size-4 mr-2" />
                      {locale.toUpperCase()}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setLocale("en")}>
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLocale("bn")}>
                      বাংলা
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button asChild size="sm">
                  <Link href="/admin/login">Admin Login</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
