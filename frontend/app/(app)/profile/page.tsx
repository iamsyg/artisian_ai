// pages/profile.tsx
"use client";

import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { signOut, getAuth } from 'firebase/auth';
import { app } from "@/app/firebase";

// Define types
interface User {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  coordinates: [number, number];
}

interface Order {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: string;
}

const auth = getAuth(app);

const ProfilePage = () => {
  const router = useRouter();
  
  // Sample user data
  const [user, setUser] = useState<User>({
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St, San Francisco, CA 94111',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    coordinates: [37.7749, -122.4194]
  });

  // State for editable fields
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>({...user});
  
  // Sample orders data
  const [orders] = useState<Order[]>([
    { id: 'ORD-12345', date: '2023-05-15', items: ['Wireless Headphones', 'Phone Case'], total: 89.98, status: 'Delivered' },
    { id: 'ORD-12346', date: '2023-06-22', items: ['Smart Watch', 'Charging Cable'], total: 249.99, status: 'Shipped' },
    { id: 'ORD-12347', date: '2023-07-30', items: ['Laptop Bag'], total: 59.99, status: 'Processing' },
  ]);

  const [showContactForm, setShowContactForm] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

   const [userEmail, setUserEmail] = useState<string | null>(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtpField, setShowOtpField] = useState(false);
    const [authError, setAuthError] = useState("");

  const handleLogout = async () => {
        setAuthError("");
        await signOut(auth);
        setUserEmail(null);
        setPhoneNumber("");
        setOtp("");
        setShowOtpField(false);
        router.push("/store");
  };

  const handleEdit = () => {
    setEditedUser({...user});
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser({...editedUser});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({...user});
    setIsEditing(false);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Your message has been sent! We will get back to you soon.');
    setContactMessage('');
    setShowContactForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>User Profile</title>
        <meta name="description" content="User profile page" />
      </Head>

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{user.firstName} {user.lastName}</h1>
                  <p className="mt-1 opacity-90">Welcome to your profile</p>
                </div>
              </div>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {/* Left Column - Personal Info */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">First Name</label>
                      {isEditing && (
                        <span className="text-xs text-blue-600">Editing</span>
                      )}
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.firstName}
                        onChange={(e) => setEditedUser({...editedUser, firstName: e.target.value})}
                        className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 px-2 py-1 rounded-md">{user.firstName}</p>
                    )}
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">Last Name</label>
                      {isEditing && (
                        <span className="text-xs text-blue-600">Editing</span>
                      )}
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.lastName}
                        onChange={(e) => setEditedUser({...editedUser, lastName: e.target.value})}
                        className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 px-2 py-1 rounded-md">{user.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <p className="text-gray-900 px-2 py-1 rounded-md">{user.email}</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                      {isEditing && (
                        <span className="text-xs text-blue-600">Editing</span>
                      )}
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.phone}
                        onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 px-2 py-1 rounded-md">{user.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Us Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Contact Us</h2>
                {!showContactForm ? (
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Support
                  </button>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                      <textarea
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Send Message
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowContactForm(false)}
                        className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Middle Column - Address & Map */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 h-full">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Address & Location</h2>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">Street Address</label>
                    {isEditing && (
                      <span className="text-xs text-blue-600">Editing</span>
                    )}
                  </div>
                  {isEditing ? (
                    <textarea
                      value={editedUser.address}
                      onChange={(e) => setEditedUser({...editedUser, address: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 px-2 py-1 rounded-md">{user.address}</p>
                  )}
                </div>
                
                {/* Map display */}
                <div className="h-72 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-md overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <p className="font-medium text-gray-700">{user.address}</p>
                      <p className="text-sm text-gray-500 mt-2">Coordinates: {user.coordinates[0]}, {user.coordinates[1]}</p>
                    </div>
                  </div>
                  
                  {/* Map marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Orders */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 h-full">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Your Orders</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{order.id}</h3>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="mt-2">
                        <ul className="text-sm text-gray-600">
                          {order.items.map((item, index) => (
                            <li key={index} className="truncate">{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-sm text-gray-500">Total:</span>
                        <span className="font-medium text-gray-900">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Logout Button */}
                <div className="mt-8 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;