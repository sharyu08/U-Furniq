import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// GET /api/cart - Get user's cart items
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true
      },
      orderBy: { createdAt: 'desc' }
    });

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return NextResponse.json({
      success: true,
      cartItems,
      totalItems,
      totalPrice
    });
  } catch (error) {
    console.error('Get cart error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/cart - Add item to cart
export async function POST(request) {
  try {
    const { userId, productId, quantity = 1 } = await request.json();

    if (!userId || !productId) {
      return NextResponse.json({ error: 'User ID and Product ID are required' }, { status: 400 });
    }

    // Check if product exists and is in stock
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (!product.inStock || product.stockCount < quantity) {
      return NextResponse.json({ error: 'Product is out of stock' }, { status: 400 });
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    });

    if (existingItem) {
      // Update quantity
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: { product: true }
      });

      return NextResponse.json({
        success: true,
        message: 'Cart item updated',
        cartItem: updatedItem
      });
    } else {
      // Create new cart item
      const newItem = await prisma.cartItem.create({
        data: {
          userId,
          productId,
          quantity
        },
        include: { product: true }
      });

      return NextResponse.json({
        success: true,
        message: 'Item added to cart',
        cartItem: newItem
      }, { status: 201 });
    }
  } catch (error) {
    console.error('Add to cart error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT /api/cart - Update cart item quantity
export async function PUT(request) {
  try {
    const { cartItemId, quantity } = await request.json();

    if (!cartItemId || quantity < 0) {
      return NextResponse.json({ error: 'Valid cart item ID and quantity are required' }, { status: 400 });
    }

    if (quantity === 0) {
      // Remove item from cart
      await prisma.cartItem.delete({
        where: { id: cartItemId }
      });

      return NextResponse.json({
        success: true,
        message: 'Item removed from cart'
      });
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
      include: { product: true }
    });

    return NextResponse.json({
      success: true,
      message: 'Cart item updated',
      cartItem: updatedItem
    });
  } catch (error) {
    console.error('Update cart error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/cart - Remove item from cart
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cartItemId = searchParams.get('cartItemId');
    const userId = searchParams.get('userId');

    if (cartItemId) {
      // Remove specific item
      await prisma.cartItem.delete({
        where: { id: cartItemId }
      });

      return NextResponse.json({
        success: true,
        message: 'Item removed from cart'
      });
    } else if (userId) {
      // Clear entire cart
      await prisma.cartItem.deleteMany({
        where: { userId }
      });

      return NextResponse.json({
        success: true,
        message: 'Cart cleared'
      });
    } else {
      return NextResponse.json({ error: 'Cart item ID or User ID is required' }, { status: 400 });
    }
  } catch (error) {
    console.error('Delete cart error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
