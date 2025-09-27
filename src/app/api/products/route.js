import { NextResponse } from "next/server";
import { allProducts } from "../../data/products";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (!category || !allProducts[category]) {
    return NextResponse.json({ products: [], error: "Invalid or missing category" }, { status: 400 });
  }

  // Basic server-side filtering support (optional)
  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || Number.MAX_SAFE_INTEGER);

  // Convert CSV filters like material=Fabric,Leather
  const filterKeys = ["material", "color", "style", "seats", "size", "pieces", "type"];
  const activeFilters = {};
  filterKeys.forEach((key) => {
    const value = searchParams.get(key);
    if (value) activeFilters[key] = value.split(",");
  });

  let products = [...(allProducts[category] || [])];

  // Apply price filter
  products = products.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  // Apply attribute filters
  Object.keys(activeFilters).forEach((key) => {
    const values = activeFilters[key];
    products = products.filter((p) => values.includes(String(p[key])));
  });

  return NextResponse.json({ products });
}


