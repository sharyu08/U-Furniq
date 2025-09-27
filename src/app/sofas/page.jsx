import CategoryListingPage from "../components/ProductCategoryPage";

export default function Page() {
  return (
    <CategoryListingPage 
      category="sofas" 
      categoryName="Sofas" 
      defaultFilters={{ style: ["Modern", "Contemporary", "Sectional", "Traditional", "Sofa Bed"] }}
    />
  );
}


