
import React from "react";
import { BaseVendorLayoutProps } from "@/types/vendor-sidebar";

export const BaseVendorLayout = ({ children, header: Header, sidebar: Sidebar }: BaseVendorLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex-1 pt-16">
        <div className="flex w-full min-h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 p-8 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
