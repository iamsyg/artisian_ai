// app/dashboard/services/page.tsx
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import {
  Upload,
  Image as ImageIcon,
  DollarSign,
  Clock,
  FileText,
  Plus,
  X,
  CheckCircle,
  Sparkles,
  Zap,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Filter,
  IndianRupee,
  Save,
  ArrowLeft
} from 'lucide-react';

interface Service {
  id: string;
  serviceName: string;
  price: number;
  description: string;
  deliveryTime: number;
  isActive: boolean;
  images: string[];
  createdAt: string;
}

interface ServiceFormData {
  serviceName: string;
  price: number | '';
  description: string;
  deliveryTime: number | '';
  isActive: boolean;
  images: File[];
}

interface FormErrors {
  serviceName?: string;
  price?: string;
  description?: string;
  deliveryTime?: string;
  images?: string;
}

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'edit'>('list');
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      serviceName: 'Professional Logo Design',
      price: 299,
      description: 'Custom logo design with 3 concepts and unlimited revisions. Perfect for businesses looking to establish a strong brand identity with professional logo design services.',
      deliveryTime: 7,
      isActive: true,
      images: ['/api/placeholder/400/250'],
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      serviceName: 'Website Development',
      price: 1200,
      description: 'Responsive website development with modern technologies including React, Next.js, and Tailwind CSS. Fully customized solutions for your business needs.',
      deliveryTime: 14,
      isActive: true,
      images: ['/api/placeholder/400/250'],
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      serviceName: 'Social Media Management',
      price: 499,
      description: 'Monthly social media management and content creation across all major platforms. Includes strategy development, content planning, and performance analytics.',
      deliveryTime: 30,
      isActive: false,
      images: ['/api/placeholder/400/250'],
      createdAt: '2024-01-05'
    }
  ]);

  const [formData, setFormData] = useState<ServiceFormData>({
    serviceName: '',
    price: '',
    description: '',
    deliveryTime: '',
    isActive: true,
    images: []
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter services based on search
  const filteredServices = services.filter(service =>
    service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.serviceName.trim()) {
      newErrors.serviceName = 'Service name is required';
    } else if (formData.serviceName.length < 5) {
      newErrors.serviceName = 'Service name must be at least 5 characters';
    }

    if (formData.price === '') {
      newErrors.price = 'Price is required';
    } else if (formData.price < 1) {
      newErrors.price = 'Price must be at least ₹1';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (formData.deliveryTime === '') {
      newErrors.deliveryTime = 'Delivery time is required';
    } else if (formData.deliveryTime < 1) {
      newErrors.deliveryTime = 'Delivery time must be at least 1 day';
    }

    if (formData.images.length === 0 && imagePreviews.length === 0) {
      newErrors.images = 'Please upload at least one image';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'deliveryTime' ? (value === '' ? '' : Number(value)) : value
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleToggleActive = () => {
    setFormData(prev => ({
      ...prev,
      isActive: !prev.isActive
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length + formData.images.length + imagePreviews.length > 10) {
      alert('Maximum 10 images allowed');
      return;
    }

    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        alert('Please select image files only');
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size must be less than 10MB');
        return false;
      }
      return true;
    });

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...validFiles]
    }));

    // Create previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number, isExistingImage: boolean = false) => {
    if (isExistingImage) {
      // Remove from existing image previews
      setImagePreviews(prev => prev.filter((_, i) => i !== index));
    } else {
      // Remove from new file uploads
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
      setImagePreviews(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setFormData({
      serviceName: service.serviceName,
      price: service.price,
      description: service.description,
      deliveryTime: service.deliveryTime,
      isActive: service.isActive,
      images: []
    });
    setImagePreviews(service.images);
    setActiveTab('edit');
  };

  const handleCancelEdit = () => {
    setEditingService(null);
    setFormData({
      serviceName: '',
      price: '',
      description: '',
      deliveryTime: '',
      isActive: true,
      images: []
    });
    setImagePreviews([]);
    setActiveTab('list');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (editingService) {
        // Update existing service
        const updatedService: Service = {
          ...editingService,
          serviceName: formData.serviceName,
          price: formData.price as number,
          description: formData.description,
          deliveryTime: formData.deliveryTime as number,
          isActive: formData.isActive,
          images: imagePreviews
        };

        setServices(prev => prev.map(service => 
          service.id === editingService.id ? updatedService : service
        ));
        
        alert('Service updated successfully!');
      } else {
        // Create new service
        const newService: Service = {
          id: Date.now().toString(),
          serviceName: formData.serviceName,
          price: formData.price as number,
          description: formData.description,
          deliveryTime: formData.deliveryTime as number,
          isActive: formData.isActive,
          images: imagePreviews,
          createdAt: new Date().toISOString()
        };

        setServices(prev => [newService, ...prev]);
        alert('Service created successfully!');
      }
      
      // Reset form
      setFormData({
        serviceName: '',
        price: '',
        description: '',
        deliveryTime: '',
        isActive: true,
        images: []
      });
      setImagePreviews([]);
      setEditingService(null);
      setActiveTab('list');
      
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Error saving service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(prev => prev.filter(service => service.id !== id));
    }
  };

  const handleToggleServiceStatus = (id: string) => {
    setServices(prev => prev.map(service =>
      service.id === id ? { ...service, isActive: !service.isActive } : service
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {activeTab === 'edit' ? 'Edit Service' : 'Manage Services'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {activeTab === 'edit' 
              ? 'Update your service details' 
              : 'Create and manage your service offerings to grow your business'
            }
          </p>
        </div>

        {/* Tabs - Only show when not in edit mode */}
        {activeTab !== 'edit' && (
          <div className="bg-white rounded-2xl shadow-lg p-2 mb-8 max-w-2xl mx-auto">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('list')}
                className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'list'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                My Services ({services.length})
              </button>
              <button
                onClick={() => setActiveTab('add')}
                className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'add'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Add New Service
              </button>
            </div>
          </div>
        )}

        {/* Back Button for Edit Mode */}
        {activeTab === 'edit' && (
          <div className="mb-6 max-w-4xl mx-auto">
            <button
              onClick={handleCancelEdit}
              className="flex items-center text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Services
            </button>
          </div>
        )}

        {/* Content */}
        {activeTab === 'list' ? (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  />
                </div>
                <button className="px-6 py-3 border-2 border-gray-200 rounded-xl text-gray-600 hover:border-purple-500 hover:text-purple-600 transition-all duration-200 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filter
                </button>
              </div>
            </div>

            {/* Services List - Full Width Cards */}
            <div className="space-y-6">
              {filteredServices.map((service) => (
                <div key={service.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div className="lg:w-1/3 relative">
                      <div className="h-64 lg:h-full bg-gradient-to-br from-purple-100 to-blue-100 overflow-hidden">
                        <img
                          src={service.images[0]}
                          alt={service.serviceName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Active Status Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          service.isActive 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-gray-100 text-gray-800 border border-gray-200'
                        }`}>
                          {service.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-2/3 p-6">
                      <div className="flex flex-col h-full">
                        {/* Header with Price */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {service.serviceName}
                            </h3>
                            <div className="flex items-center text-3xl font-bold text-purple-600 mb-4">
                              <IndianRupee className="w-7 h-7 mr-1" />
                              {service.price}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed flex-1">
                          {service.description}
                        </p>

                        {/* Footer with Meta and Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                          {/* Meta Information */}
                          <div className="flex items-center space-x-6 text-gray-500">
                            <div className="flex items-center">
                              <Clock className="w-5 h-5 mr-2" />
                              <span className="font-medium">{service.deliveryTime} days delivery</span>
                            </div>
                            <div className="text-sm">
                              Created: {new Date(service.createdAt).toLocaleDateString()}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleToggleServiceStatus(service.id)}
                              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                service.isActive
                                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                                  : 'bg-green-500 text-white hover:bg-green-600'
                              }`}
                            >
                              {service.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                            <button 
                              onClick={() => handleEditService(service)}
                              className="p-3 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors duration-200"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteService(service.id)}
                              className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No services found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first service'}
                </p>
                <button
                  onClick={() => setActiveTab('add')}
                  className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors duration-200 font-semibold"
                >
                  Add Your First Service
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Add/Edit Service Form */
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Service Name & Active Toggle Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="serviceName" className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                    <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                    Service Name *
                  </label>
                  <input
                    id="serviceName"
                    name="serviceName"
                    type="text"
                    required
                    value={formData.serviceName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base transition-all duration-200 ${
                      errors.serviceName 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-200 hover:border-gray-300 focus:border-purple-500'
                    }`}
                    placeholder="e.g., Professional Logo Design"
                  />
                  {errors.serviceName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      {errors.serviceName}
                    </p>
                  )}
                </div>

                {/* Active Toggle */}
                <div>
                  <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                    <Zap className="w-5 h-5 mr-2 text-purple-600" />
                    Service Status
                  </label>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {formData.isActive ? 'Active' : 'Inactive'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formData.isActive ? 'Service is visible to customers' : 'Service is hidden from customers'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleToggleActive}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                        formData.isActive ? 'bg-purple-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          formData.isActive ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Price & Delivery Time Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                    <IndianRupee className="w-5 h-5 mr-2 text-purple-600" />
                    Price (₹) *
                  </label>
                  <div className="relative">
                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="1"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base transition-all duration-200 ${
                        errors.price 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-200 hover:border-gray-300 focus:border-purple-500'
                      }`}
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-medium">₹</span>
                    </div>
                  </div>
                  {errors.price && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      {errors.price}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="deliveryTime" className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                    <Clock className="w-5 h-5 mr-2 text-purple-600" />
                    Delivery Time (Days) *
                  </label>
                  <div className="relative">
                    <input
                      id="deliveryTime"
                      name="deliveryTime"
                      type="number"
                      min="1"
                      required
                      value={formData.deliveryTime}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base transition-all duration-200 ${
                        errors.deliveryTime 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-200 hover:border-gray-300 focus:border-purple-500'
                      }`}
                      placeholder="e.g., 7"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.deliveryTime && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      {errors.deliveryTime}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                  <FileText className="w-5 h-5 mr-2 text-purple-600" />
                  Service Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base transition-all duration-200 resize-none ${
                    errors.description 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-200 hover:border-gray-300 focus:border-purple-500'
                  }`}
                  placeholder="Describe your service in detail..."
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                  <ImageIcon className="w-5 h-5 mr-2 text-purple-600" />
                  Service Images *
                </label>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Upload Area */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200 cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Upload className="w-8 h-8 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Upload Service Images
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Click to upload or drag and drop (Max 10 images, 10MB each)
                  </p>
                </div>

                {errors.images && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    {errors.images}
                  </p>
                )}

                {/* Image Previews */}
                {(imagePreviews.length > 0 || formData.images.length > 0) && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Uploaded Images ({imagePreviews.length + formData.images.length}/10)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-xl shadow-md"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index, true)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg hover:bg-red-600 transition-colors duration-200"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6 flex space-x-4">
                {activeTab === 'edit' && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
                    activeTab === 'edit' ? 'flex-1' : 'w-full'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      {activeTab === 'edit' ? 'Updating Service...' : 'Creating Service...'}
                    </>
                  ) : (
                    <>
                      {activeTab === 'edit' ? (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          Update Service
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          {formData.isActive ? 'Publish Service' : 'Save as Draft'}
                        </>
                      )}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}