import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import LoadingSpinner from "./components/LoadingSpinner";
import ScrollToTop from "./components/ScrollToTop";
import InitialUserForm from "./components/InitialUserForm";
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));
const Gallery = React.lazy(() => import("./pages/Gallery"));
const GalleryDetails = React.lazy(() => import("./pages/GalleryDetails"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Services = React.lazy(() => import("./pages/Services"));
import emailjs from "@emailjs/browser";
import Test from "./pages/Test";
import ArtDetails from "./pages/ArtDetails";
import ArtDetailsInfo from "./pages/ArtDetailsInfo";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showInitialForm, setShowInitialForm] = useState(false);
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    const hasSubmittedForm = localStorage.getItem("hasSubmittedForm");
    if (hasSubmittedForm === "true") {
      setShowInitialForm(false);
    }

    if (!hasVisited) {
      // First visit - show loading screen for 3 seconds
      setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem("hasVisited", "true");
      }, 3000);
    } else {
      // Returning visitor - skip loading screen
      setIsLoading(false);
    }
  }, []);
  const handleFormSubmit = (data: {
    name: string;
    email: string;
    phone: string;
    requirements: string;
  }) => {
    const templateParams = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      requirements: data.requirements,
    };
    emailjs
      .send("service_cmjk7to", "template_sd79a3m", templateParams, {
        publicKey: "6uDKMKXeL97orQgEW",
      })
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (err) {
          console.log("FAILED...", err);
        }
      );
    console.log("Form submitted:", data);
    localStorage.setItem("hasSubmittedForm", "true");
    localStorage.setItem("userDetails", JSON.stringify(data));
    setShowInitialForm(false);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          {showInitialForm && <InitialUserForm onSubmit={handleFormSubmit} />}
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="*" element={<div>404 Not Found</div>} />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/productsinfo/:id" element={<ProductDetails />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/gallery/:id" element={<GalleryDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/products/:categoryId" element={<Test />} />
              <Route path="/artinfo/:productId" element={<ArtDetails />} />
              <Route path="/artinformation/:productId" element={<ArtDetailsInfo />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
