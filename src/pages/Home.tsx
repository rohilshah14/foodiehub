import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useRecipes } from "@/hooks/use-recipes";
import { RecipeCard } from "@/components/shared/RecipeCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1600",
    title: "Discover Amazing Recipes",
    subtitle: "Explore flavors from around the world curated just for you.",
  },
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600",
    title: "Cook Like a Pro",
    subtitle: "Step-by-step instructions to master any dish with ease.",
  },
  {
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600",
    title: "Healthy & Delicious",
    subtitle: "Nourish your body without compromising on taste.",
  },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [heroIndex, setHeroIndex] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "FoodieHub - Discover Amazing Recipes";
  }, []);

  const { data: featuredData, isLoading: isLoadingFeatured } = useRecipes(8, 0);
  const { data: allRecipesData, isLoading: isLoadingAll } = useRecipes(9, 0);

  const featured = featuredData?.recipes ?? [];

  // How many cards visible at once (responsive)
  const [visibleCards, setVisibleCards] = useState(4);
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 560) setVisibleCards(1);
      else if (w < 900) setVisibleCards(2);
      else if (w < 1280) setVisibleCards(3);
      else setVisibleCards(4);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxFeaturedIndex = Math.max(0, featured.length - visibleCards);

  // Auto-advance featured slider
  useEffect(() => {
    if (featured.length === 0) return;
    const timer = setInterval(() => {
      setFeaturedIndex((i) => (i >= maxFeaturedIndex ? 0 : i + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [featured.length, maxFeaturedIndex]);

  function goPrevFeatured() {
    setFeaturedIndex((i) => Math.max(0, i - 1));
  }
  function goNextFeatured() {
    setFeaturedIndex((i) => Math.min(maxFeaturedIndex, i + 1));
  }

  const cardWidthPct = 100 / visibleCards;

  return (
    <div className="min-h-screen pb-20">
      <section className="relative h-[80vh] min-h-[600px] bg-foreground overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={HERO_SLIDES[heroIndex].image}
              alt={HERO_SLIDES[heroIndex].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${heroIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-lg"
              >
                {HERO_SLIDES[heroIndex].title}
              </motion.h1>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${heroIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-md"
              >
                {HERO_SLIDES[heroIndex].subtitle}
              </motion.p>
            </AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                size="lg"
                onClick={() => setLocation("/recipes")}
                className="rounded-full px-8 text-lg font-bold shadow-xl shadow-primary/30"
              >
                Explore Recipes
              </Button>
            </motion.div>
          </div>
        </div>
        <button
          onClick={() => setHeroIndex((i) => Math.max(0, i - 1))}
          disabled={heroIndex === 0}
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-200",
            heroIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-orange-50 hover:scale-110 cursor-pointer"
          )}
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <button
          onClick={() => setHeroIndex((i) => Math.min(HERO_SLIDES.length - 1, i + 1))}
          disabled={heroIndex === HERO_SLIDES.length - 1}
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-200",
            heroIndex === HERO_SLIDES.length - 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-orange-50 hover:scale-110 cursor-pointer"
          )}
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={cn(
                "rounded-full transition-all duration-300",
                i === heroIndex ? "w-6 h-2.5 bg-primary" : "w-2.5 h-2.5 bg-white/60 hover:bg-white"
              )}
            />
          ))}
        </div>
      </section>
      <section className="py-20 bg-secondary/30 overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-12 text-center">
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2">Editor's Choice</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Featured Recipes
            </h2>
            <div className="w-24 h-1 bg-primary mt-6 rounded-full opacity-80" />
          </div>

          {isLoadingFeatured ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={goPrevFeatured}
                disabled={featuredIndex === 0}
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-border shadow-md flex items-center justify-center transition-all duration-200",
                  featuredIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-orange-50 hover:scale-110 cursor-pointer"
                )}
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <div ref={featuredRef} className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${featuredIndex * cardWidthPct}%)` }}
                >
                  {featured.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="shrink-0 px-3"
                      style={{ width: `${cardWidthPct}%` }}
                    >
                      <RecipeCard recipe={recipe} />
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={goNextFeatured}
                disabled={featuredIndex >= maxFeaturedIndex}
                className={cn(
                  "absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-border shadow-md flex items-center justify-center transition-all duration-200",
                  featuredIndex >= maxFeaturedIndex ? "opacity-40 cursor-not-allowed" : "hover:bg-orange-50 hover:scale-110 cursor-pointer"
                )}
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          )}
        </div>
      </section>
      <section id="recipes" className="py-24 bg-background scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Menu</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              All Recipes
            </h2>
          </div>

          {isLoadingAll ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allRecipesData?.recipes.map((recipe, idx) => (
                  <RecipeCard key={recipe.id} recipe={recipe} index={idx} />
                ))}
              </div>
              <div className="mt-16 flex justify-center">
                <Button size="lg" onClick={() => setLocation("/recipes")} className="rounded-full px-10">
                  View All Recipes <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
