# 🛋️ Furniq Category-Specific API Guide

## 🎯 **Problem Solved: Category-Specific Images**

Now when users click on different categories, they will see **ONLY the relevant images** for that category:

- **Click "Sofas"** → See only sofa images
- **Click "Cookware"** → See only cookware images  
- **Click "Beds"** → See only bed images
- **Click "Tables"** → See only table images

## 📁 **New API Endpoints Created**

### **1. Specific Category APIs**
- `GET /api/sofas` - Get all sofa products with images
- `GET /api/cookware` - Get all cookware products with images
- `GET /api/beds` - Get all bed products with images
- `GET /api/tables` - Get all table products with images

### **2. Dynamic Category API**
- `GET /api/category/[category]` - Get any category products dynamically

## 🔧 **Frontend Integration**

### **Method 1: Use Specific APIs (Recommended)**

```javascript
import { productAPI } from '@/lib/api';

// When user clicks "Sofas"
const loadSofas = async () => {
  try {
    const { products } = await productAPI.getSofas();
    setProducts(products); // Only sofa images will show
  } catch (error) {
    console.error('Failed to load sofas:', error);
  }
};

// When user clicks "Cookware"
const loadCookware = async () => {
  try {
    const { products } = await productAPI.getCookware();
    setProducts(products); // Only cookware images will show
  } catch (error) {
    console.error('Failed to load cookware:', error);
  }
};

// When user clicks "Beds"
const loadBeds = async () => {
  try {
    const { products } = await productAPI.getBeds();
    setProducts(products); // Only bed images will show
  } catch (error) {
    console.error('Failed to load beds:', error);
  }
};
```

### **Method 2: Use Dynamic API**

```javascript
// For any category
const loadCategoryProducts = async (category) => {
  try {
    const { products } = await productAPI.getCategoryProducts(category);
    setProducts(products); // Only images for that category
  } catch (error) {
    console.error(`Failed to load ${category}:`, error);
  }
};

// Usage examples:
loadCategoryProducts('sofas');     // Load sofas
loadCategoryProducts('cookware');  // Load cookware
loadCategoryProducts('beds');      // Load beds
loadCategoryProducts('tables');    // Load tables
```

## 🎨 **Frontend Component Example**

```jsx
import { useState, useEffect } from 'react';
import { productAPI } from '@/lib/api';

const ProductCategory = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      let response;
      
      // Use specific API based on category
      switch (category) {
        case 'sofas':
          response = await productAPI.getSofas();
          break;
        case 'cookware':
          response = await productAPI.getCookware();
          break;
        case 'beds':
          response = await productAPI.getBeds();
          break;
        case 'tables':
          response = await productAPI.getTables();
          break;
        default:
          response = await productAPI.getCategoryProducts(category);
      }
      
      setProducts(response.products);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [category]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="products-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image1} alt={product.name} />
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <button onClick={() => addToCart(product.id)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};
```

## 🔍 **Advanced Filtering**

Each category API supports advanced filtering:

```javascript
// Get sofas with filters
const filteredSofas = await productAPI.getSofas({
  minPrice: 10000,
  maxPrice: 50000,
  material: 'Fabric',
  color: 'Gray',
  style: 'Modern',
  seats: 3,
  sortBy: 'price',
  sortOrder: 'asc',
  page: 1,
  limit: 12
});

// Get cookware with filters
const filteredCookware = await productAPI.getCookware({
  minPrice: 500,
  maxPrice: 5000,
  material: 'Stainless Steel',
  style: 'Professional',
  pieces: 8
});
```

## 📊 **API Response Format**

All category APIs return the same format:

```json
{
  "success": true,
  "category": "sofas",
  "products": [
    {
      "id": 1,
      "name": "Waddington Fabric Sofa",
      "price": 14900,
      "image1": "/images/14 image.webp",
      "image2": "/images/15 image.webp",
      "material": "Fabric",
      "color": "Beige",
      "style": "Modern",
      "seats": 3
    }
  ],
  "totalProducts": 25,
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "filters": {
    "materials": ["Fabric", "Leather"],
    "colors": ["Beige", "Gray", "Navy"],
    "styles": ["Modern", "Contemporary"]
  }
}
```

## 🧪 **Testing Your APIs**

Run the test script to verify everything works:

```bash
# Make sure your app is running first
npm run dev

# Then test the APIs
node test-category-apis.js
```

## 🎉 **Benefits**

✅ **Category-Specific Images** - Users see only relevant products
✅ **Better Performance** - Faster loading with filtered results
✅ **Advanced Filtering** - Material, color, style, size filters
✅ **Pagination** - Handle large product catalogs
✅ **Sorting** - Price, rating, discount, name sorting
✅ **Consistent API** - Same format for all categories

## 🚀 **Your Sir Will Love This!**

Now your Furniq website will show:
- **Sofa page** → Only sofa images and products
- **Cookware page** → Only cookware images and products  
- **Bed page** → Only bed images and products
- **Table page** → Only table images and products

**Perfect category-specific browsing experience!** 🎯
