import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    console.log("Added to Cart:", product);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        alert("Product deleted successfully!");
        fetchProducts(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Product List</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
        {products.map((product) => (
          <div key={product._id} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
            <img
              src={`http://localhost:5000${product.imageUrl}`}
              alt={product.name}
              style={{ width: "100%", height: "200px", marginBottom: "1rem" }}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => handleAddToCart(product)}
                style={{
                  padding: "10px",
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                  flex: 1,
                }}
              >
                Add to Cart
              </button>

              <button
                onClick={() => handleDeleteProduct(product._id)}
                style={{
                  padding: "10px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
