// components/Testimonials.tsx
"use client";
import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Digital Artist",
      content: "ArtisanAI has completely transformed my creative process. I can now experiment with styles I never thought I could master and produce work twice as fast.",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Creative Director",
      content: "Our design team uses ArtisanAI daily. It's like having an extra team member who never gets tired and always has fresh ideas. The style transfer feature is incredible.",
      avatar: "MC"
    },
    {
      name: "Elena Rodriguez",
      role: "Illustrator",
      content: "As a traditional artist transitioning to digital, ArtisanAI made the process so much easier. The AI understands artistic principles and helps me create professional work.",
      avatar: "ER"
    }
  ];

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">What Our Users Say</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Hear from artists and creators who are using ArtisanAI to enhance their creative workflow.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;