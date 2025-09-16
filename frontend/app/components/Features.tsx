// components/Features.tsx
"use client";
import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: "AI-Powered Creation",
      description: "Generate unique artwork with our advanced AI algorithms trained on thousands of artistic styles.",
      icon: "🎨"
    },
    {
      title: "Style Transfer",
      description: "Apply the style of any artist or art movement to your own images with precision and control.",
      icon: "🔄"
    },
    {
      title: "High Resolution Output",
      description: "Create print-ready artwork at resolutions up to 4K without losing quality or detail.",
      icon: "📺"
    },
    {
      title: "Collaborative Tools",
      description: "Work together with other artists in real-time on the same canvas, regardless of location.",
      icon: "👥"
    },
    {
      title: "Custom Training",
      description: "Train our AI on your own artwork to create a personalized digital assistant that knows your style.",
      icon: "🧠"
    },
    {
      title: "Commercial License",
      description: "All artwork you create is yours to use commercially with full rights and ownership.",
      icon: "📝"
    }
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Powerful Features for Creators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;