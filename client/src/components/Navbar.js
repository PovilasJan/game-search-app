import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');
  const [language, setLanguage] = useState('EN');
  const [currency, setCurrency] = useState('EUR');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <span className="logo-icon">🎮</span>
          <span className="logo-text">GameSearch</span>
        </div>

        {/* Search Bar */}
        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search for games..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-btn">
            🔍
          </button>
        </form>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          {/* Language Selector */}
          <div className="nav-item language">
            <button
              className={`lang-btn ${language === 'EN' ? 'active' : ''}`}
              onClick={() => setLanguage('EN')}
              title="English"
            >
              <span className="flag">🇬🇧</span>
            </button>
            <button
              className={`lang-btn ${language === 'LT' ? 'active' : ''}`}
              onClick={() => setLanguage('LT')}
              title="Lithuanian"
            >
              <span className="flag">🇱🇹</span>
            </button>
          </div>

          {/* Currency Selector */}
          <div className="nav-item currency">
            <select
              className="currency-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="EUR">€ EUR</option>
              <option value="USD">$ USD</option>
              <option value="GBP">£ GBP</option>
            </select>
          </div>

          {/* Wishlist */}
          <button className="nav-icon-btn wishlist" title="Wishlist">
            ❤️
          </button>

          {/* Cart */}
          <button className="nav-icon-btn cart" title="Cart">
            🛒
          </button>

          {/* Account */}
          <button className="nav-icon-btn account" title="Account">
            👤
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
