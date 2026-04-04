import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { Logo } from "./Logo";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = useStore((state) => state.getCartCount());
  const favCount = useStore((state) => state.favorites.length);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Recipes", href: "/recipes" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-white py-3 border-b border-orange-100",
        isScrolled ? "shadow-md" : "shadow-none"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="z-50">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-primary",
                  location === link.href
                    ? "text-primary"
                    : "text-foreground/80"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 pl-6 border-l border-border">
            <Link href="/favourites">
              <button
                className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 bg-orange-50 text-foreground hover:bg-orange-100"
              >
                <Heart className={cn("w-5 h-5", favCount > 0 && "fill-red-500 text-red-500")} />
                {favCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {favCount > 9 ? "9+" : favCount}
                  </span>
                )}
              </button>
            </Link>
            <Link href="/cart">
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105 shadow-md bg-primary text-white hover:bg-primary/90 shadow-primary/30"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-white text-primary">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
          </div>
        </nav>

        <button
          className="md:hidden z-50 p-2 rounded-full transition-colors text-foreground hover:bg-orange-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-orange-100 p-6 flex flex-col gap-4 md:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-lg font-semibold py-2 border-b border-border/50 text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-4 mt-4">
                <Link href="/favourites" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-border font-semibold text-sm">
                    <Heart className={cn("w-5 h-5", favCount > 0 && "fill-red-500 text-red-500")} />
                    Favourites ({favCount})
                  </button>
                </Link>
                <Link href="/cart" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm">
                    <ShoppingCart className="w-5 h-5" />
                    Cart ({cartCount})
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
