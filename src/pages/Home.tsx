import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import TestimonialVariant2 from "../components/TestimonialVariant2";
import CategoriesSlider from "../components/CategoriesSlider";
import AboutCompany from "../components/AboutCompany";
import ChooseStone from "../components/ChooseStone";
import TrustBadges from "../components/TrustBadges";
import MarbleEngravingSection1 from "../components/MarbleEngravingSection1";

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
      <section style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}>
        <Hero />
      </section>
      <section style={{ contentVisibility: 'auto', containIntrinsicSize: '1200px' }}>
        <AboutCompany />
      </section>
      <section style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}>
        <CategoriesSlider />
      </section>
      <section style={{ contentVisibility: 'auto', containIntrinsicSize: '600px' }}>
        <TrustBadges />
      </section>
      <section style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}>
        <MarbleEngravingSection1 />
      </section>
      <section style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}>
        <ChooseStone />
      </section>
      <section style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}>
        <TestimonialVariant2 />
      </section>
    </>
  );
};

export default Home;
