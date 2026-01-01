import React, { useState, useEffect } from 'react';
import api from './services/api';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async (search = '') => {
    try {
      setLoading(true);
      const url = search.trim() ? `/list?search=${encodeURIComponent(search.trim())}` : '/list';
      const response = await api.get(url);
      setItems(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. Make sure the server is running.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle search from navbar (server-side search)
  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchProducts(term);
  };

  return (
    <div className="App">
      <Navbar onSearch={handleSearch} />

      <main className="App-main w-[70%] m-auto mt-5">
        <section className="products-section">
          <div className="section-header">
              {searchTerm ? <h3>Results found: {items.length}</h3> : 'All Games'}
          </div>

          {loading && <div className="loading-spinner">Loading...</div>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && items.length === 0 && (
            <p className="no-items">No games found. Try a different search term!</p>
          )}

          <div className="products-grid">
            {items.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
