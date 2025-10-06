import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";
import Filters from "../Components/Filters";
import { Link } from "react-router-dom";

const normalizeCategory = (name) => {
  if (!name) return { category: "", subcategory: "" };
  const parts = name.toLowerCase().split("-");
  return { category: parts[0], subcategory: parts.slice(1).join(" ") };
};

const CATEGORY_OPTIONS = {
  men: ["Topware", "Indian & Festive Ware", "Bottomware", "Footwear", "Fashion Accessories"],
  women: ["Indian & Fusion ware", "Western & Indo-western ware", "Footwear", "Jwellery & Accessories", "Beauty and Personal Care"],
  kids: ["Boys Clothing & Footwear", "Girls Clothing & Footwear", "Kids Accessories", "Toy & Games", "Kids Personal Care"],
  homeDecor: ["Furniture & Storage", "Dining Decor", "Kitchen Decor", "Lamps & Lighting", "Indoor Plants"],
  electronics: ["Mobile & Headphones", "Laptop & Desktop", "Smart wearables", "Camera & Accessories", "Home Appliances"],
};

const CategoryPage = () => {
  const { category, subcategory } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedSubs, setSelectedSubs] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedDiscount, setSelectedDiscount] = useState("");

  const [allBrands, setAllBrands] = useState([]);
  const [allColors, setAllColors] = useState([]);
  useEffect(() => {
    // Reset all filters when main category changes
    setSelectedSubs([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setPriceRange([0, 100000]);
    setSelectedDiscount("");
  }, [category]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        const filtered = res.data.filter((p) => {
          const { category: prodCat, subcategory: prodSub } = normalizeCategory(p.category?.name);

          if (prodCat !== category.toLowerCase()) return false;
          if (subcategory && prodSub !== subcategory.replace(/-/g, " ")) return false;
          if (selectedSubs.length > 0 && !selectedSubs.includes(prodSub.toLowerCase())) return false;
          if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand?.toLowerCase())) return false;
          if (selectedColors.length > 0 && !selectedColors.includes(p.color?.toLowerCase())) return false;
          if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
          if (selectedDiscount && p.discount < Number(selectedDiscount)) return false;

          return true;
        });

        setProducts(filtered);
        setAllBrands(Array.from(new Set(res.data.map((p) => p.brand?.toLowerCase()).filter(Boolean))));
        setAllColors(Array.from(new Set(res.data.map((p) => p.color?.toLowerCase()).filter(Boolean))));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory, selectedSubs, selectedBrands, selectedColors, priceRange, selectedDiscount]);

  if (loading) return <div className="text-center py-12 text-lg">Loading...</div>;

  return (
    <div className="max-w-[1400px] mx-auto px-4">
      <div className="py-3 px-8 text-sm text-gray-600 border-b border-gray-200">
        Home / Clothing / <span className="text-black font-medium capitalize">{category}</span>
      </div>

      {/* Top Bar with Clear Filters */}
      <div className="py-8 px-8 border-b border-gray-300 flex justify-between items-center">
        <span className="text-lg font-semibold text-black capitalize">
          {category} Topwear - {products.length} Items
        </span>
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-black">FILTERS</h3>
          <div className="flex items-center gap-2 text-sm">
            <span>Size</span>
            <select className="border border-gray-300 px-2 py-1 rounded">
              <option>All</option>
            </select>
          </div>
          {/* Clear Filters Button */}
          <button
            onClick={() => {
              setSelectedSubs([]);
              setSelectedBrands([]);
              setSelectedColors([]);
              setPriceRange([0, 100000]);
              setSelectedDiscount("");
            }}
            className="ml-4 px-3 py-1 bg-gray-200 text-black rounded hover:bg-gray-300 text-sm font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="flex gap-6 py-5 px-8">
        <Filters
          category={category}
          CATEGORY_OPTIONS={CATEGORY_OPTIONS}
          selectedSubs={selectedSubs}
          selectedBrands={selectedBrands}
          selectedColors={selectedColors}
          priceRange={priceRange}
          selectedDiscount={selectedDiscount}
          allBrands={allBrands}
          allColors={allColors}
          onSubChange={(sub) =>
            setSelectedSubs((prev) =>
              prev.includes(sub.toLowerCase()) ? prev.filter((s) => s !== sub.toLowerCase()) : [...prev, sub.toLowerCase()]
            )
          }
          onBrandChange={(brand) =>
            setSelectedBrands((prev) =>
              prev.includes(brand.toLowerCase()) ? prev.filter((b) => b !== brand.toLowerCase()) : [...prev, brand.toLowerCase()]
            )
          }
          onColorChange={(color) =>
            setSelectedColors((prev) =>
              prev.includes(color.toLowerCase()) ? prev.filter((c) => c !== color.toLowerCase()) : [...prev, color.toLowerCase()]
            )
          }
          onPriceChange={(idx, val) =>
            setPriceRange((prev) => (idx === 0 ? [Number(val), prev[1]] : [prev[0], Number(val)]))
          }
          onDiscountChange={(val) => setSelectedDiscount(val === selectedDiscount ? "" : val)}
          onClearFilters={() => {
            setSelectedSubs([]);
            setSelectedBrands([]);
            setSelectedColors([]);
            setPriceRange([0, 100000]);
            setSelectedDiscount("");
          }}
        />

        {/* Products Grid */}
        <main className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-12 text-lg text-gray-500">No products found.</div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {products.map((p) => (
                <Link
                  to={`/product/${p._id || p.id}`}
                  key={p._id || p.id}
                  className="border border-gray-200 p-3 bg-white cursor-pointer hover:shadow-lg transition-shadow block"
                >
                  <img src={p.image} alt={p.name} className="w-full h-auto" />
                  <h4 className="text-base font-bold text-black mt-2 mb-1">{p.brand}</h4>
                  <p className="text-sm text-gray-600 mb-2 capitalize">{p.name}</p>
                  <div className="flex items-center gap-2 flex-wrap text-sm">
                    <span className="font-bold text-black">Rs.{p.price}</span>
                    {p.originalPrice && <span className="line-through text-gray-400">Rs.{p.originalPrice}</span>}
                    {p.discount && <span className="text-orange-600 font-semibold">({p.discount}% OFF)</span>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
