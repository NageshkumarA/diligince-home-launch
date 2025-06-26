
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BlogArticle = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900">
                  Blog Article {id}
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Published on April 5, 2025
                </p>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <p>
                  This is a detailed blog article about industrial processes and AI implementation.
                  The content would be dynamically loaded based on the article ID: {id}
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                  nostrud exercitation ullamco laboris.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogArticle;
