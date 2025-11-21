import Navbar from "@/components/Navbar";
import Footer from "@/components/FooterClean";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-students.jpg";
import communityImage from "@/assets/student.jpeg";
import { useQuery } from "@tanstack/react-query";
import { getNews } from "@/lib/api";
import { useIsOverflowing } from "@/hooks/useIsOverflowing";
import { useRef } from "react";
import ScrollToTop from "@/components/ScrollToTop";


const News = () => {
  const newsArticles = [
    {
      id: 1,
      title: "2024 Academic Excellence Awards Ceremony Announced",
      excerpt:
        "We are excited to announce the date for our annual Academic Excellence Awards Ceremony. Join us as we celebrate outstanding students from across the Teberebie Electoral Area.",
      date: "November 15, 2025",
      category: "Events",
      image: heroImage,
      featured: true,
    },
    {
      id: 2,
      title: "New Partnership with Local Schools Established",
      excerpt:
        "The Adomako EduSupport Foundation has partnered with five additional JHS schools to expand the reach of our Academic Excellence Award Scheme.",
      date: "November 10, 2025",
      category: "Partnerships",
      image: communityImage,
      featured: false,
    },
    {
      id: 3,
      title: "Scholarship Program Launch for Top Performers",
      excerpt:
        "Introducing a new scholarship initiative to support award winners in their continued education journey. Learn more about eligibility and how to apply.",
      date: "November 5, 2025",
      category: "Programs",
      image: heroImage,
      featured: false,
    },
    {
      id: 4,
      title: "Community Engagement Workshop Success",
      excerpt:
        "Over 200 parents, teachers, and community members attended our recent workshop on supporting academic excellence in the home and classroom.",
      date: "October 28, 2025",
      category: "Community",
      image: communityImage,
      featured: false,
    },
    {
      id: 5,
      title: "Student Spotlight: Meet Our Top Achievers",
      excerpt:
        "Get to know the remarkable students who received awards in the last ceremony and learn about their academic journeys and future aspirations.",
      date: "October 20, 2025",
      category: "Stories",
      image: heroImage,
      featured: false,
    },
    {
      id: 6,
      title: "Call for Volunteers: Join Our Team",
      excerpt:
        "We are looking for dedicated volunteers to help with our upcoming programs and events. Discover how you can make a difference in students' lives.",
      date: "October 15, 2025",
      category: "Opportunities",
      image: communityImage,
      featured: false,
    },
  ];

  const { data: fetchedNews } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
    staleTime: 1000 * 60 * 5,
  });

  const newsArticlesData =
    Array.isArray(fetchedNews) && fetchedNews.length ? fetchedNews : newsArticles;

  const featuredArticle =
    newsArticlesData.find((article) => article.featured) || null;

  // ➤ FIXED: Create regular articles list
  const regularArticles = newsArticlesData.filter(
    (article) => !article.featured
  );

  const getCategoryColor = (category) => {
    const colors = {
      Events: "bg-primary text-primary-foreground",
      Partnerships: "bg-secondary text-secondary-foreground",
      Programs: "bg-primary-light text-primary-foreground",
      Community: "bg-secondary-light text-secondary-foreground",
      Stories: "bg-accent text-accent-foreground",
      Opportunities: "bg-muted text-muted-foreground",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  return (

    
    <div className="min-h-screen flex flex-col">
      <Navbar />
<ScrollToTop />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              News & Updates
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 animate-fade-in">
              Stay informed about our latest programs, events, and success
              stories
            </p>
          </div>
        </section>

        {/* News Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {/* Featured Article */}
            {featuredArticle && (
              <Card className="mb-12 shadow-strong overflow-hidden animate-fade-in">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <Badge
                      className={`absolute top-4 left-4 ${getCategoryColor(
                        featuredArticle.category
                      )}`}
                    >
                      Featured
                    </Badge>
                  </div>

                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{featuredArticle.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Tag className="h-4 w-4" />
                        <span>{featuredArticle.category}</span>
                      </div>
                    </div>

                    <h2 className="text-3xl font-bold mb-4">
                      {featuredArticle.title}
                    </h2>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>

                    
                  </CardContent>
                </div>
              </Card>
            )}

            {/* Regular Articles */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article, index) => {
                const textRef = useRef(null);
                const isOverflowing = useIsOverflowing(textRef);

                return (
                  <Card
                    key={article.id}
                    className="shadow-medium hover:shadow-strong transition-smooth overflow-hidden group animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge
                        className={`absolute top-4 left-4 ${getCategoryColor(
                          article.category
                        )}`}
                      >
                        {article.category}
                      </Badge>
                    </div>

                    <CardHeader>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>{article.date}</span>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-smooth">
                        {article.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p
                        ref={textRef}
                        className="text-muted-foreground mb-4 line-clamp-3"
                      >
                        {article.excerpt}
                      </p>

                      {isOverflowing && (
                        <Button variant="link" className="p-0 h-auto text-primary">
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Newsletter CTA */}
            <div className="mt-16 text-center bg-gradient-primary text-primary-foreground rounded-2xl p-12">
              <h2 className="text-3xl font-bold mb-4">
                Never Miss an Update
              </h2>
              <p className="mb-8 max-w-2xl mx-auto opacity-90">
                Subscribe to our newsletter to receive the latest news, event
                announcements, and success stories directly in your inbox.
              </p>

              <Button asChild size="lg" variant="secondary">
                <a href="#footer">Subscribe to Newsletter</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default News;
