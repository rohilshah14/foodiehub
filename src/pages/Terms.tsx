import { useEffect } from "react";

export default function Terms() {
  useEffect(() => {
    document.title = "Terms of Service — FoodieHub";
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-primary font-bold uppercase tracking-wider text-sm">Legal</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-2 mb-3">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: April 4, 2026</p>
        </div>

        <div className="space-y-10 text-foreground/80 leading-relaxed">

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using FoodieHub ("the Service") at <strong>foodiehub.in</strong>, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
            </p>
            <p className="mt-3">
              We reserve the right to update these terms at any time. Continued use of the Service after any changes constitutes your acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">2. Use of the Service</h2>
            <p>You agree to use FoodieHub only for lawful purposes and in a manner that does not infringe the rights of others. You must not:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Use the Service in any way that violates applicable local, national, or international laws or regulations.</li>
              <li>Attempt to gain unauthorized access to any part of the Service or its related systems.</li>
              <li>Transmit any unsolicited or unauthorized advertising or promotional material.</li>
              <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service.</li>
              <li>Use automated tools or bots to scrape, crawl, or download content from the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">3. Intellectual Property</h2>
            <p>
              All content on FoodieHub — including but not limited to text, graphics, logos, recipe descriptions, images, and software — is the property of FoodieHub or its content suppliers and is protected by applicable intellectual property laws.
            </p>
            <p className="mt-3">
              You may not reproduce, distribute, modify, or create derivative works of any content without express written permission from FoodieHub. Recipe data is sourced from third-party APIs and remains the property of their respective owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">4. User Content</h2>
            <p>
              If you submit any content to FoodieHub (such as reviews, comments, or feedback), you grant us a non-exclusive, royalty-free, worldwide license to use, reproduce, and display that content in connection with the Service.
            </p>
            <p className="mt-3">
              You are solely responsible for any content you submit and warrant that it does not violate any third-party rights or applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">5. Disclaimer of Warranties</h2>
            <p>
              The Service is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. FoodieHub does not warrant that:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>The Service will be uninterrupted, timely, secure, or error-free.</li>
              <li>The information provided (including recipe details, nutritional information, or cooking times) is accurate, complete, or reliable.</li>
              <li>Any errors in the Service will be corrected.</li>
            </ul>
            <p className="mt-3">
              Recipes and cooking instructions are provided for informational purposes only. Always use your own judgment regarding food safety, allergies, and dietary requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, FoodieHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Service, even if we have been advised of the possibility of such damages.
            </p>
            <p className="mt-3">
              Our total liability for any claim arising out of or relating to these Terms or the Service shall not exceed INR 1,000 (or the equivalent in your local currency).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">7. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra, India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">8. Changes to Terms</h2>
            <p>
              We may revise these Terms of Service at any time by updating this page. We will notify users of significant changes by updating the "Last updated" date at the top of this page. We encourage you to review these Terms periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">9. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
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
