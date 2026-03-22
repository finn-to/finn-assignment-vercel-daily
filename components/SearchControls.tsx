import SearchControlsField from "@/components/SearchControlsField";
import { getCategories } from "@/lib/api/categories";

export { SearchControlsSkeleton } from "@/components/skeletons/SearchControlsSkeleton";

export default async function SearchControls() {
  const categories = await getCategories();

  return <SearchControlsField categories={categories} />;
}
