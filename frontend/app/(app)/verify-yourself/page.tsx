"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { User, Mail, MapPin, Phone, Camera, Upload } from "lucide-react";

interface UserData {
  fullName: string;
  address: string;
  phoneNumber: string;
  imageFile: File | null;
}

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    address: "",
    phoneNumber: "",
    imageFile: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        console.log("User already signed in:", session.user.id);
        setUser(session.user);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        console.log("User signed in:", session.user.id);
        setUser(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const file = e.target.files?.[0];
    // if (file) {
    //   setUserData(prev => ({ ...prev, imageFile: file }));
      
    //   // Create image preview
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     setImagePreview(e.target?.result as string);
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    // if (!user) return;

    // setIsLoading(true);

    // try {
    //   // Prepare form data for API
    //   const formData = new FormData();
    //   formData.append("userId", user.id);
    //   formData.append("email", user.email || "");
    //   formData.append("fullName", userData.fullName);
    //   formData.append("address", userData.address);
    //   formData.append("phoneNumber", userData.phoneNumber);
      
    //   if (userData.imageFile) {
    //     formData.append("image", userData.imageFile);
    //   }

    //   // Call your API endpoint
    //   const response = await fetch("/api/complete-profile", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to submit profile data");
    //   }

    //   const result = await response.json();
    //   console.log("Profile submitted successfully:", result);

    //   // Redirect to complete verification page
    //   router.push(`/verify-yourself/complete-verification/${user.id}`);

    // } catch (error) {
    //   console.error("Error submitting profile:", error);
    //   alert("Error submitting profile. Please try again.");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue your verification</p>
          </div>
          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#6366f1',
                    brandAccent: '#4f46e5'
                  }
                }
              }
            }}
            providers={[]}
            redirectTo="http://localhost:3000/verify-yourself"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Complete Your Profile</h1>
          <p className="text-lg text-gray-600">
            Please provide the following information to complete your verification
          </p>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Camera className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-colors">
                  <Upload className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-3">Upload your profile picture</p>
            </div>

            {/* Full Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={user.email || ""}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Address */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                Address
              </label>
              <textarea
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Enter your complete address"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                  Submitting...
                </div>
              ) : (
                "Complete Verification"
              )}
            </button>
          </form>
        </div>

        {/* User Info */}
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>User ID: {user.id}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;