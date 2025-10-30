"use client";

import React, { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import { redirect } from 'next/navigation';

interface GuideSection {
  title: string;
  content: string;
  steps: string[];
  icon: string;
}

interface TipCard {
  title: string;
  description: string;
  icon: string;
}

const ArtisanGuidePage = () => {
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  const guideSections: GuideSection[] = [
    {
      title: "Getting Started",
      content: "Learn the basics of artisan craftsmanship and essential tools for beginners.",
      steps: [
        "Choose your craft medium (wood, clay, metal, etc.)",
        "Gather essential tools and safety equipment",
        "Set up an ergonomic workspace",
        "Learn fundamental techniques and practices"
      ],
      icon: "🚀"
    },
    {
      title: "Material Selection",
      content: "Understanding and selecting the right materials for your artisan projects.",
      steps: [
        "Research material properties and characteristics",
        "Source sustainable and ethical materials",
        "Test material compatibility and durability",
        "Proper storage and handling techniques"
      ],
      icon: "🌿"
    },
    {
      title: "Technique Mastery",
      content: "Advanced techniques and methods to elevate your craftsmanship.",
      steps: [
        "Practice fundamental skills consistently",
        "Learn from master artisans and workshops",
        "Experiment with innovative methods",
        "Document your process and improvements"
      ],
      icon: "⚒️"
    },
    {
      title: "Business & Marketing",
      content: "Turning your craft into a sustainable and profitable business.",
      steps: [
        "Define your unique brand identity",
        "Price your work fairly and competitively",
        "Build an online presence and portfolio",
        "Network with galleries and other artisans"
      ],
      icon: "💼"
    }
  ];

  const tipCards: TipCard[] = [
    {
      title: "Quality Over Quantity",
      description: "Focus on creating fewer, higher-quality pieces rather than mass production. Each piece should tell a story.",
      icon: "⭐"
    },
    {
      title: "Continuous Learning",
      description: "Always be learning new techniques and improving your skills. Attend workshops and learn from others.",
      icon: "📚"
    },
    {
      title: "Community Engagement",
      description: "Connect with other artisans to share knowledge, inspiration, and support each other's growth.",
      icon: "👥"
    }
  ];

  const portalSections = [
    {
      title: "Resources",
      items: ["Material Suppliers", "Tool Libraries", "Workshop Spaces", "Online Courses", "Pattern Library"]
    },
    {
      title: "Community",
      items: ["Artisan Forums", "Local Guilds", "Mentorship Programs", "Collaboration Projects", "Events Calendar"]
    },
    {
      title: "Marketplace",
      items: ["Sell Your Work", "Commission Requests", "Exhibition Opportunities", "Wholesale Options", "Portfolio Showcase"]
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 h-screen w-64 z-30">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Artisan Craft Guide</h1>
          <p className="text-gray-600 mt-2">Master the art of traditional craftsmanship with our comprehensive guide</p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl">
          {/* Guide Sections */}
          <div className="space-y-6 mb-8">
            {guideSections.map((section, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-amber-100 text-amber-700 rounded-lg text-lg mr-4">
                      {section.icon}
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">
                      <span className="text-amber-600 mr-2">{index + 1}.</span>
                      {section.title}
                    </h2>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {section.content}
                  </p>
                  
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <h3 className="font-semibold text-amber-800 mb-3">Key Steps:</h3>
                    <ul className="space-y-2">
                      {section.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs mt-1 mr-3">
                            ✓
                          </span>
                          <span className="text-gray-700 text-sm">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tips & Best Practices Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Pro Tips for Success
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tipCards.map((tip, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="text-2xl mb-3">{tip.icon}</div>
                  <h3 className="text-lg font-bold text-amber-800 mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-amber-500 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Workshop Schedule</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mt-1">View upcoming workshops and events</p>
            </button>
            
            <button className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-amber-500 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Resource Library</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mt-1">Access tutorials and guides</p>
            </button>
            
            <button className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-amber-500 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Community Forum</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mt-1">Connect with other artisans</p>
            </button>
          </div>
        </div>

        {/* Portal Button */}
        <button
          onClick={() => redirect(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/auth/login`)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center space-x-2 z-40"
        >
          <span className="font-semibold">Artisan Portal</span>
          <span className="text-lg">🚪</span>
        </button>

        {/* Portal Modal */}
        {isPortalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white rounded-t-2xl p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-amber-900">Artisan Portal</h2>
                <button
                  onClick={() => setIsPortalOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-xl text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {portalSections.map((section, index) => (
                    <div key={index} className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                      <h3 className="text-lg font-bold text-amber-800 mb-3 flex items-center">
                        <span className="mr-2">
                          {section.title === 'Resources' ? '📚' : section.title === 'Community' ? '👥' : '🛒'}
                        </span>
                        {section.title}
                      </h3>
                      <ul className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center text-gray-700 hover:text-amber-700 transition-colors cursor-pointer text-sm">
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Quick Access</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-3 transition-all duration-300 hover:scale-105 text-sm">
                      🎓 Workshops
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-3 transition-all duration-300 hover:scale-105 text-sm">
                      🤝 Mentorship
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-3 transition-all duration-300 hover:scale-105 text-sm">
                      📊 Analytics
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-3 transition-all duration-300 hover:scale-105 text-sm">
                      🛠️ Tools
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white rounded-b-2xl p-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold flex-1 sm:flex-none text-sm">
                  Join Artisan Community
                </button>
                <button className="px-6 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors font-semibold flex-1 sm:flex-none text-sm">
                  Browse Resources
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtisanGuidePage;