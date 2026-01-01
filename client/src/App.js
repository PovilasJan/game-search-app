import React, { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import api from './services/api';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import './App.css';

function App() {
  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fuse.js configuration
  const fuse = useMemo(() => {
    return new Fuse(allItems, {
      keys: ['name', 'region', 'platform'],
      threshold: 0.3, // Lower = more strict matching
      includeScore: true,
      includeMatches: true,
    });
  }, [allItems]);

  // Filter items based on search term using Fuse.js
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return allItems;
    }
    const results = fuse.search(searchTerm.trim());
    return results.map(result => result.item);
  }, [searchTerm, fuse, allItems]);

  // Update displayed items when filtered items change
  useEffect(() => {
    setItems(filteredItems);
  }, [filteredItems]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/list');
      setAllItems(response.data);
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

  // Handle search from navbar (instant client-side search)
  const handleSearch = (term) => {
    setSearchTerm(term);
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
