import Navbar from "@/components/Navbar";
import Footer from "@/components/FooterClean";
import { Target, Eye, Heart, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import communityImage from "@/assets/student.jpeg";
import ScrollToTop from "@/components/ScrollToTop";

const About = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Excellence",
      description: "We strive for the highest standards in education and academic achievement.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Integrity",
      description: "We operate with transparency, honesty, and ethical principles in all we do.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description: "We believe in the power of community engagement and collective progress.",
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Empowerment",
      description: "We empower students to reach their full potential and inspire others.",
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">About Us</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 animate-fade-in">
              Building a future where every student has the opportunity to excel and contribute to their community
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="shadow-medium hover:shadow-strong transition-smooth">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To promote academic excellence and empower students in the Teberebie Electoral Area through 
                    recognition, awards, and educational support programs. We aim to create a culture of learning 
                    that inspires students to achieve their highest potential and become leaders in their communities.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-medium hover:shadow-strong transition-smooth">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-6">
                    <Eye className="h-8 w-8 text-secondary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A future where every student in the Teberebie Electoral Area has access to quality education 
                    and the support they need to excel academically. We envision a community where educational 
                    achievement is celebrated, and students are equipped with the skills and knowledge to build 
                    better lives and contribute meaningfully to society.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Story Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="order-2 md:order-1 animate-fade-in">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded by community leaders and educators who witnessed the untapped potential of 
                    local students, our foundation was born from a commitment to educational equity and excellence.
                  </p>
                  <p>
                    We recognized that many bright students lacked the recognition and support needed to 
                    continue excelling in their studies. Through the Academic Excellence Award Scheme, 
                    we provide motivation, resources, and a platform for students to showcase their talents 
                    in English, Mathematics, and Science.
                  </p>
                  <p>
                    Today, we continue to grow our impact by partnering with schools, engaging the community, 
                    and working tirelessly to ensure that every deserving student receives the recognition and 
                    support they need to succeed.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2 animate-fade-in">
                <img
                  src={communityImage}
                  alt="Community Education"
                  className="rounded-2xl shadow-strong w-full h-auto"
                />
              </div>
            </div>

            {/* Values */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do and shape our approach to supporting students
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="text-center shadow-medium hover:shadow-strong transition-smooth hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
