import { NextResponse } from 'next/server';
import { allProducts } from '../../data/products';

// GET /api/sofas - Get all sofa products with images
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get filter parameters
    const minPrice = Number(searchParams.get('minPrice') || 0);
    const maxPrice = Number(searchParams.get('maxPrice') || Number.MAX_SAFE_INTEGER);
    const material = searchParams.get('material');
    const color = searchParams.get('color');
    const style = searchParams.get('style');
    const seats = searchParams.get('seats');
    const sortBy = searchParams.get('sortBy') || 'name';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    const page = Number(searchParams.get('page') || 1);
    const limit = Number(searchParams.get('limit') || 12);

    let products = [...(allProducts.sofas || [])];

    // Apply filters
    products = products.filter(product => {
      // Price filter
      if (product.price < minPrice || product.price > maxPrice) return false;
      
      // Material filter
      if (material && !product.material.toLowerCase().includes(material.toLowerCase())) return false;
      
      // Color filter
      if (color && !product.color.toLowerCase().includes(color.toLowerCase())) return false;
      
      // Style filter
      if (style && !product.style.toLowerCase().includes(style.toLowerCase())) return false;
      
      // Seats filter
      if (seats && product.seats !== parseInt(seats)) return false;
      
      return true;
    });

    // Apply sorting
    products.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating || 0;
          bValue = b.rating || 0;
          break;
        case 'discount':
          aValue = a.discount || 0;
          bValue = b.discount || 0;
          break;
        case 'name':
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
      }

      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });

    // Apply pagination
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);

    // Get unique filter options from results
    const uniqueMaterials = [...new Set(products.map(p => p.material))];
    const uniqueColors = [...new Set(products.map(p => p.color))];
    const uniqueStyles = [...new Set(products.map(p => p.style))];
    const uniqueSeats = [...new Set(products.map(p => p.seats))];

    return NextResponse.json({
      success: true,
      category: 'sofas',
      products: paginatedProducts,
      totalProducts,
      pagination: {
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      filters: {
        materials: uniqueMaterials,
        colors: uniqueColors,
        styles: uniqueStyles,
        seats: uniqueSeats
      },
      appliedFilters: {
        priceRange: { min: minPrice, max: maxPrice },
        material,
        color,
        style,
        seats
      }
    });
  } catch (error) {
    console.error('Get sofas error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
