'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  AlertCircle, 
  Eye,
  Download,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Order, orderService, formatOrderStatus, getOrderStatusColor } from '@/app/lib/orderService';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  
  const ordersPerPage = 6;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2
    }).format(price).replace('GHS', 'GH₵');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-blue-500" />;
      case 'processing':
        return <Package className="w-4 h-4 text-yellow-500" />;
      case 'confirmed':
        return <Clock className="w-4 h-4 text-[#EFE554]" />;
      case 'cancelled':
      case 'refunded':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const fetchOrders = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { orders: fetchedOrders, total } = await orderService.getUserOrders(
        user.id, 
        currentPage, 
        ordersPerPage
      );

      // Apply filters
      let filteredOrders = fetchedOrders;

      if (searchTerm) {
        filteredOrders = filteredOrders.filter(order => 
          order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.items?.some(item => 
            item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }

      if (statusFilter !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
      }

      // Apply sorting
      filteredOrders.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });

      setOrders(filteredOrders);
      setTotalPages(Math.ceil(total / ordersPerPage));
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user, currentPage, searchTerm, statusFilter, sortOrder]);

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <Package className="w-24 h-24 text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Please log in to view your orders</h1>
          <Link 
            href="/login" 
            className="text-[#EFE554] hover:underline"
          >
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Orders</h1>
          <p className="text-gray-400">Track and manage your order history</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-[#EFE554] focus:outline-none appearance-none"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Sort Order */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#EFE554] focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            {/* Results Count */}
            <div className="flex items-center text-gray-400">
              <span>{orders.length} orders found</span>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-900 rounded-lg border border-gray-800 p-6 animate-pulse">
                <div className="h-4 bg-gray-700 rounded mb-4"></div>
                <div className="h-20 bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-24 h-24 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No orders found</h2>
            <p className="text-gray-400 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : "You haven't placed any orders yet"
              }
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-[#EFE554] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#dbd348] transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {orders.map((order) => (
                <div key={order.id} className="bg-gray-900 rounded-lg border border-gray-800 p-6 hover:border-gray-700 transition-colors">
                  {/* Order Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold mb-1">#{order.order_number}</h3>
                      <p className="text-sm text-gray-400">{formatDate(order.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`text-sm font-medium capitalize ${getOrderStatusColor(order.status)}`}>
                        {formatOrderStatus(order.status)}
                      </span>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="mb-4">
                    <div className="flex gap-2 mb-3">
                      {order.items?.slice(0, 3).map((item, index) => (
                        <div key={index} className="relative h-12 w-12 flex-shrink-0">
                          <Image
                            src={item.product_image || '/placeholder-product.jpg'}
                            alt={item.product_name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      ))}
                      {(order.items?.length || 0) > 3 && (
                        <div className="h-12 w-12 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400">
                          +{(order.items?.length || 0) - 3}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">
                      {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Order Total */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total</span>
                      <span className="font-semibold text-[#EFE554]">{formatPrice(order.total)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/orders/${order.id}`}
                      className="flex-1 bg-[#EFE554] text-black py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#dbd348] transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Link>
                    <button className="bg-gray-800 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors border border-gray-700 flex items-center justify-center">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-[#EFE554] text-black'
                            : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
