import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoTrashOutline, IoArrowForwardOutline } from "react-icons/io5";

import TopBar from "../../components/TopBar/TopBar";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const increaseQuantity = (id, size, color) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id, size, color) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item
      )
    );
  };

  const removeItem = (id, size, color) => {
    setCartItems((items) =>
      items.filter(
        (item) => !(item.id === id && item.size === size && item.color === color)
      )
    );
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  const applyPromo = () => {
    if (promoCode.trim() !== "") {
      setDiscount(Math.round(subtotal * 0.2));
    }
  };

  return (
    <>
      <TopBar />
      <Navbar />

      <section className="cart-page">
        {/* Breadcrumb */}
        <div className="cart-breadcrumb">
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Home</span>
          <span>&gt;</span>
          <span className="cart-breadcrumb-active">Cart</span>
        </div>

        {/* Title */}
        <h1 className="cart-title">YOUR CART</h1>

        {/* Main Cart */}
        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <h2>Your cart is empty</h2>
                <button onClick={() => navigate("/shop")}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div className="cart-item" key={`${item.id}-${item.size}-${item.color}-${index}`}>
                  <div className="cart-product-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-product-info">
                    <h3>{item.name}</h3>
                    <p>Size: {item.size}</p>
                    <p>Color: {item.color}</p>
                    <div className="cart-price">${item.price}</div>
                  </div>

                  <button
                    className="delete-item"
                    onClick={() => removeItem(item.id, item.size, item.color)}
                  >
                    <IoTrashOutline />
                  </button>

                  <div className="quantity-box">
                    <button onClick={() => decreaseQuantity(item.id, item.size, item.color)}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id, item.size, item.color)}>
                      +
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>${subtotal}</strong>
            </div>

            <div className="summary-row discount-row">
              <span>Discount</span>
              <strong>-${discount}</strong>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <strong>${deliveryFee}</strong>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>${total}</strong>
            </div>

            {/* Promo */}
            <div className="promo-row">
              <input
                type="text"
                placeholder="Add promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={applyPromo}>Apply</button>
            </div>

            {/* Checkout */}
            <button className="checkout-button">
              Go to Checkout <IoArrowForwardOutline />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Cart;