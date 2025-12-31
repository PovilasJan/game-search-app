import React, { useState, useEffect, useCallback } from 'react';
import api from './services/api';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce search to avoid too many API calls
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const fetchProducts = async (search = '') => {
    try {
      setLoading(true);
      const endpoint = search ? `/list?search=${encodeURIComponent(search)}` : '/list';
      const response = await api.get(endpoint);
      setItems(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. Make sure the server is running.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term) => {
      fetchProducts(term);
    }, 300),
    []
  );

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle search from navbar
  const handleSearch = (term) => {
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <div className="App">
      <Navbar onSearch={handleSearch} />

      <main className="App-main">
        {/* Results Section */}
        <section className="products-section">
          <div className="section-header">
            <h2>
              {searchTerm ? `Search results for "${searchTerm}"` : 'All Games'}
              <span className="count">({items.length})</span>
            </h2>
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
