import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewArrivals.css";

function NewArrivals() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://shop-co-backend-sigma.vercel.app/api/products/new-arrivals")
      .then((res) => res.json())
      .then((data) => {
        // Yeh check ensure karega ke agar data array nahi hai toh app crash na ho
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("New Arrivals fetch error:", err);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const handleProductClick = (productId) => {
    if (!productId || productId === "undefined") {
      console.error("Product ID missing hai:", productId);
      return;
    }
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
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
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => {
            const productId = product._id || product.id;
            return (
              <div
                className="product-card"
                key={productId || Math.random()}
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
          })
        ) : (
          <p style={{ textAlign: "center", width: "100%", padding: "20px" }}>
            Koi products dastiyab nahi hain ya backend mein masla hai.
          </p>
        )}
      </div>

      <button className="view-all" onClick={() => navigate("/shop?category=new")}>
        View All
      </button>
    </section>
  );
}

export default NewArrivals;