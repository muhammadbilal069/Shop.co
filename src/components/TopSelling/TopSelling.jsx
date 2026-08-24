import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TopSelling.css";

function TopSelling() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://shop-co-backend-sigma.vercel.app/api/products/top-selling")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.slice(0, 4));
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Top Selling Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p style={{ textAlign: "center", padding: "40px" }}>
        Loading Top Selling...
      </p>
    );
  }

  return (
    <section className="new-arrivals top-selling-section">
      <h2 className="section-title">TOP SELLING</h2>

      <div className="products">
        {products.map((product) => {
          const productId = product.id || product._id;
          return (
            <div
              className="product-card"
              key={productId}
              onClick={() => {
                navigate(`/product/${productId}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>

              <h3>{product.name}</h3>

              <div className="rating">
                <span style={{ color: "#FFC107" }}>
                  {"★".repeat(Math.floor(product.rating || 5))}
                </span>
                <small>{product.rating || "5.0"}/5</small>
              </div>

              <div className="price-row">
                <p className="price">${product.price}</p>
                {product.oldPrice && (
                  <p className="old-price">${product.oldPrice}</p>
                )}
                {product.discount && (
                  <span className="discount">{product.discount}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button className="view-all" onClick={() => navigate("/shop")}>
        View All
      </button>
    </section>
  );
}

export default TopSelling;