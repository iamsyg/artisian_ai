// app/dashboard/services/page.tsx
'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';
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
import { createClient } from '@/app/lib/supabaseClient';

interface Service {
  service_id: string;
  service_name: string;
  service_price: number;
  description: string;
  delivery_time_days: number;
  is_active: boolean;
  image_urls: string[];
  created_at: string;
}

interface ServiceFormData {
  service_id?: string;
  service_name: string;
  service_price: number | '';
  description: string;
  delivery_time_days: number | '';
  is_active: boolean;
  image_urls: File[];
}

interface FormErrors {
  service_name?: string;
  service_price?: string;
  description?: string;
  delivery_time_days?: string;
  image_urls?: string;
}

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'edit'>('list');
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>({
    service_name: '',
    service_price: '',
    description: '',
    delivery_time_days: '',
    is_active: true,
    image_urls: []
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [services, setServices] = useState<Service[]>([]);
  const supabase = createClient();

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('artisan_services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching services:', error);
        return;
      }

      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  // Filter services based on search
  const filteredServices = services.filter(service =>
    service.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.service_name.trim()) {
      newErrors.service_name = 'Service name is required';
    } else if (formData.service_name.length < 5) {
      newErrors.service_name = 'Service name must be at least 5 characters';
    }

    if (formData.service_price === '') {
      newErrors.service_price = 'Price is required';
    } else if (formData.service_price < 1) {
      newErrors.service_price = 'Price must be at least ₹1';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (formData.delivery_time_days === '') {
      newErrors.delivery_time_days = 'Delivery time is required';
    } else if (formData.delivery_time_days < 1) {
      newErrors.delivery_time_days = 'Delivery time must be at least 1 day';
    }

    if (imagePreviews.length === 0 && formData.image_urls.length === 0) {
      newErrors.image_urls = 'Please upload at least one image';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'service_price' || name === 'delivery_time_days' ? (value === '' ? '' : Number(value)) : value
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
      is_active: !prev.is_active
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length + formData.image_urls.length + imagePreviews.length > 10) {
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
      image_urls: [...prev.image_urls, ...validFiles]
    }));

    // Create previews for new files
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
      // Remove from existing image previews (edit mode)
      setImagePreviews(prev => prev.filter((_, i) => i !== index));
    } else {
      // Remove from new file uploads
      const newFiles = formData.image_urls.filter((_, i) => i !== index);
      const newPreviews = imagePreviews.filter((_, i) => i !== index);
      
      setFormData(prev => ({
        ...prev,
        image_urls: newFiles
      }));
      setImagePreviews(newPreviews);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
      alert("Not authenticated");
      setIsSubmitting(false);
      return;
    }

    try {
      // Convert new files to base64 for upload
      const newImageUrls: string[] = [];
      for (const file of formData.image_urls) {
        const base64 = await fileToBase64(file);
        newImageUrls.push(base64);
      }

      // Combine existing previews (from editing) with new uploads
      const allImageUrls = [...imagePreviews.filter(url => !url.startsWith('data:')), ...newImageUrls];

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/edit-service/${formData.service_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            service_name: formData.service_name,
            service_price: formData.service_price,
            description: formData.description,
            delivery_time_days: formData.delivery_time_days,
            image_urls: allImageUrls,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to update service");
      }

      alert('✅ Service updated successfully!');
      resetForm();
      fetchServices();
      setActiveTab("list");
    } catch (err) {
      console.error("Error updating service:", err);
      alert("⚠️ Failed to update service");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setFormData({
      service_id: service.service_id,
      service_name: service.service_name,
      service_price: service.service_price,
      description: service.description,
      delivery_time_days: service.delivery_time_days,
      is_active: service.is_active,
      image_urls: []
    });
    setImagePreviews(service.image_urls || []);
    setActiveTab('edit');
  };

  const handleCancelEdit = () => {
    resetForm();
    setActiveTab('list');
  };

  const resetForm = () => {
    setFormData({
      service_name: '',
      service_price: '',
      description: '',
      delivery_time_days: '',
      is_active: true,
      image_urls: []
    });
    setImagePreviews([]);
    setEditingService(null);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
      alert("Not authenticated");
      setIsSubmitting(false);
      return;
    }

    try {
      // Convert files to base64 for upload
      const imageUrls: string[] = [];
      for (const file of formData.image_urls) {
        const base64 = await fileToBase64(file);
        imageUrls.push(base64);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add-service`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          service_name: formData.service_name,
          service_price: formData.service_price,
          description: formData.description,
          delivery_time_days: formData.delivery_time_days,
          image_urls: imageUrls,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to create service');
      }

      alert('✅ Service created successfully!');
      resetForm();
      fetchServices();
      setActiveTab('list');
      
    } catch (err) {
      console.error('Error saving service:', err);
      alert('⚠️ Failed to save service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteService = async (service_id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;

        if (!token) {
          alert("Not authenticated");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-service/${service_id}`,
          {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          setServices(prev => prev.filter(service => service.service_id !== service_id));
          alert('✅ Service deleted successfully!');
        } else {
          throw new Error('Failed to delete service');
        }
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('⚠️ Failed to delete service');
      }
    }
  };

  const handleToggleServiceStatus = async (service_id: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) {
        alert("Not authenticated");
        return;
      }

      const service = services.find(s => s.service_id === service_id);
      if (!service) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/toggle-service-status/${service_id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            is_active: !service.is_active
          }),
        }
      );

      if (response.ok) {
        setServices(prev => prev.map(service =>
          service.service_id === service_id ? { ...service, is_active: !service.is_active } : service
        ));
      } else {
        throw new Error('Failed to update service status');
      }
    } catch (error) {
      console.error('Error toggling service status:', error);
      alert('⚠️ Failed to update service status');
    }
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

            {/* Services List */}
            <div className="space-y-6">
              {filteredServices.map((service) => (
                <div key={service.service_id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div className="lg:w-1/3 relative">
                      <div className="h-64 lg:h-full bg-gradient-to-br from-purple-100 to-blue-100 overflow-hidden">
                        {service.image_urls && service.image_urls.length > 0 ? (
                          <img
                            src={service.image_urls[0]}
                            alt={service.service_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-16 h-16 text-gray-400" />
                          </div>
                        )}
                      </div>
                      {/* Active Status Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          service.is_active 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-gray-100 text-gray-800 border border-gray-200'
                        }`}>
                          {service.is_active ? 'Active' : 'Inactive'}
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
                              {service.service_name}
                            </h3>
                            <div className="flex items-center text-3xl font-bold text-purple-600 mb-4">
                              <IndianRupee className="w-7 h-7 mr-1" />
                              {service.service_price}
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
                              <span className="font-medium">{service.delivery_time_days} days delivery</span>
                            </div>
                            <div className="text-sm">
                              Created: {new Date(service.created_at).toLocaleDateString()}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleToggleServiceStatus(service.service_id)}
                              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                service.is_active
                                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                                  : 'bg-green-500 text-white hover:bg-green-600'
                              }`}
                            >
                              {service.is_active ? 'Deactivate' : 'Activate'}
                            </button>
                            <button 
                              onClick={() => handleEditService(service)}
                              className="p-3 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors duration-200"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteService(service.service_id)}
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
            <form onSubmit={activeTab === 'edit' ? handleEditSubmit : handleSubmit} className="space-y-8">
              {/* Service Name & Active Toggle Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="service_name" className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                    <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                    Service Name *
                  </label>
                  <input
                    id="service_name"
                    name="service_name"
                    type="text"
                    required
                    value={formData.service_name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base transition-all duration-200 ${
                      errors.service_name 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-200 hover:border-gray-300 focus:border-purple-500'
                    }`}
                    placeholder="e.g., Professional Logo Design"
                  />
                  {errors.service_name && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      {errors.service_name}
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
                        {formData.is_active ? 'Active' : 'Inactive'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formData.is_active ? 'Service is visible to customers' : 'Service is hidden from customers'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleToggleActive}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                        formData.is_active ? 'bg-purple-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          formData.is_active ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Price & Delivery Time Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="service_price" className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                    <IndianRupee className="w-5 h-5 mr-2 text-purple-600" />
                    Price (₹) *
                  </label>
                  <div className="relative">
                    <input
                      id="service_price"
                      name="service_price"
                      type="number"
                      min="1"
                      step="0.01"
                      required
                      value={formData.service_price}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base transition-all duration-200 ${
                        errors.service_price 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-200 hover:border-gray-300 focus:border-purple-500'
                      }`}
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-medium">₹</span>
                    </div>
                  </div>
                  {errors.service_price && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      {errors.service_price}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="delivery_time_days" className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                    <Clock className="w-5 h-5 mr-2 text-purple-600" />
                    Delivery Time (Days) *
                  </label>
                  <div className="relative">
                    <input
                      id="delivery_time_days"
                      name="delivery_time_days"
                      type="number"
                      min="1"
                      required
                      value={formData.delivery_time_days}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base transition-all duration-200 ${
                        errors.delivery_time_days 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-200 hover:border-gray-300 focus:border-purple-500'
                      }`}
                      placeholder="e.g., 7"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.delivery_time_days && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      {errors.delivery_time_days}
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

                {errors.image_urls && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    {errors.image_urls}
                  </p>
                )}

                {/* Image Previews */}
                {(imagePreviews.length > 0 || formData.image_urls.length > 0) && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Uploaded Images ({imagePreviews.length + formData.image_urls.length}/10)
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
                            onClick={() => handleRemoveImage(index, !preview.startsWith('data:'))}
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
                          {formData.is_active ? 'Publish Service' : 'Save as Draft'}
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