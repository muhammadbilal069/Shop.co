import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewArrivals.css";

function NewArrivals() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Server se New Arrivals ka data lena
  useEffect(() => {
    fetch("http://localhost:5000/api/products/new-arrivals")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("New Arrivals fetch karne mein error aaya:", err);
        setLoading(false);
      });
  }, []);

  // Product Click Handler with Instant Top Scroll
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0); // Directly detail page ke top par scroll karega
  };

  if (loading) {
    return (
      <p style={{ textAlign: "center", padding: "40px" }}>
        Products load ho rahe hain...
      </p>
    );
  }

  return (
    <section className="new-arrivals">
      <h2 className="section-title">NEW ARRIVALS</h2>

      <div className="products">
        {products.map((product) => {
          const productId = product._id || product.id;
          return (
            <div
              className="product-card"
              key={productId}
              onClick={() => handleProductClick(productId)}
              style={{ cursor: "pointer" }}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>

              <h3>{product.name}</h3>

              <div className="rating">
                <span>{"★".repeat(Math.floor(product.rating || 5))}</span>
                <small>{product.rating || "5.0"}/5</small>
              </div>

              {product.oldPrice ? (
                <div className="price-row">
                  <p className="price">${product.price}</p>
                  <p className="old-price">${product.oldPrice}</p>
                  <span className="discount">{product.discount}</span>
                </div>
              ) : (
                <p className="price">${product.price}</p>
              )}
            </div>
          );
        })}
      </div>

      <button className="view-all" onClick={() => navigate("/shop?category=new")}>
        View All
      </button>
    </section>
  );
}

export default NewArrivals;