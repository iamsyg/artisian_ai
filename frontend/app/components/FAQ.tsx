// components/FAQ.tsx
"use client";
import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How does ArtisanAI generate artwork?",
      answer: "ArtisanAI uses advanced machine learning models trained on diverse artistic styles. You provide a text prompt or base image, and our AI generates unique artwork based on your input while allowing you to control the style, composition, and details."
    },
    {
      question: "Do I own the artwork created with ArtisanAI?",
      answer: "Yes, absolutely. All artwork generated through ArtisanAI is yours to use personally and commercially. You retain full copyright and ownership of your creations."
    },
    {
      question: "What file formats does ArtisanAI support?",
      answer: "We support all major image formats including PNG, JPG, SVG, and TIFF. You can export your work in various resolutions up to 4K for both web and print use."
    },
    {
      question: "Can I use ArtisanAI without artistic experience?",
      answer: "Definitely! ArtisanAI is designed for both professional artists and beginners. Our intuitive interface and AI guidance make it easy for anyone to create beautiful artwork regardless of their experience level."
    },
    {
      question: "How often are new features added?",
      answer: "We release updates every two weeks with new features, improvements, and additional style options. Our team is constantly working to enhance ArtisanAI based on user feedback."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Find answers to common questions about ArtisanAI and how it can enhance your creative process.</p>
        
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">
              <button
                className="w-full py-5 text-left font-medium text-lg text-gray-900 flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                {item.question}
                <span className="text-indigo-600 text-xl">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-96 pb-5' : 'max-h-0'}`}>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;