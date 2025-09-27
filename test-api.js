// Simple API test script for Furniq
// Run this with: node test-api.js

const API_BASE = 'http://localhost:3000/api';

async function testAPI() {
  console.log('🧪 Testing Furniq APIs...\n');

  try {
    // Test 1: Get categories
    console.log('1. Testing Categories API...');
    const categoriesResponse = await fetch(`${API_BASE}/categories`);
    const categories = await categoriesResponse.json();
    console.log('✅ Categories API working:', categories.success ? 'SUCCESS' : 'FAILED');
    console.log('   Categories found:', categories.categories?.length || 0);

    // Test 2: Get products
    console.log('\n2. Testing Products API...');
    const productsResponse = await fetch(`${API_BASE}/products?category=sofas`);
    const products = await productsResponse.json();
    console.log('✅ Products API working:', products.products ? 'SUCCESS' : 'FAILED');
    console.log('   Products found:', products.products?.length || 0);

    // Test 3: Search products
    console.log('\n3. Testing Search API...');
    const searchResponse = await fetch(`${API_BASE}/search?q=sofa&limit=5`);
    const search = await searchResponse.json();
    console.log('✅ Search API working:', search.success ? 'SUCCESS' : 'FAILED');
    console.log('   Search results:', search.products?.length || 0);

    console.log('\n🎉 API tests completed!');
    console.log('\n📋 Next steps:');
    console.log('1. Update DATABASE_URL in .env.local with your MongoDB connection');
    console.log('2. Run: npx prisma db push');
    console.log('3. Start your Next.js app: npm run dev');
    console.log('4. Test the APIs in your browser or frontend');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('\n💡 Make sure your Next.js app is running on localhost:3000');
  }
}

// Run the test
testAPI();
