import SearchControlsField from "@/components/composite/SearchControlsField";
import { getCategories } from "@/lib/api/categories";

export { SearchControlsSkeleton } from "@/components/skeletons/SearchControlsSkeleton";

export default async function SearchControls() {
  const categories = await getCategories();

  return <SearchControlsField categories={categories} />;
}
