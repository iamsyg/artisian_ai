// components/SignupForm.tsx
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Link from 'next/link';
import { 
  Star, 
  Shield, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Upload,
  Store,
  FileText,
  Mail,
  Lock
} from 'lucide-react';
// import { supabase } from '@/app/lib/supabaseClient';
import Sidebar from '@/app/components/Sidebar';
import { useRouter } from 'next/navigation';
import { createClient } from '@/app/lib/supabaseClient';

interface FormData {
  shopName: string;
  shopDescription: string;
  email: string;
  password: string;
  profilePhoto: File | null;
  coverPhoto: File | null;
}

interface FormErrors {
  shopName?: string;
  shopDescription?: string;
  email?: string;
  password?: string;
}

export default function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    shopName: '',
    shopDescription: '',
    email: '',
    password: '',
    profilePhoto: null,
    coverPhoto: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string>('');
  const [coverPreview, setCoverPreview] = useState<string>('');

  const profilePhotoRef = useRef<HTMLInputElement>(null);
  const coverPhotoRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const supabase = createClient();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.shopName.trim()) {
      newErrors.shopName = 'Shop name is required';
    }

    if (!formData.shopDescription.trim()) {
      newErrors.shopDescription = 'Shop description is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'profile') {
        setFormData(prev => ({ ...prev, profilePhoto: file }));
        const reader = new FileReader();
        reader.onload = (e) => setProfilePreview(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        setFormData(prev => ({ ...prev, coverPhoto: file }));
        const reader = new FileReader();
        reader.onload = (e) => setCoverPreview(e.target?.result as string);
        reader.readAsDataURL(file);
      }
    }
  };

  const removePhoto = (type: 'profile' | 'cover') => {
    if (type === 'profile') {
      setFormData(prev => ({ ...prev, profilePhoto: null }));
      setProfilePreview('');
      if (profilePhotoRef.current) profilePhotoRef.current.value = '';
    } else {
      setFormData(prev => ({ ...prev, coverPhoto: null }));
      setCoverPreview('');
      if (coverPhotoRef.current) coverPhotoRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      alert("You must be logged in as a customer first.");
      return;
    }

    const token = sessionData.session.access_token;
    console.log("Customer token:", token);

    try {
      let uploadedUrl: string | null = null;

      if (formData.profilePhoto) {
        // Upload profile photo logic here
      }

      if (formData.coverPhoto) {
        // Upload cover photo logic here
      }

      const { data } = await supabase.auth.getUser();
      const email = data.user?.email;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/artisan-signup`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            artisan_shop_name: formData.shopName,
            artisan_shop_description: formData.shopDescription,
            artisan_email: formData.email,
            artisan_password: formData.password,
            artisan_profile_photo: uploadedUrl,
            artisan_cover_photo: uploadedUrl
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Profile completion failed");
      }

      console.log("Profile completed successfully", response);
      
      // Reset form after successful submission
      setFormData({
        shopName: '',
        shopDescription: '',
        email: '',
        password: '',
        profilePhoto: null,
        coverPhoto: null,
      });
      setProfilePreview('');
      setCoverPreview('');
      
      router.push('/profile/artisan-dashboard');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error registering shop. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const guidelines = [
    {
      icon: <Store className="w-6 h-6" />,
      title: "Choose a Memorable Shop Name",
      description: "Pick a name that reflects your craft and is easy for customers to remember."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Craft Your Story",
      description: "Share your journey, inspiration, and what makes your creations unique."
    },
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Showcase Your Work",
      description: "High-quality photos help customers appreciate the quality of your craftsmanship."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Your Account",
      description: "Use a strong password to protect your shop and customer information."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Grow Your Business",
      description: "Complete your profile to increase visibility and build customer trust."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 z-30">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64"> {/* Add margin to account for sidebar */}
        <div className="container mx-auto px-8 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Left Side - Guidelines */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Store className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Start Your Artisan Journey
                </h1>
                <p className="text-lg text-gray-600">
                  Join thousands of talented artisans showcasing their craft to the world
                </p>
              </div>

              <div className="space-y-5">
                <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
                  Success Guidelines for Artisans
                </h2>
                
                {guidelines.map((guideline, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                      {guideline.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-base mb-1">
                        {guideline.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {guideline.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats Section */}
              <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 text-white text-center">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xl font-bold">10K+</div>
                    <div className="text-xs opacity-90">Active Artisans</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">$50M+</div>
                    <div className="text-xs opacity-90">Total Sales</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">4.9★</div>
                    <div className="text-xs opacity-90">Avg. Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Create Your Shop
                </h2>
                <p className="text-gray-600">
                  Join our community of talented artisans
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Shop Name */}
                <div>
                  <label htmlFor="shopName" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Store className="w-4 h-4 mr-2 text-indigo-600" />
                    Shop Name *
                  </label>
                  <div>
                    <input
                      id="shopName"
                      name="shopName"
                      type="text"
                      required
                      value={formData.shopName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200 ${
                        errors.shopName 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-200 hover:border-gray-300 focus:border-indigo-500'
                      }`}
                      placeholder="Enter your unique shop name"
                    />
                    {errors.shopName && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        {errors.shopName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Shop Description */}
                <div>
                  <label htmlFor="shopDescription" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <FileText className="w-4 h-4 mr-2 text-indigo-600" />
                    Shop Description *
                  </label>
                  <div>
                    <textarea
                      id="shopDescription"
                      name="shopDescription"
                      rows={3}
                      required
                      value={formData.shopDescription}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200 resize-none ${
                        errors.shopDescription 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-200 hover:border-gray-300 focus:border-indigo-500'
                      }`}
                      placeholder="Tell your story and describe your craft..."
                    />
                    {errors.shopDescription && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        {errors.shopDescription}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="w-4 h-4 mr-2 text-indigo-600" />
                    Email Address *
                  </label>
                  <div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200 ${
                        errors.email 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-200 hover:border-gray-300 focus:border-indigo-500'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Lock className="w-4 h-4 mr-2 text-indigo-600" />
                    Password *
                  </label>
                  <div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200 ${
                        errors.password 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-200 hover:border-gray-300 focus:border-indigo-500'
                      }`}
                      placeholder="Create a secure password"
                    />
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                {/* Profile Photo (Optional) */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Users className="w-4 h-4 mr-2 text-indigo-600" />
                    Profile Photo (Optional)
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {profilePreview ? (
                        <div className="relative group">
                          <img
                            className="h-16 w-16 rounded-2xl object-cover shadow-md border-2 border-white"
                            src={profilePreview}
                            alt="Profile preview"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto('profile')}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-lg hover:bg-red-600 transition-colors duration-200"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-md border-2 border-dashed border-gray-300">
                          <Users className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        ref={profilePhotoRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'profile')}
                        className="hidden"
                        id="profilePhoto"
                      />
                      <label
                        htmlFor="profilePhoto"
                        className="cursor-pointer bg-white py-2 px-4 border-2 border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 inline-flex items-center"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Photo
                      </label>
                    </div>
                  </div>
                </div>

                {/* Cover Photo (Optional) */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Star className="w-4 h-4 mr-2 text-indigo-600" />
                    Cover Photo (Optional)
                  </label>
                  <div>
                    {coverPreview ? (
                      <div className="relative group">
                        <img
                          className="h-28 w-full object-cover rounded-2xl shadow-md border-2 border-white"
                          src={coverPreview}
                          alt="Cover preview"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto('cover')}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm shadow-lg hover:bg-red-600 transition-colors duration-200"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200 cursor-pointer group">
                        <input
                          ref={coverPhotoRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'cover')}
                          className="hidden"
                          id="coverPhoto"
                        />
                        <label
                          htmlFor="coverPhoto"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                            <Upload className="w-5 h-5 text-gray-400" />
                          </div>
                          <span className="text-gray-600 font-medium text-sm">Upload Cover Photo</span>
                          <span className="text-gray-500 text-xs mt-1">Showcase your best work</span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating Your Shop...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Create Shop Account
                      </>
                    )}
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center pt-3">
                  <p className="text-gray-600 text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}