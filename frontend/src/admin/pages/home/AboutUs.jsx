import React from "react";
import NavBar2 from "@/Common/NavBar2";
import AboutSection from "./home_components/AboutSection";
import Footer from "@/Common/Footer";

const AboutUs = () => {
  return (
    <div>
      <NavBar2 />
      <div>
        <AboutSection />
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
