import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy — FoodieHub";
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-primary font-bold uppercase tracking-wider text-sm">Legal</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-2 mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: April 4, 2026</p>
        </div>

        <div className="prose-like space-y-10 text-foreground/80 leading-relaxed">

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">1. Introduction</h2>
            <p>
              Welcome to FoodieHub ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>foodiehub.in</strong> and use our services.
            </p>
            <p className="mt-3">
              Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Personal Identifiers:</strong> Name, email address, and phone number when you contact us or sign up.</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent, browser type, device type, and IP address collected automatically.</li>
              <li><strong>Preferences:</strong> Saved recipes, favourites, and cart items stored locally in your browser.</li>
              <li><strong>Communications:</strong> Any messages or feedback you send us via email or contact forms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Provide, operate, and maintain our website and services.</li>
              <li>Improve, personalize, and expand our content and offerings.</li>
              <li>Understand and analyze how you use our website.</li>
              <li>Communicate with you about updates, new recipes, or promotional content (only with your consent).</li>
              <li>Prevent fraud and ensure the security of our platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">4. Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience on our site. Cookies are small files placed on your device that help us remember your preferences and understand site usage.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the website to function correctly.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site.</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences.</li>
            </ul>
            <p className="mt-3">You can control cookie settings through your browser at any time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">5. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites such as recipe image sources and social media platforms. We are not responsible for the privacy practices or content of those sites. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">7. Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>The right to access the personal data we hold about you.</li>
              <li>The right to request correction of inaccurate data.</li>
              <li>The right to request deletion of your personal data.</li>
              <li>The right to opt out of marketing communications at any time.</li>
              <li>The right to data portability.</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, please contact us using the details below.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <div className="mt-3 bg-secondary/40 rounded-2xl p-6 space-y-2">
              <p><strong>FoodieHub</strong></p>
              <p>42 Spice Lane, Flavor District, Mumbai 400001, India</p>
              <p>Email: <a href="mailto:hello@foodiehub.in" className="text-primary hover:underline">hello@foodiehub.in</a></p>
              <p>Phone: <a href="tel:+919876543210" className="text-primary hover:underline">+91 98765 43210</a></p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
