import React, { useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowLeft, Trash2, ShoppingCart, Clock, ChefHat, Star } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/store/useStore";

export default function Favourites() {
  const favorites = useStore((state) => state.favorites);
  const removeFavorite = useStore((state) => state.removeFavorite);
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    document.title = "My Favourites | FoodieHub";
    window.scrollTo(0, 0);
  }, []);

  function handleRemove(id: number, name: string) {
    removeFavorite(id);
    toast("Removed from favourites", { description: name, icon: "💔" });
  }

  function handleAddToCart(recipe: (typeof favorites)[0]) {
    addToCart(recipe);
    toast("Added to cart!", { description: recipe.name, icon: "🛒" });
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link href="/">
            <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center shadow-sm">
              <Heart className="w-7 h-7 text-red-500 fill-red-500" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold text-foreground">My Favourites</h1>
              <p className="text-muted-foreground mt-1">
                {favorites.length} {favorites.length === 1 ? "recipe" : "recipes"} saved
              </p>
            </div>
          </div>
        </motion.div>

        {favorites.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-28 h-28 rounded-full bg-red-50 flex items-center justify-center mb-6 shadow-inner">
              <Heart className="w-14 h-14 text-red-200" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">No favourites yet</h2>
            <p className="text-muted-foreground max-w-sm mb-8">
              Start exploring recipes and tap the heart icon to save your favorites here.
            </p>
            <Link href="/">
              <button className="px-8 py-3 bg-primary text-white font-semibold rounded-full shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all hover:scale-105">
                Explore Recipes
              </button>
            </Link>
          </motion.div>
        )}

        {favorites.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {favorites.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <button
                      onClick={() => handleRemove(recipe.id, recipe.name)}
                      className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md transition-all hover:scale-110 hover:bg-red-50 text-red-500"
                      title="Remove from favourites"
                    >
                      <Heart className="w-5 h-5 fill-red-500" />
                    </button>
                    <div className="absolute bottom-4 left-4 z-10 flex gap-2">
                      <span className="bg-white/90 backdrop-blur-md text-xs font-bold px-3 py-1.5 rounded-full text-foreground shadow-sm flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
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
                        <button className="w-full px-4 py-2.5 rounded-xl border-2 border-border font-semibold text-sm hover:border-primary hover:text-primary transition-colors">
                          View Recipe
                        </button>
                      </Link>
                      <button
                        onClick={() => handleAddToCart(recipe)}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
