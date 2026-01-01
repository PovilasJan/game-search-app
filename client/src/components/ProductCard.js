import React from "react";
import "./ProductCard.css";
import { BsClock, BsHeart } from "react-icons/bs";
import { FaSteam, FaPlaystation, FaXbox } from "react-icons/fa";

const platformIcons = {
  steam: FaSteam,
  playstation: FaPlaystation,
  xbox: FaXbox,
};

const platformDisplayNames = {
  steam: "Steam",
  playstation: "PlayStation",
  xbox: "Xbox",
};

function ProductCard({ product }) {
  const IconComponent = platformIcons[product.platform];
  const platformDisplayName = platformDisplayNames[product.platform] || product.platform;
  const discountedPrice = product.discount_percentage
    ? (product.price * (1 - product.discount_percentage / 100)).toFixed(2)
    : product.price;

  return (
    <div className="product-card">
      <div className="product-image">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <span className="platform-badge">
            {IconComponent && <IconComponent />}
          </span>
        )}
        <span className="absolute bottom-0 m-auto text-sm py-1 w-full backdrop-blur-sm bg-black bg-opacity-40 justify-center flex items-center gap-2">
          {IconComponent && <IconComponent size={20} />}
          {platformDisplayName}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-white text-lg mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
          {product.name}
        </h3>
        <p className="text-[#8888aa] text-sm line-clamp-2">{product.region}</p>

        <div className="price-section">
          {product.discount_percentage > 0 ? (
            <div className="discount-info">
              <span>
                From €<strong className="text-gray-400 line-through text-sm">{product.price}</strong> -{product.discount_percentage}%
              </span>
            </div>
          ) : (
            <div className="discount-info empty"></div>
          )}
          <div className="text-xl font-bold flex items-center gap-2">
            €{discountedPrice} <BsClock className="clock-icon" />
          </div>
        </div>

        {product.cashback_percentage > 0 && (
          <div className="text-[#18e96f] text-xs">
            <strong>Cashback: €{(discountedPrice * product.cashback_percentage / 100).toFixed(2)}</strong>
          </div>
        )}
        <div className="text-[#ff6b81] flex items-center gap-2 h-2 mt-5">
          <BsHeart />
          <span>{product.likes}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
