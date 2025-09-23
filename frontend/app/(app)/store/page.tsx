// components/Store.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Footer from '@/app/components/Footer';
import ArtisanChat from '@/app/components/ArtisanChat';
import { supabase } from '@/app/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

// Product card component
interface artisanCardProps {
  artisanId: string;
  artisanName: string;
  artisanDescription: string;
  artisanImage: string;
  artisanCategory: string;
  artisanRating: number;
  artisanReviews?: string
}


const ArtisanCard: React.FC<artisanCardProps> = ({ artisanId, artisanName, artisanDescription, artisanImage, artisanCategory, artisanRating, artisanReviews }) => {



  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      // User is signed in
      console.log("User is signed in:", user);
    } else {
      // No user is signed in
      console.log("No user is signed in");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden relative">
        <img
          src={artisanImage}
          alt={artisanName}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
            {artisanCategory}
          </span>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm text-gray-600">{artisanRating.toFixed(1)}</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{artisanName}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{artisanDescription}</p>
        <div className="flex justify-between items-center">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
            Add to Cart
          </button>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
            View Details
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Map component
interface MapDisplayProps {
  latitude: number | null;
  longitude: number | null;
  locationName: string;
  onClose: () => void;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ latitude, longitude, locationName, onClose }) => {
  if (!latitude || !longitude) return null;

  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg overflow-hidden w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Your Location: {locationName}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="h-96">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={mapUrl}
            title="Your location"
          >
          </iframe>
        </div>
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Store Navbar component
interface StoreNavbarProps {
  userLocation: string | null;
  isLocating: boolean;
  onLocationRequest: () => void;
  onShowMap: () => void;
  user: User | null; // 👈 Add user here
}

const StoreNavbar: React.FC<StoreNavbarProps> = ({ userLocation, isLocating, onLocationRequest, onShowMap, user }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  return (
    <div className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for AI tools, styles, or categories..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters and Auth Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Location Display/Button */}
            <div className="flex items-center">
              {userLocation ? (
                <div className="flex items-center">
                  <div className="flex items-center text-sm text-green-600 font-medium mr-2">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {userLocation}
                  </div>
                  <button
                    onClick={onShowMap}
                    className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                  >
                    Show on Map
                  </button>
                </div>
              ) : (
                <button
                  onClick={onLocationRequest}
                  disabled={isLocating}
                  className="flex items-center text-sm text-gray-600 hover:text-indigo-600 font-medium disabled:opacity-50"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {isLocating ? 'Detecting...' : 'Use My Location'}
                </button>
              )}
            </div>

            <select
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="free">Free</option>
              <option value="under-20">Under $20</option>
              <option value="20-50">$20 - $50</option>
              <option value="over-50">Over $50</option>
            </select>

            <select
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <button className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              More Filters
            </button>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-2 ml-2">
                <a href="/profile" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium text-sm">
                  Profile
                </a>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-2">
                <a href="/verify-yourself" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium text-sm">
                  verify-yourself
                </a>
              </div>
            )} 

          </div>
        </div>

        {/* Category Chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {['All', 'Portrait', 'Landscape', 'Abstract', 'Watercolor', 'Comic', 'Oil Painting', 'Sketch', 'Vintage'].map((category) => (
            <button
              key={category}
              className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${category === 'All'
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Store page component
const Store: React.FC = () => {
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [userCoordinates, setUserCoordinates] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null
  });
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Function to get user's location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          setUserCoordinates({ latitude, longitude });

          // Reverse geocoding to get location name
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );

          if (response.ok) {
            const data = await response.json();
            const city = data.city || data.locality || "Your location";
            const country = data.countryName || "";
            setUserLocation(`${city}${country ? `, ${country}` : ''}`);
          } else {
            setUserLocation("Your location");
          }
        } catch (error) {
          console.error("Error getting location:", error);
          setUserLocation("Your location");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location access denied. Please enable location services.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information unavailable.");
            break;
          case error.TIMEOUT:
            setLocationError("Location request timed out.");
            break;
          default:
            setLocationError("An unknown error occurred.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleShowMap = () => {
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
  };

  // Sample product data with local items
  const artisans = [
    {
      artisanId: 1,
      artisanName: "AI Portrait Generator",
      artisanDescription: "Create stunning AI-generated portraits in various artistic styles with just a few clicks.",
      artisanImage: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      artisanCategory: "Portrait",
      artisanRating: 4.8,
      artisanReviews: "Noce"
    },
    {
      artisanId: 2,
      artisanName: "Landscape Art Pack",
      artisanDescription: "Transform your landscape photos into masterpieces with our specialized AI art tools.",
      artisanImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      artisanCategory: "Landscape",
      artisanRating: 4.6,
      artisanReviews: "Noce"
    },
    {
      artisanId: 3,
      artisanName: "Abstract Style Bundle",
      artisanDescription: "Generate unique abstract art with patterns and colors inspired by great abstract artists.",
      artisanImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      artisanCategory: "Abstract",
      artisanRating: 4.9,
      artisanReviews: "Noce",
    },
    {
      artisanId: 4,
      artisanName: "Digital Watercolor Kit",
      artisanDescription: "Create beautiful watercolor effects from your photos with our specialized AI algorithms.",
      artisanImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      artisanCategory: "Watercolor",
      artisanRating: 4.7,
      artisanReviews: "Noce",
    },
    {
      artisanId: 5,
      artisanName: "Comic Book Art Converter",
      artisanDescription: "Turn your photos into comic book style artwork with dynamic lines and bold colors.",
      artisanImage: "https://images.unsplash.com/photo-1628968434441-d9c8e092a013?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      artisanCategory: "Comic",
      artisanRating: 4.5,
      artisanReviews: "Noce",
    },
    {
      artisanId: 6,
      artisanName: "Oil Painting Style Pack",
      artisanDescription: "Recreate the look of classic oil paintings with texture and brush stroke simulation.",
      artisanImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      artisanCategory: "Oil Painting",
      artisanRating: 4.8,
      artisanReviews: "Noce",
    },
    {
      artisanId: 7,
      artisanName: "Sketch & Drawing Tools",
      artisanDescription: "Convert images to pencil sketches, charcoal drawings, and ink illustrations.",
      artisanImage: "https://images.unsplash.com/photo-1618331835717-801e976710b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      artisanCategory: "Sketch",
      artisanRating: 4.4,
      artisanReviews: "Noce",
    },
    {
      artisanId: 8,
      artisanName: "Vintage Photo Effects",
      artisanDescription: "Apply vintage and retro effects to your photos with authentic film simulation.",
      artisanImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      artisanCategory: "Vintage",
      artisanRating: 4.3,
      artisanReviews: "Noce",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ArtisanAI Store</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover our collection of AI-powered art tools and style packs to enhance your creativity.
          </p>
          {userLocation && (
            <div className="mt-6 inline-flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-black">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Showing local recommendations for <span className="font-semibold ml-1">{userLocation}</span>
            </div>
          )}
        </div>
      </section>

      {/* Store Navigation with Search and Filters */}
      <StoreNavbar
        userLocation={userLocation}
        isLocating={isLocating}
        onLocationRequest={getUserLocation}
        onShowMap={handleShowMap}
        user={user}
      />

      {/* Location Error Alert */}
      {locationError && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{locationError}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI Art Tools</h2>
              <p className="text-gray-600">Showing {artisans.length} products</p>
              {userLocation && (
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Local products highlighted in green
                </p>
              )}
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 mr-2 text-sm">View:</span>
              <button className="p-2 text-gray-400 hover:text-indigo-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
              <button className="p-2 text-indigo-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {artisans.map(artisan => (
              <ArtisanCard
                key={artisan.artisanId}
                artisanId={artisan.artisanId.toString()}
                artisanName={artisan.artisanName}
                artisanDescription={artisan.artisanDescription}
                artisanImage={artisan.artisanImage}
                artisanCategory={artisan.artisanCategory}
                artisanRating={artisan.artisanRating}
                artisanReviews={artisan.artisanReviews}
              />
            ))}
          </div>

          {/* {user && <ArtisanChat />} */}

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">
                Previous
              </button>
              <button className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">1</button>
              <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">2</button>
              <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">3</button>
              <span className="px-2 text-gray-500">...</span>
              <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">8</button>
              <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">
                Next
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* Map Modal */}
      {showMap && userLocation && (
        <MapDisplay
          latitude={userCoordinates.latitude}
          longitude={userCoordinates.longitude}
          locationName={userLocation}
          onClose={handleCloseMap}
        />
      )}

      <Footer />
    </div>
  );
};

export default Store;