import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import Features from "../components/Features";
import ProcessSection from "../components/ProcessSection";
import Products from "../components/Products";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import ImageShowcase from "../components/ImageShowcase";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>
          Granite & Marble Collection - Luxury Stone Designs | HS-Globals
        </title>
        <meta
          name="description"
          content="Explore HS-Globals' exquisite granite and marble collection. Discover custom luxury stone designs to elevate your interiors with timeless elegance and quality."
        />
        <meta
          name="keywords"
          content="granite collection, marble collection, luxury stone, custom stone designs, interior stone solutions, HS-Globals, premium granite, premium marble"
        />

        <meta name="title" content="HS-Globals" />
        <meta name="description" content="HS-Globals" />
        <meta name="keywords" content="HS-Globals" />
        <meta name="keywords" content="granite and marble collection" />
        <meta name="author" content="HS-Globals" />
        <meta
          property="og:title"
          content="Granite & Marble Collection - Luxury Stone Designs | HS-Globals"
        />
        <meta
          property="og:description"
          content="Transform your interiors with HS-Globals' granite and marble collection. Unique designs and premium materials for luxurious living spaces."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.hs-globals.com/granite-marble-collection"
        />
        <meta
          property="og:image"
          content="https://www.hs-globals.com/assets/images/granite-marble-collection.jpg"
        />
      </Helmet>
      <Hero />
      <Features />
      <ProcessSection />
      <Products />
      <Services />
      <Gallery />
      <ImageShowcase />
      <Testimonials />
    </>
  );
};

export default Home;
