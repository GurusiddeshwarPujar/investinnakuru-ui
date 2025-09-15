"use client";

import React from 'react';
import Header from "../../components/header/Header";
import HeroSection from "../../components/landing/HeroSection";
import AboutSection from "../../components/landing/AboutSection";
import WhyInvestSection from "../../components/landing/WhyInvestSection";
import KeySectorsSection from "../../components/landing/KeySectorsSection";
import WorkforceSection from "../../components/landing/WorkforceSection";
import SuccessStories from "../../components/landing/SuccessStories";
import NewsEvents from "../../components/landing/NewsEvents";
import Cta from "../../components/landing/Cta";
import Footer from "../../components/landing/Footer";

// The main page component for the "Coming Soon" page.
// This component will be rendered by Next.js as the default home page.
export default function App() {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutSection />
      <WhyInvestSection />
      <KeySectorsSection />
      <WorkforceSection />
      <SuccessStories />
      <NewsEvents />
      <Cta />
      <Footer />
    </>
  );
}
