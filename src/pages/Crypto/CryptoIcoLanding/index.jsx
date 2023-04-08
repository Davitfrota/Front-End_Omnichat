import React, { useEffect, useState } from "react";

//Import Components
import Navbar from "./Navbar/Navbar"
import Section from "./HeroSection/Section"
import CardsMini from "./HeroSection/cards-mini"
import AboutUs from "./AboutUs/about-us"
import Features from "./Features/features"
import RoadMap from "./RoadMap/road-map"
import OurTeam from "./Team/our-team"
import Blog from "./Blog/blog"
import FAQs from "./Faqs/FAQs"
import Footer from "./Footer/footer"

const CryptoIcoLanding = () => {
  
  //meta title
  document.title="ICO Landing | Skote - Vite React Admin & Dashboard Template";

  const [imglight, setimglight] = useState(true);
  const [navClass, setnavClass] = useState("");

  // Use ComponentDidMount
  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true)
  },[])

  function scrollNavigation() {
    var scrollup = document.documentElement.scrollTop
    if (scrollup > 80) {
      setimglight(false)
      setnavClass("nav-sticky")
    } else {
      setimglight(true)
      setnavClass("")
    }
  }

  return (
    <React.Fragment>
      {/* import navbar */}
      <Navbar navClass={navClass} imglight={imglight} />

      {/* Hero section */}
      <Section />

      {/* mini cards */}
      <CardsMini />

      {/* aboutus */}
      <AboutUs />

      {/* features */}
      <Features />

      {/* roadmap */}
      <RoadMap />

      {/* our team */}
      <OurTeam />

      {/* blog */}
      <Blog />

      {/* faqs */}
      <FAQs />

      {/* footer */}
      <Footer />
    </React.Fragment>
  )
}

export default CryptoIcoLanding
