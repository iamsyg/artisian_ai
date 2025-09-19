// components/Hero.tsx
"use client";
import React from 'react';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Transform Your Creativity with <span className="text-indigo-600">ArtisanAI</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl">
          The next generation AI tool for artists, designers, and creators. Generate stunning artwork, enhance your designs, and bring your imagination to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/store" className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors">
            Visit Our Store
          </Link>
          <button className="border border-indigo-600 text-indigo-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-50 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;