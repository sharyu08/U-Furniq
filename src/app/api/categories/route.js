import { NextResponse } from 'next/server';
import { allProducts } from '../../data/products';

// GET /api/categories - Get all product categories
export async function GET(request) {
  try {
    const categories = Object.keys(allProducts).map(category => {
      const products = allProducts[category];
      const totalProducts = products.length;
      const inStockProducts = products.filter(p => p.inStock !== false).length;
      
      // Get price range
      const prices = products.map(p => p.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      // Get unique materials, colors, styles
      const materials = [...new Set(products.map(p => p.material))];
      const colors = [...new Set(products.map(p => p.color))];
      const styles = [...new Set(products.map(p => p.style))];

      return {
        name: category,
        displayName: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
        totalProducts,
        inStockProducts,
        priceRange: {
          min: minPrice,
          max: maxPrice
        },
        filters: {
          materials,
          colors,
          styles
        },
        image: products[0]?.image1 || '/images/default-category.jpg'
      };
    });

    return NextResponse.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
