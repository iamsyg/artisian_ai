"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import { supabase } from '@/app/lib/supabaseClient';
import { User } from '@/app/types/user';

interface user {
  full_name: string;
  phone_number: string;
  email: string;
  address: string;
  total_orders: number;
  created_at: string;
  last_order_date: string;
}

const PersonalProfilePage = () => {
  // Static user data

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        const userId = session?.user.id;
        if (!userId) return;
  
        const { data: userInfo, error } = await supabase
          .from('users')
          .select('full_name, email, photo_url, address, phone_number, total_orders, created_at')
          .eq('user_supabase_uid', userId)
          .maybeSingle();
  
        if (error) {
          console.error('Error fetching user:', error);
          return;
        }
  
        if (userInfo) {
          setUser(userInfo as User);
        }
      });
  
      return () => {
        subscription.unsubscribe();
      };
    }, []);

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
          <h1 className="text-3xl font-bold text-gray-900">Personal Profile</h1>
          <p className="text-gray-600 mt-2">View and manage your personal information</p>
        </div>

        {/* Profile Card */}
        <div className="max-w-4xl">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {user?.full_name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="text-white">
                  <h2 className="text-2xl font-bold">{user?.full_name}</h2>
                  <p className="text-blue-100">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Personal Information
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Full Name</label>
                  <p className="text-gray-900 font-medium mt-1">{user?.full_name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Email Address</label>
                  <p className="text-gray-900 font-medium mt-1">{user?.email}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone Number</label>
                  <p className="text-gray-900 font-medium mt-1">{user?.phone_number}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="text-gray-900 font-medium mt-1 whitespace-pre-line">{user?.address}</p>
                </div>
              </div>
            </div>

            {/* Account Information Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Account Information
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Orders</label>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-2xl font-bold text-blue-600">{user?.total_orders}</span>
                    <span className="text-sm text-gray-500">completed orders</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Account Created</label>
                  <p className="text-gray-900 font-medium mt-1">{
                    user?.created_at && new Date(user.created_at).toLocaleString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }</p>
                </div>
                
                {/* <div>
                  <label className="text-sm font-medium text-gray-500">Last Order</label>
                  <p className="text-gray-900 font-medium mt-1">{user?.last_order_date}</p>
                </div> */}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-blue-500 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Edit Profile</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mt-1">Update your personal information</p>
            </button>
            
            <button className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-blue-500 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Order History</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mt-1">View your complete order history</p>
            </button>
            
            <button className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-blue-500 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Security Settings</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mt-1">Manage your account security</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalProfilePage;