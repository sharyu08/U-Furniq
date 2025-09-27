import CategoryListingPage from "../components/ProductCategoryPage";

export default function Page() {
  // No planters data exists yet; this will show 0 until data is added
  return (
    <CategoryListingPage category="planters" categoryName="Planters" />
  );
}


