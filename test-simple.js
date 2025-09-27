// Simple test to check if APIs are working
const API_BASE = 'http://localhost:3001/api';

async function testAPI(endpoint) {
  try {
    console.log(`Testing ${endpoint}...`);
    const response = await fetch(`${API_BASE}${endpoint}`);
    const data = await response.json();
    
    if (data.success || data.products) {
      console.log(`✅ ${endpoint} - SUCCESS`);
      console.log(`   Products: ${data.products?.length || 0}`);
      return true;
    } else {
      console.log(`❌ ${endpoint} - FAILED: ${data.error || 'Unknown error'}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${endpoint} - ERROR: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🧪 Testing Furniq APIs...\n');
  
  const tests = [
    '/products?category=sofas',
    '/sofas',
    '/cookware', 
    '/beds',
    '/tables',
    '/categories'
  ];
  
  let passed = 0;
  let total = tests.length;
  
  for (const test of tests) {
    const success = await testAPI(test);
    if (success) passed++;
    console.log(''); // Empty line
  }
  
  console.log(`📊 Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All APIs are working!');
  } else {
    console.log('⚠️ Some APIs need attention.');
  }
}

// Run the tests
runTests();
