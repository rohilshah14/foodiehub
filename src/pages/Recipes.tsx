import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, ChevronLeft, ChevronRight, Loader2, SlidersHorizontal, X } from "lucide-react";
import { RecipeCard } from "@/components/shared/RecipeCard";
import { Button } from "@/components/ui/button";
import { useRecipes } from "@/hooks/use-recipes";
import { cn } from "@/lib/utils";
import { type Recipe } from "@/types/recipe";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const PAGE_SIZE = 9;

const CUISINES = ["All", "Italian", "Asian", "American", "Mexican", "Indian", "Mediterranean", "Japanese", "Thai", "Greek"];
const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];
const MEAL_TYPES = ["All", "Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];
const SORT_OPTIONS = [
  { label: "Rating (High–Low)", value: "rating" },
  { label: "Time (Low–High)", value: "time" },
  { label: "Name (A–Z)", value: "name" },
];

export default function Recipes() {
  useEffect(() => {
    document.title = "All Recipes — FoodieHub";
  }, []);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [cuisine, setCuisine] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [mealType, setMealType] = useState("All");
  const [sort, setSort] = useState("rating");

  const skip = (page - 1) * PAGE_SIZE;

  // Normal paginated fetch
  const { data: pageData, isLoading: isLoadingPage } = useRecipes(PAGE_SIZE, skip);

  // Search fetch — only active when search query is set
  const { data: searchData, isLoading: isLoadingSearch } = useQuery({
    queryKey: ["recipes", "search", search],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(search)}`);
      if (!res.ok) throw new Error("Search failed");
      return res.json() as Promise<{ recipes: Recipe[]; total: number }>;
    },
    enabled: search.trim().length > 0,
  });

  const isSearchMode = search.trim().length > 0;
  const isLoading = isSearchMode ? isLoadingSearch : isLoadingPage;

  const rawRecipes: Recipe[] = isSearchMode
    ? (searchData?.recipes ?? [])
    : (pageData?.recipes ?? []);

  const total = isSearchMode ? (searchData?.total ?? 0) : (pageData?.total ?? 0);
  const totalPages = isSearchMode ? 1 : Math.ceil(total / PAGE_SIZE);

  // Client-side filter + sort
  const filtered = rawRecipes
    .filter((r) => cuisine === "All" || r.cuisine === cuisine)
    .filter((r) => difficulty === "All" || r.difficulty === difficulty)
    .filter((r) => mealType === "All" || (r.mealType && r.mealType.includes(mealType)))
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "time") return (a.prepTimeMinutes + a.cookTimeMinutes) - (b.prepTimeMinutes + b.cookTimeMinutes);
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  }

  function handleClearSearch() {
    setSearch("");
    setSearchInput("");
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Browse</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">All Recipes</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our full collection of recipes from around the world.
          </p>
        </div>
        <form onSubmit={handleSearch} className="mb-8 flex gap-3 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search recipes..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
            />
          </div>
          <Button type="submit" className="rounded-full px-6">Search</Button>
          {isSearchMode && (
            <Button type="button" variant="outline" className="rounded-full px-4" onClick={handleClearSearch}>
              Clear
            </Button>
          )}
        </form>
        <div className="mb-10 bg-white border border-border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              Filters &amp; Sort
            </div>
            {(cuisine !== "All" || difficulty !== "All" || mealType !== "All" || sort !== "rating") && (
              <button
                type="button"
                onClick={() => { setCuisine("All"); setDifficulty("All"); setMealType("All"); setSort("rating"); setPage(1); }}
                className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary border border-border hover:border-primary rounded-full px-3 py-1.5 transition-all"
              >
                <X className="w-3.5 h-3.5" />
                Clear Filters
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Cuisine</label>
              <select
                value={cuisine}
                onChange={(e) => { setCuisine(e.target.value); setPage(1); }}
                className="w-full px-3 py-2 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {CUISINES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Difficulty</label>
              <div className="flex gap-2">
                {DIFFICULTIES.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => { setDifficulty(d); setPage(1); }}
                    className={cn(
                      "flex-1 py-2 rounded-xl text-xs font-semibold border transition-all",
                      difficulty === d
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-foreground/70 border-border hover:border-primary hover:text-primary"
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Meal Type</label>
              <select
                value={mealType}
                onChange={(e) => { setMealType(e.target.value); setPage(1); }}
                className="w-full px-3 py-2 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {MEAL_TYPES.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Sort By</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>
        {!isLoading && (
          <div className="mb-6 text-sm text-muted-foreground">
            {isSearchMode
              ? `Showing ${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${search}"`
              : `Showing ${skip + 1}–${Math.min(skip + PAGE_SIZE, total)} of ${total} recipes — Page ${page} of ${totalPages}`
            }
          </div>
        )}
        {isLoading ? (
          <div className="flex justify-center py-32">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-2xl font-display font-bold text-foreground mb-2">No recipes found</p>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((recipe, idx) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={idx} />
            ))}
          </div>
        )}
        {!isSearchMode && totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border transition-all",
                page === 1
                  ? "opacity-40 cursor-not-allowed border-border"
                  : "border-border hover:border-primary hover:text-primary"
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  "w-10 h-10 rounded-full text-sm font-semibold border transition-all",
                  p === page
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/30"
                    : "border-border text-foreground/70 hover:border-primary hover:text-primary"
                )}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border transition-all",
                page === totalPages
                  ? "opacity-40 cursor-not-allowed border-border"
                  : "border-border hover:border-primary hover:text-primary"
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
