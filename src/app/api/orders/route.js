import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// GET /api/orders - Get user's orders
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const whereClause = { userId };
    if (status) {
      whereClause.status = status;
    }

    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        orderItems: {
          include: {
            product: true
          }
        },
        shippingAddress: true,
        billingAddress: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/orders - Create new order
export async function POST(request) {
  try {
    const {
      userId,
      cartItems,
      shippingAddress,
      billingAddress,
      paymentMethod = 'COD'
    } = await request.json();

    if (!userId || !cartItems || !shippingAddress) {
      return NextResponse.json({ 
        error: 'User ID, cart items, and shipping address are required' 
      }, { status: 400 });
    }

    // Calculate total amount
    let totalAmount = 0;
    const orderItems = [];

    for (const cartItem of cartItems) {
      const product = await prisma.product.findUnique({
        where: { id: cartItem.productId }
      });

      if (!product) {
        return NextResponse.json({ 
          error: `Product with ID ${cartItem.productId} not found` 
        }, { status: 404 });
      }

      if (!product.inStock || product.stockCount < cartItem.quantity) {
        return NextResponse.json({ 
          error: `Product ${product.name} is out of stock` 
        }, { status: 400 });
      }

      const itemTotal = product.price * cartItem.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        price: product.price
      });
    }

    // Generate order number
    const orderNumber = `FURNIQ-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId,
        orderNumber,
        totalAmount,
        paymentMethod,
        orderItems: {
          create: orderItems
        },
        shippingAddress: {
          create: {
            userId,
            type: 'SHIPPING',
            ...shippingAddress
          }
        },
        billingAddress: billingAddress ? {
          create: {
            userId,
            type: 'BILLING',
            ...billingAddress
          }
        } : undefined
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        },
        shippingAddress: true,
        billingAddress: true
      }
    });

    // Update product stock
    for (const item of orderItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stockCount: {
            decrement: item.quantity
          }
        }
      });
    }

    // Clear user's cart
    await prisma.cartItem.deleteMany({
      where: { userId }
    });

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      order
    }, { status: 201 });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
