// app/profile/page.tsx
'use client';

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from "@/app/lib/supabaseClient";
import VerifiedBadge from '@/app/components/VerifiedBadge';

interface ProfileFormData {
  fullName: string;
  address: string;
  phoneNumber: string;
  imageFile: File | null;
}

export default function ProfilePage() {
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: '',
    address: '',
    phoneNumber: '',
    imageFile: null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false); // New state
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/image-upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData
      });

      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();
      return data.publicUrl || null;
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
      return null;
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, imageFile: null }));
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    console.log("Token:", token);

    try {
      let uploadedUrl: string | null = null;

      if (formData.imageFile) {
        uploadedUrl = await uploadImage(formData.imageFile);
      }

      const { data } = await supabase.auth.getUser();
      const email = data.user?.email;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register-user`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            full_name: formData.fullName,
            address: formData.address,
            phone_number: formData.phoneNumber,
            photo_url: uploadedUrl,
            email
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Profile completion failed");
      }

      // Profile completed successfully
      setIsProfileComplete(true);
      
      // Reset form
      setFormData({
        fullName: '',
        address: '',
        phoneNumber: '',
        imageFile: null,
      });
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

      console.log("Profile completed successfully");

    } catch (error: any) {
      console.error(error);
      alert(error.message || "Profile completion failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If profile is complete, show the VerifiedBadge
  if (isProfileComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <VerifiedBadge
            size="lg"
            variant="success"
            showButton={true}
            buttonText="Go to Store"
            redirectUrl="/store"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Complete Your Profile</h1>
          <p className="text-lg text-gray-600">
            Please provide the following information to complete your profile
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden">
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-4xl">👤</span>
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-colors">
                  <span className="text-sm">📷</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    ref={fileInputRef}
                  />
                </label>
              </div>
              {previewUrl && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="mt-2 text-red-600 text-sm hover:text-red-700"
                >
                  Remove Image
                </button>
              )}
              <p className="text-sm text-gray-500 mt-3">Upload your profile picture</p>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
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
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isSubmitting ? 'Completing Profile...' : 'Complete Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}