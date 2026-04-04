import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Heart, Clock, Star, ChefHat } from "lucide-react";
import { toast } from "sonner";
import { Recipe } from "@/types/recipe";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RecipeCardProps {
  recipe: Recipe;
  index?: number;
}

export function RecipeCard({ recipe, index = 0 }: RecipeCardProps) {
  const isFav = useStore((state) => state.isFavorite(recipe.id));
  const addFavorite = useStore((state) => state.addFavorite);
  const removeFavorite = useStore((state) => state.removeFavorite);
  const addToCart = useStore((state) => state.addToCart);

  function handleToggleFav(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (isFav) {
      removeFavorite(recipe.id);
      toast("Removed from favourites", {
        description: recipe.name,
        icon: "💔",
      });
    } else {
      addFavorite(recipe);
      toast("Added to favourites!", {
        description: recipe.name,
        icon: "❤️",
      });
    }
  }

  function handleAddToCart() {
    addToCart(recipe);
    toast("Added to cart!", {
      description: recipe.name,
      icon: "🛒",
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={handleToggleFav}
            className={cn(
              "w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110",
              isFav ? "text-red-500" : "text-foreground/60 hover:text-red-500"
            )}
          >
            <Heart className={cn("w-5 h-5", isFav && "fill-current")} />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 z-10 flex gap-2">
          <span className="bg-white/90 backdrop-blur-md text-xs font-bold px-3 py-1.5 rounded-full text-foreground shadow-sm flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-accent fill-accent" />
            {recipe.rating.toFixed(1)}
          </span>
          <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            {recipe.cuisine}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl font-bold line-clamp-1 mb-2 group-hover:text-primary transition-colors">
          {recipe.name}
        </h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ChefHat className="w-4 h-4" />
            <span>{recipe.difficulty}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-3">
          <Link href={`/recipe/${recipe.id}`} className="flex-1">
            <Button variant="outline" className="w-full rounded-xl">
              View Recipe
            </Button>
          </Link>
          <Button onClick={handleAddToCart} className="rounded-xl px-4">
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
