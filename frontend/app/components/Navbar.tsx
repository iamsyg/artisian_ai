// components/Navbar.tsx
"use client";
import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-indigo-600">ArtisanAI</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <Link href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</Link>
          <Link href="#testimonials" className="text-gray-600 hover:text-indigo-600 transition-colors">Testimonials</Link>
          <Link href="#faq" className="text-gray-600 hover:text-indigo-600 transition-colors">FAQ</Link>
        </div>
        <div>
          <Link href="/store" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
            Visit Our Store
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;