// app/page.tsx or pages/index.tsx (depending on your project structure)

import React from "react";

import Banner from "@/components/home/banner";
import About from "@/components/home/about";
import WhyInvest from "@/components/home/whyInvest";
import KeySector from "@/components/home/keySector";
import Intro from "@/components/home/intro";
import SuccessStories from "@/components/home/successStories";
import NewsEvent from "@/components/home/newsEvents";
import FooterInfo from "@/components/home/footerInfo";

export const metadata = {
  title : "Home | Invest In Nakuru",
  //title: "Invest In Nakuru | Official Investment Platform of Nakuru County",
  description:
    "Welcome to Invest In Nakuru, the official investment platform of Nakuru County. Explore profitable opportunities in real estate, agribusiness, tourism, manufacturing, green energy, and infrastructure. Learn about tax incentives, government support, and secure diaspora investment channels.",
  keywords:
    "Invest In Nakuru, Nakuru County investment, Kenya investment opportunities, real estate Nakuru, agribusiness investment Kenya, tourism investment Nakuru, manufacturing opportunities Kenya, green energy projects Nakuru, infrastructure development Kenya, diaspora investment Kenya",
};


const Home: React.FC = () => {
  return (
    <>
      <Banner />
      <About />
      <WhyInvest />
      <KeySector />
      <Intro />
      <SuccessStories />
      <NewsEvent />
      <FooterInfo />
    </>
  );
};

export default Home;
