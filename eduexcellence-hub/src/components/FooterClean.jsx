import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { subscribeNewsletter } from "@/lib/api";

const FooterClean = () => {
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");

    try {
      await subscribeNewsletter({ email });
      toast.success("Thank you for subscribing!", {
        description: `We'll send updates to ${email}`,
      });
      form.reset();
    } catch (err) {
      toast.error(err?.message || "Subscription failed. Please try again.");
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">AE</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Adomako EduSupport</h3>
                <p className="text-sm text-secondary-foreground/80">Foundation</p>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground/80">
              Promoting Academic Excellence in the Teberebie Electoral Area through education, awards, and community empowerment.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About Us", "Programs", "News", "Contact"].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`}
                    className="text-sm text-secondary-foreground/80 hover:text-primary transition-smooth"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-secondary-foreground/80">Teberebie Electoral Area, Ghana</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-secondary-foreground/80">+233 XX XXX XXXX</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-secondary-foreground/80">info@adomakoedusupport.org</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-sm text-secondary-foreground/80 mb-4">Subscribe to receive news and updates about our programs.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input type="email" name="email" placeholder="Your email" required className="bg-background/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50" />
              <Button type="submit" className="w-full gradient-primary">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-secondary-foreground/80">© {new Date().getFullYear()} Adomako EduSupport Foundation. All rights reserved.</p>
            <div className="flex space-x-4">
              {[{ icon: Facebook, label: "Facebook", href: "#" }, { icon: Twitter, label: "Twitter", href: "#" }, { icon: Linkedin, label: "LinkedIn", href: "#" }, { icon: Instagram, label: "Instagram", href: "#" }].map((social, index) => (
                <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth">
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterClean;
