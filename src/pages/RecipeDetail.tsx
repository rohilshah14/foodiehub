import { useEffect } from "react";
import { useRoute, Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Heart, ShoppingCart, Clock, ChefHat, Users, Flame,
  ArrowLeft, Star, Loader2, CheckCircle2, UtensilsCrossed
} from "lucide-react";
import { toast } from "sonner";
import { useRecipe, useRecipesByTag } from "@/hooks/use-recipes";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "@/components/shared/RecipeCard";
import { cn } from "@/lib/utils";

export default function RecipeDetail() {
  const [, params] = useRoute("/recipe/:id");
  const id = params?.id;

  const { data: recipe, isLoading, error } = useRecipe(id || "");
  const { data: relatedData } = useRecipesByTag(recipe?.tags[0] || "", 4);
  const [, setLocation] = useLocation();

  const isFav = useStore((state) => recipe ? state.isFavorite(recipe.id) : false);
  const addFavorite = useStore((state) => state.addFavorite);
  const removeFavorite = useStore((state) => state.removeFavorite);
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    if (recipe) document.title = `${recipe.name} | FoodieHub`;
    window.scrollTo(0, 0);
  }, [recipe]);

  function handleToggleFav() {
    if (!recipe) return;
    if (isFav) {
      removeFavorite(recipe.id);
      toast("Removed from favourites", { description: recipe.name, icon: "💔" });
    } else {
      addFavorite(recipe);
      toast("Added to favourites!", { description: recipe.name, icon: "❤️" });
    }
  }

  function handleAddToCart() {
    if (!recipe) return;
    addToCart(recipe);
    toast("Added to cart!", { description: recipe.name, icon: "🛒" });
  }

  function handleProcessToCook() {
    if (!recipe) return;
    toast.success("Processing your order...", { icon: "🍴" });
    setTimeout(() => setLocation(`/thank-you/${recipe.id}`), 600);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
        <h1 className="text-4xl font-display font-bold mb-4">Recipe not found</h1>
        <p className="text-muted-foreground mb-8">We couldn't find the recipe you're looking for.</p>
        <Link href="/">
          <Button size="lg"><ArrowLeft className="mr-2 w-5 h-5" /> Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative h-[60vh] min-h-[400px] w-full bg-muted">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 max-w-7xl mx-auto">
          <Link href="/">
            <Button variant="glass" size="icon" className="rounded-full w-12 h-12">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <Button
            variant="glass"
            size="icon"
            onClick={handleToggleFav}
            className="rounded-full w-12 h-12"
          >
            <Heart className={cn("w-6 h-6", isFav ? "fill-red-500 text-red-500" : "text-foreground")} />
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-primary text-white text-sm font-bold px-4 py-1.5 rounded-full">
                {recipe.cuisine}
              </span>
              <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                {recipe.rating} ({recipe.reviewCount} reviews)
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 drop-shadow-md">
              {recipe.name}
            </h1>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2"><Clock className="w-5 h-5" /> {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</div>
              <div className="flex items-center gap-2"><Users className="w-5 h-5" /> {recipe.servings} Servings</div>
              <div className="flex items-center gap-2"><ChefHat className="w-5 h-5" /> {recipe.difficulty}</div>
              <div className="flex items-center gap-2"><Flame className="w-5 h-5" /> {recipe.caloriesPerServing} kcal</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-border/50 p-6 md:p-10 mb-16">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-10 pb-10 border-b border-border">
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map(tag => (
                <span key={tag} className="bg-secondary text-secondary-foreground text-sm px-4 py-1.5 rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="flex-1 md:w-auto rounded-xl text-base"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                className="flex-1 md:w-auto rounded-xl text-base bg-green-600 hover:bg-green-700 text-white shadow-green-200 shadow-md"
                onClick={handleProcessToCook}
              >
                <UtensilsCrossed className="w-5 h-5 mr-2" />
                Process to Cook
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="col-span-1">
              <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                Ingredients
                <span className="text-sm font-sans font-normal text-muted-foreground bg-muted px-3 py-1 rounded-full ml-auto">
                  {recipe.ingredients.length} items
                </span>
              </h3>
              <ul className="space-y-4">
                {recipe.ingredients.map((ingredient, i) => (
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground leading-relaxed">{ingredient}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="col-span-1 lg:col-span-2">
              <h3 className="text-2xl font-display font-bold mb-6">Instructions</h3>
              <div className="space-y-8">
                {recipe.instructions.map((step, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={i}
                    className="flex gap-5 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary text-primary font-bold flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                      {i + 1}
                    </div>
                    <p className="text-lg text-foreground/80 leading-relaxed pt-1.5">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {relatedData && relatedData.recipes.length > 1 && (
          <div className="mt-20">
            <h3 className="text-3xl font-display font-bold mb-8">More {recipe.cuisine} Recipes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedData.recipes.filter(r => r.id !== recipe.id).slice(0, 4).map((related) => (
                <RecipeCard key={related.id} recipe={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
