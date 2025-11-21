import Navbar from "@/components/Navbar";
import Footer from "@/components/FooterClean";
import ContactActions from "@/components/ContactActions";
import { useState } from "react";
import { Award, Target, TrendingUp, ArrowRight, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-students.jpg";
import awardIcon from "@/assets/award-icon.jpg";
import { useQuery } from "@tanstack/react-query";
import { getNews, getPrograms } from "@/lib/api";
import ScrollToTop from "@/components/ScrollToTop";


const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const objectives = [
    {
      icon: <Target className="h-10 w-10" />,
      title: "Motivate Students",
      description: "Inspire students to pursue academic excellence through recognition and awards",
    },
    {
      icon: <TrendingUp className="h-10 w-10" />,
      title: "Foster Competition",
      description: "Encourage healthy academic competition among schools in the Teberebie Electoral Area",
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: "Celebrate Excellence",
      description: "Recognize outstanding performance in English, Mathematics, and Science",
    },
  ];

  const { data: newsData } = useQuery({ queryKey: ["news"], queryFn: getNews, staleTime: 1000 * 60 * 5 });
  const { data: programsData } = useQuery({ queryKey: ["programs"], queryFn: getPrograms, staleTime: 1000 * 60 * 5 });

  const newsHighlights = Array.isArray(newsData) && newsData.length ? newsData.slice(0, 3) : [
    {
      title: "2024 Awards Ceremony Announced",
      date: "November 15, 2025",
      excerpt: "Join us as we celebrate our top-performing students from across the region.",
    },
    {
      title: "New School Partnerships",
      date: "November 10, 2025",
      excerpt: "Five additional JHS schools join the Academic Excellence Award Scheme.",
    },
    {
      title: "Scholarship Program Launch",
      date: "November 5, 2025",
      excerpt: "New scholarships available for award-winning students to continue their education.",
    },
  ];

  const stats = [
    { number: "15+", label: "Partner Schools" },
    { number: "500+", label: "Students Awarded" },
    { number: "3", label: "Core Subjects" },
    { number: "5+", label: "Years of Impact" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[600px] md:h-[700px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Students in classroom"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl text-primary-foreground animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Promoting Academic Excellence
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Empowering students in the Teberebie Electoral Area through recognition, 
                awards, and educational support programs
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="gradient-primary text-lg">
                  <Link to="/programs">Explore Our Programs</Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="text-lg">
                  <Link to="/contact">Get Involved</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-secondary text-secondary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm md:text-base opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Building a Brighter Future Through Education
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  The Adomako EduSupport Foundation is dedicated to recognizing and celebrating 
                  academic excellence in the Teberebie Electoral Area. Through our flagship Academic 
                  Excellence Award Scheme, we honor outstanding students who excel in core subjects 
                  and inspire others to reach their full potential.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Our mission is to create a culture of learning where every student is motivated 
                  to achieve their best, and every achievement is celebrated by the entire community.
                </p>
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">
                    Learn More About Us <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
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
          </div>
        </section>

        {/* Objectives Section */}
        <section className="py-16 bg-accent">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Program Objectives</h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                The Academic Excellence Award Scheme is designed to promote educational achievement 
                and create lasting positive impact in our community
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {objectives.map((objective, index) => (
                <Card
                  key={index}
                  className="shadow-medium hover:shadow-strong transition-smooth hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 text-primary-foreground">
                      {objective.icon}
                    </div>
                    <CardTitle className="text-2xl">{objective.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{objective.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* News Highlights */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest News & Updates</h2>
                <p className="text-muted-foreground text-lg">
                  Stay informed about our programs, events, and success stories
                </p>
              </div>
              <Button asChild variant="outline" className="hidden md:flex">
                <Link to="/news">
                  View All News <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {newsHighlights.map((news, index) => (
                <Card
                  key={index}
                  className="shadow-medium hover:shadow-strong transition-smooth hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="text-sm text-primary mb-2">{news.date}</div>
                    <CardTitle className="text-xl">{news.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{news.excerpt}</p>
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8 md:hidden">
              <Button asChild variant="outline">
                <Link to="/news">
                  View All News <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Us in Making a Difference</h2>
              <p className="text-xl mb-12 opacity-90">
                Whether you want to donate, volunteer, or partner with us, there are many ways 
                to support academic excellence in our community
              </p>
              <div className="grid sm:grid-cols-3 gap-6">
                <Card className="bg-background/10 border-primary-foreground/20 hover:bg-background/20 transition-smooth">
                  <CardHeader>
                    <Heart className="h-12 w-12 mx-auto mb-4" />
                    <CardTitle className="text-primary-foreground">Donate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary-foreground/80 mb-4">
                      Support our programs with a financial contribution
                    </p>
                    <Button onClick={() => { setModalMode('donate'); setModalOpen(true); }} variant="secondary" className="w-full">Donate Now</Button>
                  </CardContent>
                </Card>
                <Card className="bg-background/10 border-primary-foreground/20 hover:bg-background/20 transition-smooth">
                  <CardHeader>
                    <Users className="h-12 w-12 mx-auto mb-4" />
                    <CardTitle className="text-primary-foreground">Volunteer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary-foreground/80 mb-4">
                      Share your time and expertise with students
                    </p>
                    <Button onClick={() => { setModalMode('volunteer'); setModalOpen(true); }} variant="secondary" className="w-full">Get Involved</Button>
                  </CardContent>
                </Card>
                <Card className="bg-background/10 border-primary-foreground/20 hover:bg-background/20 transition-smooth">
                  <CardHeader>
                    <Award className="h-12 w-12 mx-auto mb-4" />
                    <CardTitle className="text-primary-foreground">Partner</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary-foreground/80 mb-4">
                      Collaborate with us to expand our reach
                    </p>
                    <Button onClick={() => { setModalMode('partner'); setModalOpen(true); }} variant="secondary" className="w-full">Partner With Us</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ContactActions hideTriggerButtons open={modalOpen} mode={modalMode} onClose={() => setModalOpen(false)} />
      <Footer />
    </div>
  );
};

export default Index;
