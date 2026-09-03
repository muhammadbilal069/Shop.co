import { Routes, Route } from "react-router-dom";

import TopBar from "../components/TopBar/TopBar";
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
import Login from "../pages/Login/Login";
import Signup from "../pages/SignUp/SignUp";


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

      {/* Product Shop Paage */}
      <Route
        path="/shop"
        element={<Shop />}
      />

       {/* Product Cart Page */}
      <Route path="/cart" element={<Cart />}
      />


     {/* Login Page */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />


    </Routes>
  );
}

export default AppRoutes;