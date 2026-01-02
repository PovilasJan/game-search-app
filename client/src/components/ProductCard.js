import React from "react";
import { BsClock, BsHeart } from "react-icons/bs";
import { FaSteam, FaPlaystation, FaXbox } from "react-icons/fa";
import { LuCircleFadingPlus } from "react-icons/lu";

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
    <div className="bg-[#1f0a4d] border border-cyan-400 overflow-hidden cursor-pointer w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]">
      <div className="bg-[#4518ac] flex items-center justify-center text-6xl relative w-full aspect-[3/4]">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="aspect-[3/4] w-fit h-full object-cover object-center"
          />
        ) : (
          <span className="absolute top-2.5 left-2.5 bg-black/50 px-2 py-1 rounded text-xl">
            {IconComponent && <IconComponent />}
          </span>
        )}
        {product.cashback_percentage > 0 && (
          <span className="absolute bottom-10 left-0 bg-gradient-to-br from-[#00c853] to-[#00e676] text-white text-[0.7rem] font-bold px-2 py-1 rounded-r uppercase tracking-wide flex items-center gap-1">
            <LuCircleFadingPlus />CASHBACK
          </span>
        )}
        <span className="absolute bottom-0 m-auto text-sm py-1 w-full backdrop-blur-sm bg-black/40 justify-center flex items-center gap-2">
          {IconComponent && <IconComponent size={20} />}
          {platformDisplayName}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-white text-lg mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
          {product.name}
        </h3>
        <p className="text-[#8888aa] text-sm line-clamp-2">{product.region}</p>

        <div className="mb-3">
          {product.discount_percentage > 0 ? (
            <div className="min-h-[1.5em] leading-tight mb-1 text-sm">
              <span>
                From €<strong className="text-gray-400 line-through text-sm">{product.price}</strong> -{product.discount_percentage}%
              </span>
            </div>
          ) : (
            <div className="min-h-[1.5em]"></div>
          )}
          <div className="text-xl font-bold flex items-center gap-2">
            €{discountedPrice} <BsClock className="h-[90%] text-[#8888aa]" />
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
