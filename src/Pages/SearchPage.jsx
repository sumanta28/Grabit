// SearchPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";
import { getImg } from "../lib/utils";

const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query")?.toLowerCase() || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        const filtered = res.data.filter(
          (p) =>
            p.name?.toLowerCase().includes(query) ||
            p.brand?.toLowerCase().includes(query)
        );
        setProducts(filtered);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (query) fetchProducts();
  }, [query]);

  if (loading) return <div className="text-center py-12 text-lg">Loading...</div>;
  if (!query) return <div className="text-center py-12 text-lg">Please enter a search term</div>;

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <h2 className="text-lg font-semibold mb-6">Search results for: "{query}"</h2>

      {products.length === 0 ? (
        <div className="text-center py-12 text-lg text-gray-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <Link
              to={`/product/${p._id || p.id}`}
              key={p._id || p.id}
              className="border border-gray-200 p-3 bg-white cursor-pointer hover:shadow-lg transition-shadow block"
            >
              <img src={getImg(p.image)} alt={p.name} className="w-full h-auto object-cover rounded" />
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
    </div>
  );
};

export default SearchPage;
