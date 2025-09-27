import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// GET /api/wishlist - Get user's wishlist
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const wishlistItems = await prisma.wishlistItem.findMany({
      where: { userId },
      include: {
        product: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      wishlistItems,
      totalItems: wishlistItems.length
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/wishlist - Add item to wishlist
export async function POST(request) {
  try {
    const { userId, productId } = await request.json();

    if (!userId || !productId) {
      return NextResponse.json({ error: 'User ID and Product ID are required' }, { status: 400 });
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check if item already exists in wishlist
    const existingItem = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    });

    if (existingItem) {
      return NextResponse.json({ error: 'Item already in wishlist' }, { status: 409 });
    }

    // Add to wishlist
    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        userId,
        productId
      },
      include: { product: true }
    });

    return NextResponse.json({
      success: true,
      message: 'Item added to wishlist',
      wishlistItem
    }, { status: 201 });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/wishlist - Remove item from wishlist
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const wishlistItemId = searchParams.get('wishlistItemId');
    const userId = searchParams.get('userId');
    const productId = searchParams.get('productId');

    if (wishlistItemId) {
      // Remove specific item by wishlist item ID
      await prisma.wishlistItem.delete({
        where: { id: wishlistItemId }
      });

      return NextResponse.json({
        success: true,
        message: 'Item removed from wishlist'
      });
    } else if (userId && productId) {
      // Remove specific item by user and product ID
      await prisma.wishlistItem.deleteMany({
        where: {
          userId,
          productId
        }
      });

      return NextResponse.json({
        success: true,
        message: 'Item removed from wishlist'
      });
    } else if (userId) {
      // Clear entire wishlist
      await prisma.wishlistItem.deleteMany({
        where: { userId }
      });

      return NextResponse.json({
        success: true,
        message: 'Wishlist cleared'
      });
    } else {
      return NextResponse.json({ error: 'Valid parameters are required' }, { status: 400 });
    }
  } catch (error) {
    console.error('Delete wishlist error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
