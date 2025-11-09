// components/Store.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Footer from '@/app/components/Footer';
import { createClient } from '@/app/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

const supabase = createClient();

// Updated interface to match your database schema
interface Artisan {
  id: string;
  full_name: string;
  artisan_shop_name: string;
  artisan_email: string;
  artisan_profile_photo: string;
  artisan_cover_photo: string;
  artisan_shop_description: string;
  rating?: number;
  reviews_count?: number;
}

interface ArtisanCardProps {
  artisanId: string;
  artisanName: string;
  artisanDescription: string;
  artisanImage: string;
  artisanRating: number;
  artisanEmail: string;
}

const ArtisanCard: React.FC<ArtisanCardProps> = ({ 
  artisanId, 
  artisanName, 
  artisanDescription, 
  artisanImage, 
  artisanRating, 
  artisanEmail 
}) => {
  // Use Unsplash placeholder if no image is provided
  const getImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) {
      return `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80`;
    }
    
    // Check if it's a base64 image or URL
    if (imageUrl.startsWith('data:') || imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // If it's just a filename, return placeholder
    return `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80`;
  };

  const [imageError, setImageError] = useState(false);
  const imageUrl = getImageUrl(artisanImage);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden relative">
        <img
          src={imageError 
            ? `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80`
            : imageUrl
          }
          alt={artisanName}
          className="w-full h-full object-cover transition-transform hover:scale-105"
          onError={handleImageError}
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
            Artisan
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
            Contact Artisan
          </button>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
            View Shop
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

// Simplified Store Navbar component
interface StoreNavbarProps {
  userLocation: string | null;
  isLocating: boolean;
  onLocationRequest: () => void;
  onShowMap: () => void;
  user: User | null;
}

const StoreNavbar: React.FC<StoreNavbarProps> = ({ userLocation, isLocating, onLocationRequest, onShowMap, user }) => {
  const [searchQuery, setSearchQuery] = useState('');

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
              placeholder="Search for artisans or services..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Location and Auth Buttons */}
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

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-2 ml-2">
                <a href="/profile/personal-details" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium text-sm">
                  Profile
                </a>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-2">
                <a href="/verify-yourself" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium text-sm">
                  Verify Yourself
                </a>
              </div>
            )} 
          </div>
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
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data
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

  // Fetch artisans data from API
  const fetchArtisans = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/all-artisan', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch artisans: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.artisans && Array.isArray(data.artisans)) {
        setArtisans(data.artisans);
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (err) {
      console.error('Error fetching artisans:', err);
      setError(err instanceof Error ? err.message : 'Failed to load artisans');
    } finally {
      setLoading(false);
    }
  };

  // Fetch artisans on component mount
  useEffect(() => {
    fetchArtisans();
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

  // Transform artisans data for the card component
  const transformedArtisans = artisans.map(artisan => ({
    artisanId: artisan.id,
    artisanName: artisan.artisan_shop_name || artisan.full_name,
    artisanDescription: artisan.artisan_shop_description || 'No description available',
    artisanImage: artisan.artisan_profile_photo || artisan.artisan_cover_photo,
    artisanRating: 4.5,
    artisanEmail: artisan.artisan_email
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Artisan Marketplace</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover talented artisans and their unique services in your area.
          </p>
          {userLocation && (
            <div className="mt-6 inline-flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-black">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Showing artisans near <span className="font-semibold ml-1">{userLocation}</span>
            </div>
          )}
        </div>
      </section>

      {/* Store Navigation with Search */}
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

      {/* Artisans Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Artisans</h2>
              <p className="text-gray-600">
                {loading ? 'Loading...' : `Showing ${transformedArtisans.length} artisans`}
              </p>
              {userLocation && (
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Local artisans highlighted
                </p>
              )}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error loading artisans</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                  <button
                    onClick={fetchArtisans}
                    className="mt-2 bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Artisans Grid */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {transformedArtisans.map(artisan => (
                  <ArtisanCard
                    key={artisan.artisanId}
                    artisanId={artisan.artisanId}
                    artisanName={artisan.artisanName}
                    artisanDescription={artisan.artisanDescription}
                    artisanImage={artisan.artisanImage}
                    artisanRating={artisan.artisanRating}
                    artisanEmail={artisan.artisanEmail}
                  />
                ))}
              </div>

              {/* Empty State */}
              {transformedArtisans.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No artisans found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    There are currently no artisans registered in the marketplace.
                  </p>
                </div>
              )}
            </>
          )}
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