"use client";
import React from "react";
import { useRouter } from "next/navigation";

const CompleteVerificationPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <span className="text-4xl">✅</span>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Verification Successful!
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Your account has been successfully verified. You can now access all features of our platform.
        </p>

        

        {/* Redirect Button */}
        <button
          onClick={handleRedirect}
          className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Explore the Store
        </button>
      </div>
    </div>
  );
};

export default CompleteVerificationPage;