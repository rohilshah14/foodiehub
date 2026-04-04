import { useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, ChefHat, Clock, Home, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRecipe } from "@/hooks/use-recipes";

export default function ThankYou() {
  const [, params] = useRoute("/thank-you/:id");
  const [, setLocation] = useLocation();
  const { data: recipe } = useRecipe(params?.id || "");

  useEffect(() => {
    document.title = "Order Placed — FoodieHub";
    window.scrollTo(0, 0);
  }, []);

  const steps = [
    { icon: "🛒", label: "Order Received", desc: "Your order has been placed successfully." },
    { icon: "👨‍🍳", label: "Preparing Ingredients", desc: "We're getting everything ready for you." },
    { icon: "🔥", label: "Cooking in Progress", desc: "Your dish is being crafted with love." },
    { icon: "🍽️", label: "Ready to Serve", desc: "Your meal will be ready shortly." },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-28 h-28 rounded-full bg-green-50 flex items-center justify-center shadow-lg shadow-green-100">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <span className="absolute -top-1 -right-1 text-2xl">🎉</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
            Thank You for Ordering!
          </h1>
          <p className="text-muted-foreground text-lg mb-2">
            Your culinary journey has begun.
          </p>
          {recipe && (
            <p className="text-primary font-semibold text-lg">
              "{recipe.name}" is on its way 🍴
            </p>
          )}
        </motion.div>
        {recipe && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-8 bg-white border border-border rounded-3xl overflow-hidden shadow-sm flex items-center gap-5 p-4 text-left"
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-20 h-20 rounded-2xl object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-lg text-foreground truncate">{recipe.name}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</span>
                <span className="flex items-center gap-1"><ChefHat className="w-3.5 h-3.5" /> {recipe.difficulty}</span>
              </div>
            </div>
            <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full shrink-0">
              {recipe.cuisine}
            </span>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 bg-white border border-border rounded-3xl p-6 shadow-sm text-left"
        >
          <h2 className="font-display font-bold text-xl text-foreground mb-6 text-center">
            What Happens Next?
          </h2>
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 relative">
                {i < steps.length - 1 && (
                  <div className="absolute left-[22px] top-12 w-0.5 h-8 bg-border" />
                )}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.15, type: "spring", stiffness: 200 }}
                  className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-xl shrink-0"
                >
                  {step.icon}
                </motion.div>
                <div className="pb-8">
                  <p className="font-semibold text-foreground">{step.label}</p>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            onClick={() => setLocation("/")}
            className="rounded-full px-8 gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setLocation("/recipes")}
            className="rounded-full px-8 gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Browse More Recipes
          </Button>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          A confirmation has been sent to your email. Questions? Contact us at{" "}
          <a href="mailto:hello@foodiehub.com" className="text-primary hover:underline">
            hello@foodiehub.com
          </a>
        </motion.p>

      </div>
    </div>
  );
}
