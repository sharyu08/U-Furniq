import CategoryListingPage from "../components/ProductCategoryPage";

export default function Page() {
  return (
    <CategoryListingPage 
      category="sofas" 
      categoryName="Recliners"
      defaultFilters={{ style: ["Recliner"] }}
    />
  );
}


