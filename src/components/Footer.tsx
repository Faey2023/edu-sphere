import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Edu Sphere
            </h3>
            <p className="text-muted-foreground mb-4">
              Committed to providing quality education and fostering academic
              excellence for students to achieve their full potential.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/teachers"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Our Teachers
                </Link>
              </li>
              <li>
                <Link
                  href="/notices"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Notices
                </Link>
              </li>
              <li>
                <Link
                  href="/exams"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Exam Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                <span>+880 1234-567890</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@edusphere.edu</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span>123 Education Street, Dhaka</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Edu Sphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
