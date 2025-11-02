// app/artisan-signin/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Store, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle,
  Sparkles,
  Users,
  Shield
} from 'lucide-react';
import Sidebar from '@/app/components/Sidebar';
import { createClient } from '@/app/lib/supabaseClient';

export default function ArtisanSignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const router = useRouter();
  const supabase = createClient();

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
    };

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
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

      const { data } = await supabase.auth.getUser();
      const email = data.user?.email;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/artisan-signin`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            artisan_email: formData.email,
            artisan_password: formData.password,
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      console.log("Profile completed successfully", response);
      
      // Reset form after successful submission
      setFormData({
        email: '',
        password: '',
      });
      
      router.push('/profile/artisan-dashboard');
    } catch (error: any) {
      console.error('Error submitting form:', error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: <Store className="w-5 h-5" />,
      title: "Manage Your Shop",
      description: "Access your complete shop dashboard and inventory"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Connect with Customers",
      description: "Build relationships with your customer community"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Showcase Your Craft",
      description: "Highlight your unique creations and stories"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure & Protected",
      description: "Your shop data and customer information are safe"
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
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6 items-center">
            
            {/* Left Side - Features & Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Store className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome Back, Artisan
                </h1>
                <p className="text-lg text-gray-600">
                  Continue your creative journey and manage your shop
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
                  Everything You Need to Succeed
                </h2>
                
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-base mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats Section */}
              <div className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 text-white text-center">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xl font-bold">10K+</div>
                    <div className="text-xs opacity-90">Active Artisans</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">4.9★</div>
                    <div className="text-xs opacity-90">Avg. Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Sign In Form */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Sign In to Your Shop
                </h2>
                <p className="text-gray-600">
                  Access your artisan dashboard and continue creating
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="w-4 h-4 mr-2 text-indigo-600" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200 ${
                        errors.email 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-200 hover:border-gray-300 focus:border-indigo-500'
                      }`}
                      placeholder="your.shop@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Lock className="w-4 h-4 mr-2 text-indigo-600" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 pr-10 border-2 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200 ${
                        errors.password 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-200 hover:border-gray-300 focus:border-indigo-500'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  
                  <Link 
                    href="/forgot-password" 
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Sign In to Your Shop
                      </>
                    )}
                  </button>
                </div>

                {/* Demo Credentials */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="text-xs font-semibold text-blue-900 mb-1">Demo Credentials:</h4>
                  <p className="text-xs text-blue-700 mb-0.5">
                    <strong>Email:</strong> artisan@example.com
                  </p>
                  <p className="text-xs text-blue-700">
                    <strong>Password:</strong> any password will work for demo
                  </p>
                </div>

                {/* Sign Up Link */}
                <div className="text-center pt-3">
                  <p className="text-gray-600 text-sm">
                    Don&apos;t have an artisan account?{' '}
                    <Link 
                      href="/profile/became-artisan" 
                      className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                    >
                      Create your shop
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