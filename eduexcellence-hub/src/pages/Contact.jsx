import Navbar from "@/components/Navbar";
import Footer from "@/components/FooterClean";
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { submitContact } from "@/lib/api";
import ScrollToTop from "@/components/ScrollToTop";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload) => submitContact(payload),
    onSuccess: (data, variables, context) => {
      toast.success("Message sent successfully!", {
        description: `Thank you ${variables.name}, we’ll get back to you at ${variables.email}.`,
      });
    },
    onError: (error) => {
      toast.error("Failed to send message", {
        description: error.message || "Network error. Please try again.",
      });
    },
    onSettled: () => setIsSubmitting(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    mutation.mutate(data);
    form.reset();
  };



  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      content: "Teberebie Electoral Area, Ghana",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      content: "+233 XX XXX XXXX",
      action: "Call Us",
      href: "tel:+233XXXXXXXXX",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "info@adomakoedusupport.org",
      action: "Send Email",
      href: "mailto:info@adomakoedusupport.org",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "WhatsApp",
      content: "Message us directly",
      action: "Chat on WhatsApp",
      href: "https://wa.me/233XXXXXXXXX",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
       <ScrollToTop />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Get In Touch</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 animate-fade-in">
              Have questions or want to support our mission? We'd love to hear from you
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Contact Form */}
              <Card className="shadow-medium">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        required
                        minLength={2}
                        maxLength={100}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        required
                        maxLength={255}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+233 XX XXX XXXX"
                        maxLength={20}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="What is your message about?"
                        required
                        minLength={3}
                        maxLength={150}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        required
                        minLength={10}
                        maxLength={1000}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gradient-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Reach out to us through any of the following channels. We're here to answer 
                    your questions and support your involvement in our mission to promote academic excellence.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="shadow-soft hover:shadow-medium transition-smooth">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                            {info.icon}
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-semibold mb-1">{info.title}</h3>
                            <p className="text-muted-foreground text-sm mb-2">{info.content}</p>
                            {info.action && info.href && (
                              <Button
                                asChild
                                variant="link"
                                className="p-0 h-auto text-primary"
                              >
                                <a href={info.href} target="_blank" rel="noopener noreferrer">
                                  {info.action}
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Donation Section */}
                <Card className="shadow-medium bg-gradient-primary text-primary-foreground">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Support Our Mission</h3>
                    <p className="mb-6 opacity-90">
                      Your contributions help us continue recognizing and supporting academic excellence 
                      in the Teberebie Electoral Area. Contact us to learn about donation options.
                    </p>
                    <div className="space-y-3">
                      <p className="text-sm">
                        <strong>Bank Details:</strong> Available upon request
                      </p>
                      <p className="text-sm">
                        <strong>Mobile Money:</strong> 0538724430(Adomako EduSupport)
                      </p>
                     
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
