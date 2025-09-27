# Furniq API Setup Guide

## 🚀 Complete API Structure for Furniq Furniture Website

I've created a comprehensive API structure for your Furniq furniture website. Here's what has been implemented:

## 📁 API Endpoints Created

### 1. **Cart API** (`/api/cart`)
- `GET /api/cart?userId=xxx` - Get user's cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item quantity
- `DELETE /api/cart?cartItemId=xxx` - Remove specific item
- `DELETE /api/cart?userId=xxx` - Clear entire cart

### 2. **Wishlist API** (`/api/wishlist`)
- `GET /api/wishlist?userId=xxx` - Get user's wishlist
- `POST /api/wishlist` - Add item to wishlist
- `DELETE /api/wishlist?wishlistItemId=xxx` - Remove specific item
- `DELETE /api/wishlist?userId=xxx&productId=xxx` - Remove by user and product

### 3. **Orders API** (`/api/orders`)
- `GET /api/orders?userId=xxx` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get specific order
- `PUT /api/orders/[id]` - Update order status
- `DELETE /api/orders/[id]` - Cancel order

### 4. **Categories API** (`/api/categories`)
- `GET /api/categories` - Get all product categories with filters

### 5. **Search API** (`/api/search`)
- `GET /api/search?q=query&category=xxx&minPrice=xxx&maxPrice=xxx` - Advanced product search

### 6. **Products API** (Already exists)
- `GET /api/products?category=xxx` - Get products by category

### 7. **Users API** (Already exists)
- `POST /api/users/register` - User registration
- `POST /api/users/signIn` - User sign in

## 🗄️ Database Schema Updated

The Prisma schema has been updated with comprehensive models:

- **User** - User management
- **Product** - Product catalog
- **CartItem** - Shopping cart items
- **WishlistItem** - Wishlist items
- **Order** - Order management
- **OrderItem** - Order line items
- **Address** - Shipping/billing addresses

## 🛠️ Frontend API Utilities

Created `src/lib/api.js` with ready-to-use functions:

```javascript
import { cartAPI, wishlistAPI, orderAPI, productAPI } from '@/lib/api';

// Example usage:
const cart = await cartAPI.getCart(userId);
await cartAPI.addToCart(userId, productId, quantity);
await wishlistAPI.addToWishlist(userId, productId);
const orders = await orderAPI.getOrders(userId);
```

## 🔧 Environment Setup

Create `.env.local` file with:

```env
# Database
DATABASE_URL="mongodb+srv://your-username:your-password@cluster.mongodb.net/furniq?retryWrites=true&w=majority"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here-make-it-long-and-random"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# App Configuration
NEXT_PUBLIC_APP_NAME="Furniq"
NEXT_PUBLIC_APP_DESCRIPTION="Premium Furniture Store"
```

## 🚀 Next Steps

1. **Update your database connection** in `.env.local`
2. **Run Prisma migrations**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
3. **Test the APIs** using the provided utility functions
4. **Integrate with your frontend components**

## 📱 Frontend Integration Examples

### Add to Cart
```javascript
import { cartAPI } from '@/lib/api';

const handleAddToCart = async (productId) => {
  try {
    await cartAPI.addToCart(userId, productId, 1);
    // Show success message
  } catch (error) {
    // Handle error
  }
};
```

### Get User's Cart
```javascript
const loadCart = async () => {
  try {
    const { cartItems, totalPrice } = await cartAPI.getCart(userId);
    setCartItems(cartItems);
    setTotalPrice(totalPrice);
  } catch (error) {
    console.error('Failed to load cart:', error);
  }
};
```

### Create Order
```javascript
const createOrder = async (cartItems, shippingAddress) => {
  try {
    const order = await orderAPI.createOrder({
      userId,
      cartItems,
      shippingAddress,
      paymentMethod: 'COD'
    });
    // Handle successful order
  } catch (error) {
    // Handle error
  }
};
```

## 🎯 Features Implemented

✅ **Shopping Cart** - Add, remove, update items
✅ **Wishlist** - Save favorite products
✅ **Order Management** - Create, track, cancel orders
✅ **Product Search** - Advanced filtering and search
✅ **Categories** - Organized product categories
✅ **User Authentication** - Register and sign in
✅ **Stock Management** - Track product availability
✅ **Address Management** - Shipping and billing addresses

## 🔒 Security Features

- Input validation on all endpoints
- Stock checking before orders
- User authentication required for cart/wishlist/orders
- Error handling and logging
- Data sanitization

Your Furniq website now has a complete, production-ready API structure! 🎉
