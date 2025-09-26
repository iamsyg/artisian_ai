'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import Link from 'next/link';

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [user, setUser] = useState<{
    full_name: string;
    email: string;
    photo_url: string | null;
  }>({
    full_name: '',
    email: '',
    photo_url: null,
  });

  // Fetch user data on auth state change
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const userId = session?.user.id;
      if (!userId) return;

      const { data: userInfo, error } = await supabase
        .from('users')
        .select('full_name, email, photo_url')
        .eq('user_supabase_uid', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user:', error);
        return;
      }

      if (userInfo) {
        setUser({
          full_name: userInfo.full_name,
          email: userInfo.email,
          photo_url: userInfo.photo_url,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Generate initials for profile picture
  const getInitials = (name: string) => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };

  const handleSignOut = async() => {
    // Sign out logic here
    const {error} = await supabase.auth.signOut();
    if (error) console.log('Error signing out:', error.message);
    else window.location.href = '/store';
  }

  // Menu items
  const menuItems = [
    {
      id: 1,
      name: 'Personal Details',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      href: "/personal-details", 
      label: "Personal Details",
      active: true,
    },
    {
      id: 2,
      name: 'Become Artisan',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      href: "/become-artisan",
      label: "Become Artisan",
      active: false,
    },
    {
      id: 3,
      name: 'Contact Us',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      href: "/contact-us",
      label: "Contact Us",
      active: false,
    },
    {
      id: 4,
      name: 'My Orders',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      href: "/my-orders",
      label: "My Orders",
      active: false,
    },
    {
      id: 5,
      name: 'Log Out',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      active: false,
      onclick: handleSignOut,
      isLogout: true,
    },
  ];

  const handleMenuItemClick = (itemName: string) => {
    alert(`${itemName} clicked!`);
    // Close mobile menu when item is clicked
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-gray-900 rounded-lg text-white shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-64 h-screen bg-gray-900 text-white shadow-xl
      `}>
        {/* Close button for mobile */}
        <div className="md:hidden absolute top-4 right-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                {user.photo_url ? (
                  <img
                    src={user.photo_url}
                    alt={user.full_name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-bold text-white">
                    {getInitials(user.full_name)}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
            </div>
            
            {/* User Info */}
            <div>
              <h2 className="text-base font-semibold">{user.full_name}</h2>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
<nav className="p-4">
  <ul className="space-y-1">
    {menuItems.map((item) => (
      <li key={item.id}>
  {item.isLogout ? (
    // 🔴 Logout only button
    <button
      onClick={item.onclick}
      className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-300 hover:bg-red-500/20 transition-all duration-200"
    >
      <div className="p-1 rounded text-red-300">{item.icon}</div>
      <span className="text-sm font-medium">{item.name}</span>
    </button>
  ) : (
    // ✅ Only wrap with Link if href exists
    item.href ? (
      <Link href={item.href}>
        <button
          onClick={() => handleMenuItemClick(item.name)}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
            item.active
              ? "bg-blue-500/20 text-blue-300"
              : "text-gray-300 hover:bg-gray-800"
          }`}
        >
          <div
            className={`p-1 rounded ${
              item.active ? "text-blue-300" : "text-gray-400"
            }`}
          >
            {item.icon}
          </div>
          <span className="text-sm font-medium">{item.name}</span>
        </button>
      </Link>
    ) : null
  )}
</li>

    ))}
  </ul>
</nav>

      </div>
    </>
  );
}