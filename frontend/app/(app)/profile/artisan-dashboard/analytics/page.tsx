// app/analytics/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  IndianRupee, 
  Eye, 
  Star,
  Package,
  Calendar,
  Download,
  Filter,
  MoreVertical,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    conversionRate: number;
    averageOrderValue: number;
    totalViews: number;
  };
  revenueData: {
    date: string;
    revenue: number;
    orders: number;
  }[];
  topProducts: {
    id: string;
    name: string;
    sales: number;
    revenue: number;
    stock: number;
  }[];
  trafficSources: {
    source: string;
    visitors: number;
    conversionRate: number;
  }[];
  recentOrders: {
    id: string;
    customer: string;
    product: string;
    amount: number;
    status: 'completed' | 'pending' | 'cancelled';
    date: string;
  }[];
}

const ArtisanAnalytics = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: AnalyticsData = {
        overview: {
          totalRevenue: 12540.75,
          totalOrders: 89,
          totalCustomers: 156,
          conversionRate: 3.2,
          averageOrderValue: 140.90,
          totalViews: 2780
        },
        revenueData: [
          { date: 'Jan 1', revenue: 450, orders: 4 },
          { date: 'Jan 2', revenue: 620, orders: 5 },
          { date: 'Jan 3', revenue: 380, orders: 3 },
          { date: 'Jan 4', revenue: 890, orders: 7 },
          { date: 'Jan 5', revenue: 720, orders: 6 },
          { date: 'Jan 6', revenue: 950, orders: 8 },
          { date: 'Jan 7', revenue: 1120, orders: 9 },
        ],
        topProducts: [
          { id: '1', name: 'Handcrafted Wooden Bowl', sales: 45, revenue: 2250, stock: 12 },
          { id: '2', name: 'Ceramic Coffee Mug Set', sales: 38, revenue: 1520, stock: 8 },
          { id: '3', name: 'Leather Journal', sales: 29, revenue: 1305, stock: 15 },
          { id: '4', name: 'Silver Pendant Necklace', sales: 22, revenue: 1980, stock: 5 },
          { id: '5', name: 'Wool Knitted Scarf', sales: 18, revenue: 810, stock: 20 },
        ],
        trafficSources: [
          { source: 'Direct', visitors: 1240, conversionRate: 4.2 },
          { source: 'Social Media', visitors: 890, conversionRate: 2.8 },
          { source: 'Search Engines', visitors: 650, conversionRate: 3.1 },
          { source: 'Referral', visitors: 320, conversionRate: 5.6 },
          { source: 'Email', visitors: 280, conversionRate: 6.8 },
        ],
        recentOrders: [
          { id: 'ORD-001', customer: 'Sarah Johnson', product: 'Wooden Bowl', amount: 75.00, status: 'completed', date: '2024-01-07' },
          { id: 'ORD-002', customer: 'Mike Chen', product: 'Ceramic Mug Set', amount: 45.00, status: 'completed', date: '2024-01-07' },
          { id: 'ORD-003', customer: 'Emma Davis', product: 'Leather Journal', amount: 65.00, status: 'pending', date: '2024-01-06' },
          { id: 'ORD-004', customer: 'James Wilson', product: 'Silver Necklace', amount: 120.00, status: 'completed', date: '2024-01-06' },
          { id: 'ORD-005', customer: 'Lisa Brown', product: 'Wool Scarf', amount: 55.00, status: 'cancelled', date: '2024-01-05' },
        ]
      };
      
      setAnalyticsData(mockData);
      setIsLoading(false);
    };

    fetchAnalyticsData();
  }, [timeRange]);

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    change, 
    changeType 
  }: { 
    title: string;
    value: string | number;
    icon: any;
    change?: number;
    changeType?: 'positive' | 'negative';
  }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {changeType === 'positive' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
              {Math.abs(change)}% from last period
            </div>
          )}
        </div>
        <div className="p-3 bg-indigo-50 rounded-xl">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
      </div>
    </div>
  );

  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shop Analytics</h1>
            <p className="text-gray-600 mt-2">Track your shop performance and customer insights</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={`$${analyticsData.overview.totalRevenue.toLocaleString()}`}
            icon={IndianRupee}
            change={12.5}
            changeType="positive"
          />
          <StatCard
            title="Total Orders"
            value={analyticsData.overview.totalOrders}
            icon={ShoppingCart}
            change={8.3}
            changeType="positive"
          />
          <StatCard
            title="Total Customers"
            value={analyticsData.overview.totalCustomers}
            icon={Users}
            change={15.2}
            changeType="positive"
          />
          <StatCard
            title="Conversion Rate"
            value={`${analyticsData.overview.conversionRate}%`}
            icon={TrendingUp}
            change={2.1}
            changeType="positive"
          />
          <StatCard
            title="Avg Order Value"
            value={`$${analyticsData.overview.averageOrderValue}`}
            icon={Package}
            change={-1.2}
            changeType="negative"
          />
          <StatCard
            title="Total Views"
            value={analyticsData.overview.totalViews}
            icon={Eye}
            change={22.7}
            changeType="positive"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
              <Filter className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {analyticsData.revenueData.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 w-16">{day.date}</span>
                  <div className="flex-1 mx-4">
                    <div 
                      className="bg-indigo-100 rounded-full h-3"
                      style={{ width: `${(day.revenue / 1200) * 100}%` }}
                    >
                      <div 
                        className="bg-indigo-600 rounded-full h-3 transition-all duration-500"
                        style={{ width: `${(day.revenue / 1200) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">${day.revenue}</div>
                    <div className="text-xs text-gray-500">{day.orders} orders</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {analyticsData.topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-600">{product.sales} sales</span>
                      <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">${product.revenue}</div>
                    <div className="flex items-center text-yellow-600 text-sm">
                      <Star className="w-3 h-3 fill-current mr-1" />
                      4.8
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Traffic Sources */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h3>
            <div className="space-y-4">
              {analyticsData.trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 w-24">{source.source}</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-green-500 rounded-full h-2 transition-all duration-500"
                        style={{ width: `${(source.visitors / 1500) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right w-20">
                    <div className="text-sm font-semibold text-gray-900">{source.visitors}</div>
                    <div className="text-xs text-gray-500">{source.conversionRate}% CR</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Orders</h3>
            <div className="space-y-3">
              {analyticsData.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{order.id}</span>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">${order.amount}</div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 group">
              <TrendingUp className="w-8 h-8 text-gray-400 group-hover:text-indigo-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Generate Report</span>
            </button>
            <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 group">
              <ShoppingCart className="w-8 h-8 text-gray-400 group-hover:text-indigo-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">View Orders</span>
            </button>
            <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 group">
              <Users className="w-8 h-8 text-gray-400 group-hover:text-indigo-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Customer Insights</span>
            </button>
            <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 group">
              <Package className="w-8 h-8 text-gray-400 group-hover:text-indigo-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Inventory</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanAnalytics;