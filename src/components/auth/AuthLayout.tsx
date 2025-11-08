
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
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Navbar />
      
      <div className="flex-1 flex flex-col md:flex-row mt-16 overflow-hidden">
        {leftContent && (
          <div className="bg-primary text-white p-8 flex flex-col items-center justify-between md:w-2/5 md:fixed md:left-0 md:top-16 md:bottom-0 md:overflow-y-auto">
            <div className="flex-1 flex flex-col justify-center items-center text-center max-w-md mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{leftContent.title}</h2>
              <p className="text-base md:text-lg opacity-90">
                {leftContent.description}
              </p>
              
              {leftContent.imageSrc && (
                <div className="mt-12 w-full max-w-sm">
                  <img 
                    src={leftContent.imageSrc} 
                    alt={leftContent.imageAlt || "Authentication"} 
                    className="w-full h-auto object-contain" 
                  />
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className={`bg-gray-50 flex-1 overflow-y-auto ${leftContent ? 'md:ml-[40%]' : ''}`}>
          <div className="min-h-full flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-md py-8">
              <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">{title}</h1>
              <p className="text-sm text-gray-600 text-center mb-8">{subtitle}</p>
              
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
