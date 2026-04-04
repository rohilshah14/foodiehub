import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, ArrowLeft, Trash2, Plus, Minus, Clock,
  ChefHat, Star, Package, ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/store/useStore";

export default function Cart() {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateCartQuantity = useStore((state) => state.updateCartQuantity);
  const [, setLocation] = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalRecipes = cart.length;

  useEffect(() => {
    document.title = "My Cart | FoodieHub";
    window.scrollTo(0, 0);
  }, []);

  function handleRemove(id: number, name: string) {
    removeFromCart(id);
    toast("Removed from cart", { description: name, icon: "🗑️" });
  }

  function handleQuantityChange(id: number, name: string, newQty: number) {
    if (newQty <= 0) {
      removeFromCart(id);
      toast("Removed from cart", { description: name, icon: "🗑️" });
    } else {
      updateCartQuantity(id, newQty);
    }
  }

  function handleProceed() {
    if (cart.length === 0) return;
    const firstId = cart[0].recipe.id;
    toast.success("Order placed! Redirecting...", { icon: "🍴" });
    setTimeout(() => setLocation(`/thank-you/${firstId}`), 800);
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

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
            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center shadow-sm">
              <ShoppingCart className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold text-foreground">My Cart</h1>
              <p className="text-muted-foreground mt-1">
                {totalRecipes} {totalRecipes === 1 ? "recipe" : "recipes"} · {totalItems} {totalItems === 1 ? "item" : "items"} total
              </p>
            </div>
          </div>
        </motion.div>

        {cart.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-28 h-28 rounded-full bg-orange-50 flex items-center justify-center mb-6 shadow-inner">
              <ShoppingCart className="w-14 h-14 text-orange-200" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">Your cart is empty</h2>
            <p className="text-muted-foreground max-w-sm mb-8">
              Browse our collection of delicious recipes and add your favorites to the cart.
            </p>
            <Link href="/">
              <button className="px-8 py-3 bg-primary text-white font-semibold rounded-full shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all hover:scale-105">
                Browse Recipes
              </button>
            </Link>
          </motion.div>
        )}

        {cart.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-8">

            <div className="flex-1 space-y-4">
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    key={item.recipe.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.35, delay: index * 0.07 }}
                    className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-0">
                      <div className="w-32 sm:w-40 flex-shrink-0">
                        <img
                          src={item.recipe.image}
                          alt={item.recipe.name}
                          className="w-full h-full object-cover"
                          style={{ minHeight: "120px" }}
                        />
                      </div>

                      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <Link href={`/recipe/${item.recipe.id}`}>
                              <h3 className="font-display text-lg font-bold text-foreground hover:text-primary transition-colors line-clamp-1 cursor-pointer">
                                {item.recipe.name}
                              </h3>
                            </Link>
                            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                {item.recipe.rating.toFixed(1)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {item.recipe.prepTimeMinutes + item.recipe.cookTimeMinutes} mins
                              </span>
                              <span className="flex items-center gap-1">
                                <ChefHat className="w-3.5 h-3.5" />
                                {item.recipe.difficulty}
                              </span>
                            </div>
                            <span className="inline-block mt-2 text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full">
                              {item.recipe.cuisine}
                            </span>
                          </div>
                          <button
                            onClick={() => handleRemove(item.recipe.id, item.recipe.name)}
                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Remove from cart"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3 mt-4">
                          <span className="text-sm font-medium text-muted-foreground">Qty:</span>
                          <div className="flex items-center gap-1 bg-secondary/60 rounded-xl p-1">
                            <button
                              onClick={() => handleQuantityChange(item.recipe.id, item.recipe.name, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white transition-colors text-foreground font-bold shadow-sm"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-10 text-center text-base font-bold text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.recipe.id, item.recipe.name, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white transition-colors text-foreground font-bold shadow-sm"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-sm text-muted-foreground ml-auto">
                            {item.recipe.servings} servings/recipe
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:w-80 xl:w-96 flex-shrink-0"
            >
              <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-6 sticky top-28">
                <h2 className="text-xl font-display font-bold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.recipe.id} className="flex items-center justify-between text-sm">
                      <span className="text-foreground/70 line-clamp-1 flex-1 mr-3">{item.recipe.name}</span>
                      <span className="font-semibold text-foreground flex-shrink-0">×{item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Recipes</span>
                    <span className="font-semibold">{totalRecipes}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Items</span>
                    <span className="font-semibold">{totalItems}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Servings</span>
                    <span className="font-semibold">
                      {cart.reduce((sum, item) => sum + item.quantity * item.recipe.servings, 0)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl mb-6">
                    <Package className="w-5 h-5 text-primary flex-shrink-0" />
                    <p className="text-sm text-foreground/80">
                      All recipes include full ingredient lists and step-by-step instructions.
                    </p>
                  </div>

                  <button
                    onClick={handleProceed}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all hover:scale-[1.01]"
                  >
                    Proceed to Cook
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <Link href="/">
                    <button className="w-full mt-3 py-3 text-sm font-semibold text-foreground/70 hover:text-primary transition-colors">
                      Continue Browsing
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
