import Navbar from "@/components/Navbar";
import Footer from "@/components/FooterClean";
import { Award, BookOpen, TrendingUp, Users, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import awardIcon from "@/assets/award-icon.jpg";
import { useQuery } from "@tanstack/react-query";
import { getPrograms } from "@/lib/api";
import ScrollToTop from "@/components/ScrollToTop";

const Programs = () => {
  const subjects = [
    {
      name: "English Language",
      icon: <BookOpen className="h-6 w-6" />,
      description: "Excellence in comprehension, writing, grammar, and communication skills",
    },
    {
      name: "Mathematics",
      icon: <TrendingUp className="h-6 w-6" />,
      description: "Outstanding performance in numerical reasoning, problem-solving, and mathematical concepts",
    },
    {
      name: "Science",
      icon: <Award className="h-6 w-6" />,
      description: "Superior knowledge in scientific principles, experimentation, and analytical thinking",
    },
  ];

  const criteria = [
    "Consistent high academic performance throughout the school year",
    "Demonstrated excellence in core subject areas",
    "Active participation in classroom activities and learning",
    "Good conduct and positive attitude towards learning",
    "Nomination by school administrators and teachers",
    "Verification of academic records and achievements",
  ];

  const objectives = [
    {
      title: "Motivate Students",
      description: "Inspire students to strive for academic excellence through recognition and rewards",
      icon: <Users className="h-8 w-8" />,
    },
    {
      title: "Foster Competition",
      description: "Create healthy academic competition among students across participating schools",
      icon: <TrendingUp className="h-8 w-8" />,
    },
    {
      title: "Celebrate Excellence",
      description: "Recognize and celebrate outstanding academic achievements in key subject areas",
      icon: <Award className="h-8 w-8" />,
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Academic Excellence Award Scheme</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 animate-fade-in">
              Recognizing and celebrating outstanding academic performance across JHS schools in the Teberebie Electoral Area
            </p>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Program Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The Academic Excellence Award Scheme is the flagship program of the Adomako EduSupport Foundation. 
                  Launched to promote academic achievement and inspire students across the Teberebie Electoral Area, 
                  this program recognizes exceptional students who demonstrate outstanding performance in key academic subjects.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Each year, we celebrate students who excel in English, Mathematics, and Science, providing them with 
                  awards, certificates, and public recognition for their hard work and dedication. This program not only 
                  honors individual achievement but also motivates entire schools to prioritize excellence.
                </p>
                <Button asChild size="lg" className="gradient-primary">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
              <div className="animate-fade-in">
                <img
                  src={awardIcon}
                  alt="Academic Excellence Award"
                  className="rounded-2xl shadow-strong w-full h-auto"
                />
              </div>
            </div>

            {/* Objectives */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Program Objectives</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {objectives.map((objective, index) => (
                  <Card
                    key={index}
                    className="shadow-medium hover:shadow-strong transition-smooth hover:-translate-y-1"
                  >
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 text-primary-foreground">
                        {objective.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-4">{objective.title}</h3>
                      <p className="text-muted-foreground">{objective.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Award Categories */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Award Categories</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Students are recognized for excellence in the following core subject areas
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {subjects.map((subject, index) => (
                  <Card
                    key={index}
                    className="shadow-medium hover:shadow-strong transition-smooth"
                  >
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                        {subject.icon}
                      </div>
                      <CardTitle>{subject.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{subject.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Selection Criteria */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Selection Criteria</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Students are evaluated based on the following criteria to ensure fair and merit-based selection
              </p>
              <Card className="shadow-medium max-w-3xl mx-auto">
                <CardContent className="p-8">
                  <ul className="space-y-4">
                    {criteria.map((criterion, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center bg-accent rounded-2xl p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Participate?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Schools and students interested in participating in the Academic Excellence Award Scheme 
                can reach out to learn more about eligibility requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary">
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/about">Learn More About Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Programs;
