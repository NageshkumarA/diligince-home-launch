
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  leftContent?: {
    title: string;
    description: string;
    imageSrc?: string;
    imageAlt?: string;
  };
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  leftContent
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex flex-col md:flex-row flex-grow mt-16">
        {leftContent && (
          <div className="bg-blue-600 text-white p-8 flex flex-col items-center justify-between md:w-2/5">
            <div className="pt-10 md:pt-20 text-center max-w-md mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{leftContent.title}</h2>
              <p className="text-base md:text-lg opacity-90">
                {leftContent.description}
              </p>
            </div>
            
            {leftContent.imageSrc && (
              <div className="mt-8 w-full max-w-md">
                <img 
                  src={leftContent.imageSrc} 
                  alt={leftContent.imageAlt || "Authentication"} 
                  className="w-full h-auto object-cover rounded-lg" 
                />
              </div>
            )}
          </div>
        )}
        
        <div className={`bg-gray-50 p-8 flex flex-col items-center ${leftContent ? 'md:w-3/5' : 'w-full'}`}>
          <div className="w-full max-w-md py-8">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">{title}</h1>
            <p className="text-sm text-gray-600 text-center mb-8">{subtitle}</p>
            
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};
