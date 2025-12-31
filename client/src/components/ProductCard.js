import React from 'react';
import './ProductCard.css';
import { BsClock } from "react-icons/bs";

function ProductCard({ product }) {
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'steam':
        return '🎮';
      case 'playstation':
        return '🎯';
      case 'xbox':
        return '🎲';
      default:
        return '🎮';
    }
  };

  const discountedPrice = product.discount_percentage 
    ? (product.price * (1 - product.discount_percentage / 100)).toFixed(2)
    : product.price;
  const cashbackAmount = product.cashback_percentage
    ? (discountedPrice * (product.cashback_percentage / 100)).toFixed(2)
    : 0;

  return (
    <div className="product-card">
      <div className="product-image">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
          />
        ) : (
          <span className="platform-badge">{getPlatformIcon(product.platform)}</span>
        )}

      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.region}</p>
        {product.discount_percentage > 0 && (
          <span className="">From €<strong className="original-price">{product.price}</strong> -{product.discount_percentage}%</span>
        )}
        <div className="current-price">
          €{discountedPrice} <BsClock className="clock-icon" />
        </div>
        {product.cashback_percentage > 0 && (
          <div className="cashback">
            <span> €{cashbackAmount} cashback</span>
          </div>
        )}
        <div className="likes">
          <span>❤️</span>
          <span>{product.likes}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
