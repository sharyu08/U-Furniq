import { NextResponse } from 'next/server';
import { allProducts } from '../../../data/products';

// GET /api/category/[category] - Get products by category with images
export async function GET(request, { params }) {
  try {
    const { category } = params;
    const { searchParams } = new URL(request.url);
    
    console.log('API: Requested category:', category);
    console.log('API: Available categories:', Object.keys(allProducts));
    
    // Check if category exists
    if (!allProducts[category]) {
      console.error('API: Category not found:', category);
      return NextResponse.json({ 
        error: 'Category not found',
        requestedCategory: category,
        availableCategories: Object.keys(allProducts)
      }, { status: 404 });
    }
    
    // Get filter parameters
    const minPrice = Number(searchParams.get('minPrice') || 0);
    const maxPrice = Number(searchParams.get('maxPrice') || Number.MAX_SAFE_INTEGER);
    const material = searchParams.get('material');
    const color = searchParams.get('color');
    const style = searchParams.get('style');
    const size = searchParams.get('size');
    const seats = searchParams.get('seats');
    const pieces = searchParams.get('pieces');
    const type = searchParams.get('type');
    const sortBy = searchParams.get('sortBy') || 'name';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    const page = Number(searchParams.get('page') || 1);
    const limit = Number(searchParams.get('limit') || 12);

    let products = [...(allProducts[category] || [])];

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
      
      // Size filter
      if (size && product.size && !product.size.toLowerCase().includes(size.toLowerCase())) return false;
      
      // Seats filter
      if (seats && product.seats && product.seats !== parseInt(seats)) return false;
      
      // Pieces filter
      if (pieces && product.pieces && product.pieces !== parseInt(pieces)) return false;
      
      // Type filter
      if (type && product.type && !product.type.toLowerCase().includes(type.toLowerCase())) return false;
      
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
    const uniqueSizes = [...new Set(products.map(p => p.size).filter(Boolean))];
    const uniqueSeats = [...new Set(products.map(p => p.seats).filter(Boolean))];
    const uniquePieces = [...new Set(products.map(p => p.pieces).filter(Boolean))];
    const uniqueTypes = [...new Set(products.map(p => p.type).filter(Boolean))];

    return NextResponse.json({
      success: true,
      category: category,
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
        sizes: uniqueSizes,
        seats: uniqueSeats,
        pieces: uniquePieces,
        types: uniqueTypes
      },
      appliedFilters: {
        priceRange: { min: minPrice, max: maxPrice },
        material,
        color,
        style,
        size,
        seats,
        pieces,
        type
      }
    });
  } catch (error) {
    console.error(`Get ${params.category} error:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
