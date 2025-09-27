// API utility functions for Furniq frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Generic API call function
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
}

// Product API functions
export const productAPI = {
  // Get products by category (legacy)
  getProducts: (category, filters = {}) => {
    const params = new URLSearchParams({ category, ...filters });
    return apiCall(`/products?${params}`);
  },

  // Get products by specific category with images
  getCategoryProducts: (category, filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/category/${category}?${params}`);
  },

  // Get sofas with images
  getSofas: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/sofas?${params}`);
  },

  // Get cookware with images
  getCookware: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/cookware?${params}`);
  },

  // Get beds with images
  getBeds: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/beds?${params}`);
  },

  // Get tables with images
  getTables: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/tables?${params}`);
  },

  // Search products
  searchProducts: (query, filters = {}) => {
    const params = new URLSearchParams({ q: query, ...filters });
    return apiCall(`/search?${params}`);
  },

  // Get all categories
  getCategories: () => apiCall('/categories'),
};

// Cart API functions
export const cartAPI = {
  // Get user's cart
  getCart: (userId) => apiCall(`/cart?userId=${userId}`),

  // Add item to cart
  addToCart: (userId, productId, quantity = 1) =>
    apiCall('/cart', {
      method: 'POST',
      body: JSON.stringify({ userId, productId, quantity }),
    }),

  // Update cart item quantity
  updateCartItem: (cartItemId, quantity) =>
    apiCall('/cart', {
      method: 'PUT',
      body: JSON.stringify({ cartItemId, quantity }),
    }),

  // Remove item from cart
  removeFromCart: (cartItemId) =>
    apiCall(`/cart?cartItemId=${cartItemId}`, { method: 'DELETE' }),

  // Clear entire cart
  clearCart: (userId) =>
    apiCall(`/cart?userId=${userId}`, { method: 'DELETE' }),
};

// Wishlist API functions
export const wishlistAPI = {
  // Get user's wishlist
  getWishlist: (userId) => apiCall(`/wishlist?userId=${userId}`),

  // Add item to wishlist
  addToWishlist: (userId, productId) =>
    apiCall('/wishlist', {
      method: 'POST',
      body: JSON.stringify({ userId, productId }),
    }),

  // Remove item from wishlist
  removeFromWishlist: (userId, productId) =>
    apiCall(`/wishlist?userId=${userId}&productId=${productId}`, {
      method: 'DELETE',
    }),

  // Clear entire wishlist
  clearWishlist: (userId) =>
    apiCall(`/wishlist?userId=${userId}`, { method: 'DELETE' }),
};

// Order API functions
export const orderAPI = {
  // Get user's orders
  getOrders: (userId, status = null) => {
    const params = new URLSearchParams({ userId });
    if (status) params.append('status', status);
    return apiCall(`/orders?${params}`);
  },

  // Get specific order
  getOrder: (orderId) => apiCall(`/orders/${orderId}`),

  // Create new order
  createOrder: (orderData) =>
    apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  // Update order status
  updateOrder: (orderId, updates) =>
    apiCall(`/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),

  // Cancel order
  cancelOrder: (orderId) =>
    apiCall(`/orders/${orderId}`, { method: 'DELETE' }),
};

// User API functions
export const userAPI = {
  // Register user
  register: (userData) =>
    apiCall('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  // Sign in user
  signIn: (credentials) =>
    apiCall('/users/signIn', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
};

// Utility functions
export const apiUtils = {
  // Format price for display
  formatPrice: (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  },

  // Calculate discount percentage
  calculateDiscount: (originalPrice, currentPrice) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  },

  // Generate order number
  generateOrderNumber: () => {
    return `FURNIQ-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  },

  // Validate email
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate phone number (Indian format)
  validatePhone: (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  },
};

// Export all APIs
const apiExports = {
  productAPI,
  cartAPI,
  wishlistAPI,
  orderAPI,
  userAPI,
  apiUtils,
};

export default apiExports;
