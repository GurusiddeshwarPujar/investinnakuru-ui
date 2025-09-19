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
