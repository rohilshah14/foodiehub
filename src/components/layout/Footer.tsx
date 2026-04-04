import React from "react";
import { Link } from "wouter";
import { Instagram, Twitter, Facebook, Youtube, MapPin, Mail, Phone } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Logo className="mb-4" />
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              Discover amazing recipes, cook delicious meals, and share the joy of food with FoodieHub. Your ultimate culinary companion.
            </p>
            <div className="flex items-center gap-4">
              {[
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Recipes", href: "/recipes" },
                { label: "Favourites", href: "/favourites" },
                { label: "Cart", href: "/cart" },
        
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-muted-foreground hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>247 Flavor Street, Suite 12,<br />New York, NY 10001, USA</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:hello@foodiehub.com" className="hover:text-primary transition-colors cursor-pointer">
                  hello@foodiehub.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+12125550198" className="hover:text-primary transition-colors cursor-pointer">
                  +1 (212) 555-0198
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} FoodieHub. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
