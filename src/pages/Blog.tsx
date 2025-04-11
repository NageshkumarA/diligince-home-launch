
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Blog = () => {
  // Sample blog posts data
  const posts = [
    {
      id: 1,
      title: "The Future of Industrial AI in India",
      excerpt: "Exploring how artificial intelligence is transforming industrial operations across India.",
      date: "April 5, 2025",
      author: "Rahul Sharma",
      category: "Technology",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070"
    },
    {
      id: 2,
      title: "5 Ways to Optimize Your Industrial Plant Operations",
      excerpt: "Practical strategies for improving efficiency and reducing costs in industrial plants.",
      date: "March 28, 2025",
      author: "Priya Patel",
      category: "Best Practices",
      imageUrl: "https://images.unsplash.com/photo-1581091877150-ecdf3f168575?q=80&w=2070"
    },
    {
      id: 3,
      title: "The Importance of Vendor Selection in Manufacturing",
      excerpt: "How choosing the right vendors can impact your manufacturing quality and bottom line.",
      date: "March 15, 2025",
      author: "Vikram Singh",
      category: "Strategy",
      imageUrl: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=2065"
    },
    {
      id: 4,
      title: "Industry 4.0: The Indian Perspective",
      excerpt: "An analysis of how Industry 4.0 is being implemented across various sectors in India.",
      date: "March 7, 2025",
      author: "Neha Gupta",
      category: "Industry Trends",
      imageUrl: "https://images.unsplash.com/photo-1581094358461-f4bb5e556130?q=80&w=2070"
    },
    {
      id: 5,
      title: "Sustainable Practices in Heavy Industry",
      excerpt: "How Indian industrial companies are adopting green practices while maintaining productivity.",
      date: "February 22, 2025",
      author: "Arjun Reddy",
      category: "Sustainability",
      imageUrl: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?q=80&w=2048"
    },
    {
      id: 6,
      title: "Leveraging Technology for Industrial Logistics",
      excerpt: "New technological solutions revolutionizing logistics in the industrial sector.",
      date: "February 15, 2025",
      author: "Ananya Desai",
      category: "Logistics",
      imageUrl: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Blog</h1>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Insights, trends, and knowledge from the industrial ecosystem. 
                Stay updated with the latest developments in the industry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-blue-600 font-medium">{post.category}</span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription className="mt-2">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">By {post.author}</span>
                    <Button variant="ghost" size="sm">Read More</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">Load More Articles</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
