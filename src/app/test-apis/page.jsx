import CategoryAPIDemo from "../components/CategoryAPIDemo";

export default function TestAPIsPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧪 Furniq API Testing
          </h1>
          <p className="text-lg text-gray-600">
            Test the new category-specific APIs to see only relevant images for each category
          </p>
        </div>
        
        <CategoryAPIDemo />
        
        <div className="mt-12 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">
            🎯 What This Tests:
          </h3>
          <ul className="text-yellow-700 space-y-2">
            <li>• <strong>Sofas API</strong> - Returns only sofa images and products</li>
            <li>• <strong>Cookware API</strong> - Returns only cookware images and products</li>
            <li>• <strong>Beds API</strong> - Returns only bed images and products</li>
            <li>• <strong>Tables API</strong> - Returns only table images and products</li>
            <li>• <strong>Dynamic API</strong> - Works with any category</li>
          </ul>
        </div>
        
        <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-3">
            ✅ How to Use in Your Code:
          </h3>
          <div className="bg-white p-4 rounded border">
            <pre className="text-sm text-gray-700 overflow-x-auto">
{`import { productAPI } from '@/lib/api';

// When user clicks "Sofas"
const sofas = await productAPI.getSofas();
// Returns only sofa images and products

// When user clicks "Cookware"  
const cookware = await productAPI.getCookware();
// Returns only cookware images and products

// When user clicks "Beds"
const beds = await productAPI.getBeds();
// Returns only bed images and products

// For any category dynamically
const products = await productAPI.getCategoryProducts('tables');`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
