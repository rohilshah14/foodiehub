import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { RecipeResponseSchema, RecipeSchema, type RecipeResponse, type Recipe } from "@/types/recipe";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

function parseWithLogging<T>(schema: any, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw new Error(`Validation failed for ${label}`);
  }
  return result.data;
}

export function useRecipes(limit: number = 10, skip: number = 0) {
  return useQuery({
    queryKey: ["recipes", limit, skip],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
      if (!res.ok) throw new Error("Failed to fetch recipes");
      const data = await res.json();
      return parseWithLogging<RecipeResponse>(RecipeResponseSchema, data, "recipes.list");
    },
  });
}

export function useInfiniteRecipes(limit: number = 9) {
  return useInfiniteQuery({
    queryKey: ["recipes", "infinite"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${pageParam}`);
      if (!res.ok) throw new Error("Failed to fetch recipes");
      const data = await res.json();
      return parseWithLogging<RecipeResponse>(RecipeResponseSchema, data, "recipes.infinite");
    },
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    initialPageParam: 0,
  });
}

export function useRecipe(id: number | string) {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/${id}`);
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error("Failed to fetch recipe");
      }
      const data = await res.json();
      return parseWithLogging<Recipe>(RecipeSchema, data, `recipe.${id}`);
    },
    enabled: !!id,
  });
}

export function useRecipesByTag(tag: string, limit: number = 4) {
  return useQuery({
    queryKey: ["recipes", "tag", tag],
    queryFn: async () => {
      // DummyJSON API might not support limit on tag endpoint perfectly, but we'll try
      const res = await fetch(`${BASE_URL}/tag/${tag}`);
      if (!res.ok) throw new Error("Failed to fetch recipes by tag");
      const data = await res.json();
      const parsed = parseWithLogging<RecipeResponse>(RecipeResponseSchema, data, `recipes.tag.${tag}`);
      // Manually limit client side if api doesn't respect it on this endpoint
      return { ...parsed, recipes: parsed.recipes.slice(0, limit) };
    },
    enabled: !!tag,
  });
}
