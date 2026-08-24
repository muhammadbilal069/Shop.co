import { Routes, Route } from "react-router-dom";

import TopBar from "../Components/TopBar/TopBar";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Brands from "../components/Brands/Brands";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import TopSelling from "../components/TopSelling/TopSelling";
import StyleSection from "../components/StyleSection/StyleSection";
import Reviews from "../components/Reviews/Reviews";
import Footer from "../components/Footer/Footer";

import ProductDetail from "../components/ProductDetail/ProductDetail";

import Shop from "../pages/Shop/Shop";
import Cart from "../pages/Cart/Cart";


function AppRoutes() {
  return (
    <Routes>

      {/* Home */}

      <Route
        path="/"
        element={
          <>
            <TopBar />
            <Navbar />
            <Hero />
            <Brands />
            <NewArrivals />
            <TopSelling />
            <StyleSection />
            <Reviews />
            <Footer />
          </>
        }
      />


      {/* Product Detail */}

      <Route
        path="/product/:id"
        element={<ProductDetail />}
        
      />

      <Route
  path="/shop"
  element={<Shop />}
/>

     <Route path="/cart" element={<Cart />}
     />


    </Routes>
  );
}

export default AppRoutes;