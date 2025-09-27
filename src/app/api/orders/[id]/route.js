import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// GET /api/orders/[id] - Get specific order
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            product: true
          }
        },
        shippingAddress: true,
        billingAddress: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Get order error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT /api/orders/[id] - Update order status
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { status, paymentStatus } = await request.json();

    if (!status && !paymentStatus) {
      return NextResponse.json({ 
        error: 'Status or payment status is required' 
      }, { status: 400 });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: updateData,
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

    return NextResponse.json({
      success: true,
      message: 'Order updated successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/orders/[id] - Cancel order
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: true
      }
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.status === 'DELIVERED' || order.status === 'SHIPPED') {
      return NextResponse.json({ 
        error: 'Cannot cancel order that has been shipped or delivered' 
      }, { status: 400 });
    }

    // Restore product stock
    for (const item of order.orderItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stockCount: {
            increment: item.quantity
          }
        }
      });
    }

    // Update order status to cancelled
    await prisma.order.update({
      where: { id },
      data: { 
        status: 'CANCELLED',
        paymentStatus: 'REFUNDED'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Order cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
