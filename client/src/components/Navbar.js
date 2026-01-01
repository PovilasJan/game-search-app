import React, { useState } from 'react';
import './Navbar.css';
import { CiSearch } from "react-icons/ci";
import { FaXmark } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { BsHeart } from "react-icons/bs";

function Navbar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

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

  const handleClearSearch = () => {
    setSearchValue('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img 
            src="https://static.eneba.games/branding/v2/logoFull.svg" 
            alt="Logo" 
            className="logo-img"
          />
        </div>

        {/* Search Bar */}
        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <CiSearch className="search-icon-left" />
          <input
            type="text"
            className="search-input"
            placeholder="Search for games..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          {searchValue && (
            <button type="button" className="clear-btn" onClick={handleClearSearch}>
              <FaXmark />
            </button>
          )}
        </form>

        {/* Region/Currency Info */}
        <div className="region-info">
          <span className="flag-round">🇱🇹</span>
          <span className="region-text">EU | EUR</span>
        </div>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          {/* Wishlist */}
          <button className="nav-icon-btn wishlist" title="Wishlist">
            <BsHeart />
          </button>

          {/* Cart */}
          <button className="nav-icon-btn cart" title="Cart">
            <IoCartOutline />
          </button>

          {/* Account */}
          <button className="nav-icon-btn account" title="Account">
            <CiUser />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
