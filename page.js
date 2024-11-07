import React from "react";
import HomeSlider from "./components/homePageComponent/HomeSlider";
import MostLikedItems from "./components/homePageComponent/MostLikedItems";
import WeeklyOffers from "./components/homePageComponent/WeeklyOffer";
import SpecialOffer from "./components/homePageComponent/SpecialOffer";
import NotVP from './components/homePageComponent/NotVerifiedPopup'

const Home = () => {
  return (
    <div style={{ position: "relative" }}>
      <div>
        <NotVP />
        <HomeSlider />
        <MostLikedItems />
        <WeeklyOffers />
        <SpecialOffer />
      </div>
    </div>
  );
};

export default Home;
