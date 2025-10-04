import React from "react";

const Filters = ({
  category,
  CATEGORY_OPTIONS,
  selectedSubs,
  selectedBrands,
  selectedColors,
  priceRange,
  selectedDiscount,
  allBrands,
  allColors,
  onSubChange,
  onBrandChange,
  onColorChange,
  onPriceChange,
  onDiscountChange,
  onClearFilters,
}) => {
  return (
    <aside className="w-56 flex-shrink-0">
      {/* Subcategories */}
      <div className="py-4 px-4 border-b border-r border-gray-400">
        <h4 className="mb-2 text-sm font-bold text-black uppercase">Categories</h4>
        <ul className="space-y-1.5">
          {CATEGORY_OPTIONS[category.toLowerCase()]?.map((sub) => (
            <li key={sub} className="text-xs font-medium">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={sub}
                  checked={selectedSubs.includes(sub.toLowerCase())}
                  onChange={() => onSubChange(sub)}
                  className="w-4 h-4 cursor-pointer accent-black"
                />
                <span>{sub}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Brands */}
      <div className="py-4 px-4 border-b border-r border-gray-400">
        <h4 className="mb-2 text-sm font-bold text-black uppercase">Brands</h4>
        <ul className="space-y-1.5">
          {allBrands.slice(0, 8).map((brand) => (
            <li key={brand} className="text-xs font-medium">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={brand}
                  checked={selectedBrands.includes(brand.toLowerCase())}
                  onChange={() => onBrandChange(brand)}
                  className="w-4 h-4 cursor-pointer accent-black"
                />
                <span className="capitalize">{brand}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div className="py-4 px-4 border-b border-r border-gray-400">
        <h4 className="mb-2 text-sm font-bold text-black uppercase">Price</h4>
        <input
          type="range"
          min="0"
          max="100000"
          step="100"
          value={priceRange[1]}
          onChange={(e) => onPriceChange(1, e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />
        <p className="text-xs font-semibold text-black">
          ₹{priceRange[0]} - ₹{priceRange[1]}
        </p>
      </div>

      {/* Colors */}
      <div className="py-4 px-4 border-b border-r border-gray-400">
        <h4 className="mb-2 text-sm font-bold text-black uppercase">Color</h4>
        <ul className="space-y-1.5">
          {allColors.slice(0, 8).map((color) => (
            <li key={color} className="text-xs font-medium">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={color}
                  checked={selectedColors.includes(color.toLowerCase())}
                  onChange={() => onColorChange(color)}
                  className="w-3 h-3 cursor-pointer accent-black"
                />
                <span
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ background: color }}
                ></span>
                <span className="capitalize">{color}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Discount */}
      <div className="py-4 px-4 border-r border-gray-400">
        <h4 className="mb-2 text-sm font-bold text-black uppercase">Discount Range</h4>
        <ul className="space-y-1.5">
          {["10", "20", "30", "40", "50", "60", "70", "80"].map((discount) => (
            <li key={discount} className="text-xs font-medium">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="discount"
                  value={discount}
                  checked={selectedDiscount === discount}
                  onChange={() => onDiscountChange(discount)}
                  className="w-3 h-3 cursor-pointer accent-black"
                />
                <span>{discount}% and above</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Clear Filters */}
      <button
        onClick={onClearFilters}
        className="mt-4 px-3 py-1 bg-gray-200 text-black rounded hover:bg-gray-300 text-sm font-medium w-full"
      >
        Clear Filters
      </button>
    </aside>
  );
};

export default Filters;
