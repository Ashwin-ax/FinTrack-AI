import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import AIPreview from "./AIPreview";
import CTASection from "./CTASection";
import Footer from "./Footer";
import "./index.css";

const LandingPage = () => {
  // Optional: Smooth scroll polyfill or logic can be added here
  useEffect(() => {
    document.title = "FinTrackAI | Smart Financial Management";
  }, []);

  return (
    <div className="landing-page-wrapper">
      {/* Navigation - Sticky at top */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero />

        <div id="features">
          <Features />
        </div>

        <div id="ai-insights">
          <AIPreview />
        </div>

        <CTASection />
      </main>

      {/* Footer - Bottom of page */}
      <Footer />
    </div>
  );
};

export default LandingPage;
