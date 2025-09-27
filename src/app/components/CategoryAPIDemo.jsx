"use client";

import React, { useState, useEffect } from 'react';
import { productAPI } from '../../lib/api';

const CategoryAPIDemo = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { key: 'sofas', name: 'Sofas', api: 'getSofas' },
    { key: 'cookware', name: 'Cookware', api: 'getCookware' },
    { key: 'beds', name: 'Beds', api: 'getBeds' },
    { key: 'tables', name: 'Tables', api: 'getTables' }
  ];

  const testCategoryAPI = async (category) => {
    setLoading(true);
    setSelectedCategory(category.key);
    
    try {
      let data;
      
      // Try new API first
      try {
        switch (category.api) {
          case 'getSofas':
            data = await productAPI.getSofas();
            break;
          case 'getCookware':
            data = await productAPI.getCookware();
            break;
          case 'getBeds':
            data = await productAPI.getBeds();
            break;
          case 'getTables':
            data = await productAPI.getTables();
            break;
          default:
            data = await productAPI.getCategoryProducts(category.key);
        }
      } catch (apiError) {
        console.log('New API failed, trying original API...');
        // Fallback to original API
        const response = await fetch(`/api/products?category=${category.key}`);
        const fallbackData = await response.json();
        data = fallbackData;
      }
      
      setResults(prev => ({
        ...prev,
        [category.key]: {
          success: true,
          products: data.products || [],
          totalProducts: data.totalProducts || data.products?.length || 0,
          category: data.category || category.key,
          timestamp: new Date().toLocaleTimeString(),
          apiUsed: data.products ? 'New API' : 'Fallback API'
        }
      }));
      
    } catch (error) {
      setResults(prev => ({
        ...prev,
        [category.key]: {
          success: false,
          error: error.message,
          timestamp: new Date().toLocaleTimeString()
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults({});
    setSelectedCategory('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        🧪 Furniq Category API Demo
      </h2>
      
      <p className="text-gray-600 mb-6">
        Click on any category to test the new category-specific APIs. 
        Each API will return only the relevant images and products for that category.
      </p>

      {/* Category Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => testCategoryAPI(category)}
            disabled={loading}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedCategory === category.key
                ? 'border-[#A0937D] bg-[#A0937D] text-white'
                : 'border-gray-300 hover:border-[#A0937D] hover:bg-gray-50'
            } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">
                {category.key === 'sofas' && '🛋️'}
                {category.key === 'cookware' && '🍳'}
                {category.key === 'beds' && '🛏️'}
                {category.key === 'tables' && '🪑'}
              </div>
              <div className="font-semibold">{category.name}</div>
              <div className="text-xs opacity-75">
                {category.api}()
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A0937D] mx-auto mb-4"></div>
          <p className="text-gray-600">Testing {selectedCategory} API...</p>
        </div>
      )}

      {/* Results */}
      {Object.keys(results).length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">API Results</h3>
            <button
              onClick={clearResults}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Clear Results
            </button>
          </div>

          {Object.entries(results).map(([category, result]) => (
            <div key={category} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold capitalize">
                  {category} API Result
                </h4>
                <span className="text-sm text-gray-500">
                  {result.timestamp}
                </span>
              </div>

              {result.success ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="bg-green-50 p-3 rounded">
                      <div className="font-semibold text-green-800">Status</div>
                      <div className="text-green-600">✅ Success</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-semibold text-blue-800">Products</div>
                      <div className="text-blue-600">{result.totalProducts}</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <div className="font-semibold text-purple-800">Category</div>
                      <div className="text-purple-600">{result.category}</div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <div className="font-semibold text-yellow-800">API</div>
                      <div className="text-yellow-600">/api/{category}</div>
                    </div>
                  </div>

                  {/* Sample Products */}
                  {result.products && result.products.length > 0 && (
                    <div>
                      <h5 className="font-semibold mb-2">Sample Products (showing first 3):</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {result.products.slice(0, 3).map((product, index) => (
                          <div key={index} className="border rounded p-3 bg-gray-50">
                            <div className="font-medium text-sm">{product.name}</div>
                            <div className="text-gray-600 text-xs">₹{product.price}</div>
                            <div className="text-gray-500 text-xs">
                              {product.material} • {product.color}
                            </div>
                            <div className="text-blue-500 text-xs">
                              Image: {product.image1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-red-50 p-4 rounded">
                  <div className="font-semibold text-red-800 mb-2">❌ Error</div>
                  <div className="text-red-600">{result.error}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">💡 How to Use in Your Code:</h4>
        <pre className="text-sm text-blue-700 bg-white p-3 rounded overflow-x-auto">
{`import { productAPI } from '@/lib/api';

// Get sofas with images
const sofas = await productAPI.getSofas();

// Get cookware with images  
const cookware = await productAPI.getCookware();

// Get any category dynamically
const products = await productAPI.getCategoryProducts('beds');`}
        </pre>
      </div>
    </div>
  );
};

export default CategoryAPIDemo;
