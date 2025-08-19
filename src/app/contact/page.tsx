import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* header */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Contact Us
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Get in touch with us for admissions, inquiries, or any
                assistance you need.
              </p>
            </div>
          </div>
        </section>
        {/* contact information */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* contact details */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    Get in Touch
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    We&#39;re here to help! Reach out to us through any of the
                    following channels, and we&#39;ll get back to you as soon as
                    possible.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Main Office */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MapPin className="size-5 mr-2 text-primary" />
                        Main Office
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-muted-foreground">
                        123 Education Street
                        <br />
                        Dhanmondi, Dhaka - 1205
                        <br />
                        Bangladesh
                      </p>
                    </CardContent>
                  </Card>

                  {/* Phone Numbers */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Phone className="size-5 mr-2 text-primary" />
                        Phone Numbers
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <p className="font-medium">Main Office:</p>
                        <p className="text-muted-foreground">+880 2-9876543</p>
                      </div>
                      <div>
                        <p className="font-medium">Admissions:</p>
                        <p className="text-muted-foreground">
                          +880 1234-567890
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Academic Office:</p>
                        <p className="text-muted-foreground">
                          +880 1234-567891
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Email Addresses */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Mail className="size-5 mr-2 text-primary" />
                        Email Addresses
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <p className="font-medium">General Inquiries:</p>
                        <p className="text-muted-foreground">
                          info@eduinstitute.edu
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Admissions:</p>
                        <p className="text-muted-foreground">
                          admissions@eduinstitute.edu
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Academic Affairs:</p>
                        <p className="text-muted-foreground">
                          academic@eduinstitute.edu
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Office Hours */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="size-5 mr-2 text-primary" />
                        Office Hours
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <p className="font-medium">Monday - Thursday:</p>
                        <p className="text-muted-foreground">
                          8:00 AM - 5:00 PM
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Friday:</p>
                        <p className="text-muted-foreground">
                          8:00 AM - 4:00 PM
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Saturday:</p>
                        <p className="text-muted-foreground">
                          9:00 AM - 2:00 PM
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Sunday:</p>
                        <p className="text-muted-foreground">Closed</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* contact form */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="size-5 mr-2 text-primary" />
                      Send us a Message
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below and we&#39;ll get back to you
                      within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="What is this regarding?"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Please describe your inquiry in detail..."
                        className="min-h-[120px]"
                      />
                    </div>
                    <Button className="w-full">Send Message</Button>
                  </CardContent>
                </Card>

                {/* Complaint Cell */}
                <Card className="border-destructive/20 bg-destructive/5">
                  <CardHeader>
                    <CardTitle className="flex items-center text-destructive">
                      <AlertTriangle className="size-5 mr-2" />
                      Complaint Cell
                    </CardTitle>
                    <CardDescription>
                      For complaints and grievances, please contact our
                      dedicated complaint cell.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium">Complaint Officer:</p>
                      <p className="text-muted-foreground">Dr. Nasir Ahmed</p>
                    </div>
                    <div>
                      <p className="font-medium">Direct Phone:</p>
                      <p className="text-muted-foreground">+880 1234-567899</p>
                    </div>
                    <div>
                      <p className="font-medium">Email:</p>
                      <p className="text-muted-foreground">
                        complaints@eduinstitute.edu
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Office Hours:</p>
                      <p className="text-muted-foreground">
                        Monday - Friday: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                    <Button variant="destructive" size="sm" className="mt-4">
                      File a Complaint
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
