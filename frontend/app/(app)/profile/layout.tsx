import Sidebar from '@/app/components/Sidebar'
import React from 'react';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-purple-50">
      
      {/* Sidebar fixed for all profile pages */}
      {/* <div className="fixed left-0 top-0 h-screen w-64 z-30">
        <Sidebar />
      </div> */}
      <div className="fixed left-0 h-screen w-64 z-30">
        <Sidebar />
      </div>

      {/* Main content area */}
      <main className="ml-64 flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
