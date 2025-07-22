import React, { useEffect, useState } from 'react';
import API_BASE_URL from './config';

function App() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  const fetchProducts = (search = "") => {
    fetch(`${API_BASE_URL}/search?q=${search}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("API Error:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1>🛒 Mini Flipkart</h1>
      <input
        type="text"
        className="search-box"
        placeholder="Search for mobiles, laptops..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          fetchProducts(e.target.value);
        }}
      />
      <div className="grid">
        {products.map(p => (
          <div className="card" key={p.id}>
            <h2>{p.title}</h2>
            <p>₹ {p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;