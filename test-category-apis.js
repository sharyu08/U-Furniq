// Category-specific API test script for Furniq
// Run this with: node test-category-apis.js

const API_BASE = 'http://localhost:3001/api';

async function testCategoryAPI(category, categoryName) {
  try {
    console.log(`\n🛋️ Testing ${categoryName} API...`);
    
    const response = await fetch(`${API_BASE}/${category}`);
    const data = await response.json();
    
    if (data.success) {
      console.log(`✅ ${categoryName} API working: SUCCESS`);
      console.log(`   Products found: ${data.products?.length || 0}`);
      console.log(`   Total products: ${data.totalProducts || 0}`);
      console.log(`   Category: ${data.category}`);
      
      // Show first product as example
      if (data.products && data.products.length > 0) {
        const firstProduct = data.products[0];
        console.log(`   Example product: ${firstProduct.name}`);
        console.log(`   Price: ₹${firstProduct.price}`);
        console.log(`   Image: ${firstProduct.image1}`);
      }
      
      return true;
    } else {
      console.log(`❌ ${categoryName} API failed: ${data.error || 'Unknown error'}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${categoryName} API error: ${error.message}`);
    return false;
  }
}

async function testDynamicCategoryAPI(category) {
  try {
    console.log(`\n🔧 Testing Dynamic Category API for ${category}...`);
    
    const response = await fetch(`${API_BASE}/category/${category}`);
    const data = await response.json();
    
    if (data.success) {
      console.log(`✅ Dynamic ${category} API working: SUCCESS`);
      console.log(`   Products found: ${data.products?.length || 0}`);
      console.log(`   Total products: ${data.totalProducts || 0}`);
      return true;
    } else {
      console.log(`❌ Dynamic ${category} API failed: ${data.error || 'Unknown error'}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Dynamic ${category} API error: ${error.message}`);
    return false;
  }
}

async function testAllCategoryAPIs() {
  console.log('🧪 Testing Furniq Category-Specific APIs...\n');

  const results = {
    sofas: false,
    cookware: false,
    beds: false,
    tables: false,
    dynamic: false
  };

  // Test specific category APIs
  results.sofas = await testCategoryAPI('sofas', 'Sofas');
  results.cookware = await testCategoryAPI('cookware', 'Cookware');
  results.beds = await testCategoryAPI('beds', 'Beds');
  results.tables = await testCategoryAPI('tables', 'Tables');

  // Test dynamic category API
  results.dynamic = await testDynamicCategoryAPI('sofas');

  // Summary
  console.log('\n📊 Test Results Summary:');
  console.log('========================');
  Object.entries(results).forEach(([api, success]) => {
    console.log(`${success ? '✅' : '❌'} ${api.toUpperCase()}: ${success ? 'PASSED' : 'FAILED'}`);
  });

  const totalTests = Object.keys(results).length;
  const passedTests = Object.values(results).filter(Boolean).length;

  console.log(`\n🎯 Overall Result: ${passedTests}/${totalTests} tests passed`);

  if (passedTests === totalTests) {
    console.log('\n🎉 All category APIs are working perfectly!');
    console.log('\n📋 How to use in your frontend:');
    console.log('```javascript');
    console.log('import { productAPI } from "@/lib/api";');
    console.log('');
    console.log('// Get sofas with images');
    console.log('const sofas = await productAPI.getSofas();');
    console.log('');
    console.log('// Get cookware with images');
    console.log('const cookware = await productAPI.getCookware();');
    console.log('');
    console.log('// Get any category dynamically');
    console.log('const products = await productAPI.getCategoryProducts("beds");');
    console.log('```');
  } else {
    console.log('\n⚠️ Some APIs need attention. Make sure your Next.js app is running!');
  }

  console.log('\n🚀 Next steps:');
  console.log('1. Update your frontend components to use these APIs');
  console.log('2. When user clicks "Sofas" → use /api/sofas');
  console.log('3. When user clicks "Cookware" → use /api/cookware');
  console.log('4. Each API returns only relevant images for that category');
}

// Run the tests
testAllCategoryAPIs();
