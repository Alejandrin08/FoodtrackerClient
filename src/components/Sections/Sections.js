import React from "react";
import HeroSection from "./HeroSection";
import HeroTwoSection from "./HeroTwoSection";
import HeroThreeSection from "./HeroThreeSection";
import HeroFourSection from "./HeroFourSection";
//import HeroFiveSection from "./HeroFiveSection";
//import HeroSixSection from "./HeroSixSection";
//import HeroSevenSection from "./HeroSevenSection";
import MapSection from "./MapSection";

const Sections = () => {
  //Rendering every of the section components
  return (
    <main>
      <HeroSection />
      <MapSection/>
      <HeroTwoSection />
      <HeroThreeSection />
      <HeroFourSection />
      {/*<HeroFiveSection />
      <HeroSixSection />
      <HeroSevenSection />*/}
    </main>
  );
  //END
};

export default Sections;
