import { NextResponse } from 'next/server';
import { allProducts } from '../../data/products';

// GET /api/search - Search products
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const minPrice = Number(searchParams.get('minPrice') || 0);
    const maxPrice = Number(searchParams.get('maxPrice') || Number.MAX_SAFE_INTEGER);
    const material = searchParams.get('material');
    const color = searchParams.get('color');
    const style = searchParams.get('style');
    const sortBy = searchParams.get('sortBy') || 'name';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    const page = Number(searchParams.get('page') || 1);
    const limit = Number(searchParams.get('limit') || 12);

    let products = [];

    // Get products from specific category or all categories
    if (category && allProducts[category]) {
      products = [...allProducts[category]];
    } else {
      // Search across all categories
      products = Object.values(allProducts).flat();
    }

    // Apply text search
    if (query) {
      const searchTerm = query.toLowerCase();
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.material.toLowerCase().includes(searchTerm) ||
        product.color.toLowerCase().includes(searchTerm) ||
        product.style.toLowerCase().includes(searchTerm)
      );
    }

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

    return NextResponse.json({
      success: true,
      products: paginatedProducts,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      filters: {
        materials: uniqueMaterials,
        colors: uniqueColors,
        styles: uniqueStyles
      },
      searchInfo: {
        query: query || '',
        category: category || 'all',
        appliedFilters: {
          priceRange: { min: minPrice, max: maxPrice },
          material,
          color,
          style
        }
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
