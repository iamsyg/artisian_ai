"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface VerifiedBadgeProps {
  userId?: string;
  size?: "sm" | "md" | "lg";
  variant?: "success" | "premium" | "simple";
  showButton?: boolean;
  buttonText?: string;
  redirectUrl?: string;
  className?: string;
}

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  userId,
  size = "md",
  variant = "success",
  showButton = true,
  buttonText = "Explore the Store",
  redirectUrl = "/store",
  className = ""
}) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(redirectUrl);
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      container: "p-4",
      icon: "text-2xl p-2",
      title: "text-xl",
      text: "text-sm",
      button: "py-2 px-4 text-sm"
    },
    md: {
      container: "p-6",
      icon: "text-3xl p-3",
      title: "text-2xl",
      text: "text-base",
      button: "py-3 px-6 text-base"
    },
    lg: {
      container: "p-8",
      icon: "text-4xl p-4",
      title: "text-3xl",
      text: "text-lg",
      button: "py-4 px-8 text-lg"
    }
  };

  // Variant configurations
  const variantConfig = {
    success: {
      background: "bg-gradient-to-br from-green-50 to-blue-50",
      card: "bg-white",
      iconBg: "bg-green-100",
      title: "text-gray-900",
      text: "text-gray-600",
      button: "bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
    },
    premium: {
      background: "bg-gradient-to-br from-purple-50 to-pink-50",
      card: "bg-white",
      iconBg: "bg-purple-100",
      title: "text-gray-900",
      text: "text-gray-600",
      button: "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
    },
    simple: {
      background: "bg-gray-50",
      card: "bg-white",
      iconBg: "bg-gray-100",
      title: "text-gray-900",
      text: "text-gray-600",
      button: "bg-gray-800 hover:bg-gray-900"
    }
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantConfig[variant];

  return (
    <div className={`inline-flex ${className}`}>
      <div className={`rounded-2xl shadow-lg ${currentSize.container} ${currentVariant.card}`}>
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className={`rounded-full ${currentSize.icon} ${currentVariant.iconBg}`}>
            <span>✅</span>
          </div>
        </div>

        {/* Success Message */}
        <h1 className={`font-bold mb-3 ${currentSize.title} ${currentVariant.title}`}>
          Verification Successful!
        </h1>
        
        <p className={`mb-4 leading-relaxed ${currentSize.text} ${currentVariant.text}`}>
          Your account has been successfully verified. You can now access all features of our platform.
        </p>

        {/* Redirect Button */}
        {showButton && (
          <button
            onClick={handleRedirect}
            className={`w-full text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentSize.button} ${currentVariant.button} ${
              variant === 'success' ? 'focus:ring-green-500' : 
              variant === 'premium' ? 'focus:ring-purple-500' : 
              'focus:ring-gray-500'
            }`}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifiedBadge;