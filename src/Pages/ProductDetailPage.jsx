import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Heart, Truck } from "lucide-react";
import axiosInstance from "../lib/axiosInstance";
import Seo from "../Components/Seo"

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        setProduct(res.data);
        setSelectedImage(res.data.image);

        const all = await axiosInstance.get("/products");
        const related = all.data.filter(
          (p) =>
            p.category?.name === res.data.category?.name &&
            (p._id || p.id) !== id
        );
        setSimilar(related.slice(0, 10)); // show 10 products (2 rows)
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);
  // 1️⃣ Add this function below your useEffect:
  const addToCart = async () => {
    if (!selectedSize && product.sizes?.length > 0) {
      alert("Please select a size before adding to cart");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first to add items to your cart");
        navigate("/login");
        return;
      }
      console.log("Product object:", product);

      // Ensure product is a string
      const payload = {
        productId: String(product._id),
        quantity: 1,
      };

      console.log("Sending to cart:", payload);

      const res = await axiosInstance.post(
        "/carts",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201 || res.status === 200) {
        alert("✅ Product added to your cart successfully!");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("❌ Failed to add product to cart.");
    }
  };



  if (!product) return <div className="text-center py-10">Loading...</div>;

  const sizes = product.sizes || [];
  const rating = product.rating || 0;
  const reviewCount = product.reviewCount || 0;
  const reviews = product.reviews || [];

  return (
    <>
      <Seo
        title={`${product.name} | Grabit`}
        description={product.description?.slice(0, 155) || "Shop with Grabit – best multi-vendor online store."}
        canonical={`https://www.grabit.com/product/${id}`}
        image={product.image || "https://www.grabit.com/default-image.jpg"}
      />

      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-600 mb-4">
          Home / {product.category?.name} / Men Top Wear / <span className="font-medium text-gray-800">{product.name}</span>
        </div>

        <div className="flex gap-6">
          {/* Left side - images */}
          <div className="flex gap-3 w-1/2">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2">
              <img
                src={product.image}
                alt={product.name}
                className={`w-16 h-20 object-cover border-2 rounded cursor-pointer ${selectedImage === product.image ? 'border-pink-500' : 'border-gray-200'}`}
                onClick={() => setSelectedImage(product.image)}
              />
              {product.images && product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className={`w-16 h-20 object-cover border-2 rounded cursor-pointer ${selectedImage === img ? 'border-pink-500' : 'border-gray-200'}`}
                  alt="thumbnail"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 relative">
              <button className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50">
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Right side - details */}
          <div className="w-1/2">
            <h1 className="text-xl font-bold mb-1">{product.brand}</h1>
            <p className="text-sm text-gray-600 mb-2">{product.name}</p>

            {/* Rating */}
            {rating > 0 && (
              <div className="flex items-center gap-2 mb-3 pb-3 border-b">
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-green-600 text-white rounded text-xs font-medium">
                  <span>{rating}</span>
                  <Star className="w-3 h-3 fill-white" />
                </div>
                <span className="text-gray-600 text-xs">({reviewCount} Ratings)</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold text-black">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="line-through text-gray-400 text-base">
                    MRP ₹{product.originalPrice}
                  </span>
                  <span className="text-orange-500 text-sm font-semibold">
                    ({product.discount || Math.round((1 - product.price / product.originalPrice) * 100)}% OFF)
                  </span>
                </>
              )}
            </div>

            <p className="mb-4 text-xs text-green-700 font-medium">
              Inclusive Of All Taxes
            </p>

            {/* Size selection */}
            {sizes.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold">SELECT SIZE</span>
                  <button className="text-pink-600 text-xs font-medium">SIZE CHART →</button>
                </div>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 rounded-full border-2 text-sm font-medium ${selectedSize === size
                        ? 'border-pink-500 text-pink-500'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color */}
            {product.color && (
              <div className="mb-4">
                <div className="mb-2">
                  <span className="text-xs font-medium">COLOR: </span>
                  <span className="text-xs text-gray-600">{product.color}</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-12 h-12 rounded border-2 border-pink-500 overflow-hidden cursor-pointer">
                    <img src={product.image} alt="color" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={addToCart}
                className="flex-1 bg-pink-600 text-white py-2 rounded text-sm font-semibold hover:bg-pink-700"
              >
                ADD TO CART
              </button>


              <button className="flex-1 bg-white border-2 border-gray-300 py-2 rounded text-sm font-semibold hover:border-gray-400">
                BUY NOW
              </button>
            </div>

            {/* Delivery options */}
            <div className="mb-4 border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold">
                <Truck className="w-4 h-4" />
                DELIVERY OPTIONS
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1 border rounded px-2 py-1.5 text-xs"
                />
                <button className="text-pink-600 font-semibold text-xs px-3">Check</button>
              </div>
              <p className="text-xs text-gray-500 mt-1.5">
                Please enter PIN code to check delivery time & Pay on Delivery Availability
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-1 text-xs mb-4">
              <p className="font-medium">100% ORIGINAL PRODUCTS</p>
              <p>PAY ON DELIVERY MIGHT BE AVAILABLE</p>
              <p>EASY 7 DAYS RETURNS AND EXCHANGES</p>
            </div>

            {/* Best Offers */}
            {product.offers && product.offers.length > 0 && (
              <div className="border-t pt-3 mb-4">
                <div className="flex items-center gap-2 text-xs font-semibold mb-2">
                  <span>🏷️</span>
                  BEST OFFERS
                </div>
                <div className="space-y-2 text-xs">
                  {product.offers.map((offer, i) => (
                    <div key={i}>
                      <p className="font-medium">{offer.title}</p>
                      <p className="text-gray-600">{offer.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Details */}
            <div className="border-t pt-3">
              <button className="flex items-center justify-between w-full text-xs font-semibold mb-2">
                <span>PRODUCT DETAILS</span>
                <span>▲</span>
              </button>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {product.material && (
                  <div>
                    <p className="text-gray-600">Material:</p>
                    <p className="font-medium">{product.material}</p>
                  </div>
                )}
                {product.fit && (
                  <div>
                    <p className="text-gray-600">Fit:</p>
                    <p className="font-medium">{product.fit}</p>
                  </div>
                )}
                {product.sleeves && (
                  <div>
                    <p className="text-gray-600">Sleeves:</p>
                    <p className="font-medium">{product.sleeves}</p>
                  </div>
                )}
                {product.pattern && (
                  <div>
                    <p className="text-gray-600">Pattern:</p>
                    <p className="font-medium">{product.pattern}</p>
                  </div>
                )}
                {product.color && (
                  <div>
                    <p className="text-gray-600">Color:</p>
                    <p className="font-medium">{product.color}</p>
                  </div>
                )}
                {product.occasion && (
                  <div>
                    <p className="text-gray-600">Occasion:</p>
                    <p className="font-medium">{product.occasion}</p>
                  </div>
                )}
                {product.productType && (
                  <div>
                    <p className="text-gray-600">Product Type:</p>
                    <p className="font-medium">{product.productType}</p>
                  </div>
                )}
                {product.neck && (
                  <div>
                    <p className="text-gray-600">Neck:</p>
                    <p className="font-medium">{product.neck}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ratings & Reviews */}
        {reviews.length > 0 && (
          <div className="mt-8 border-t pt-6">
            <h2 className="text-lg font-bold mb-4">RATINGS & REVIEWS</h2>
            <div className="flex gap-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{rating}<Star className="inline w-6 h-6 fill-gray-400 text-gray-400 ml-1" /></div>
                <p className="text-gray-600 text-xs">{reviewCount} Verified Buyer</p>
              </div>
              <div className="flex-1">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = reviews.filter(r => r.rating === stars).length;
                  const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
                  return (
                    <div key={stars} className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs w-3">{stars}</span>
                      <Star className="w-3 h-3 fill-green-600 text-green-600" />
                      <div className="flex-1 bg-gray-200 h-1.5 rounded overflow-hidden">
                        <div
                          className="bg-green-600 h-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs w-6">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              {reviews.slice(0, 2).map((review, i) => (
                <div key={i} className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="flex">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className={`w-3 h-3 ${idx < review.rating ? 'fill-green-600 text-green-600' : 'fill-gray-300 text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs mb-1.5">{review.comment}</p>
                  <p className="text-xs text-gray-500">{review.author} | {review.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Products */}
        {similar.length > 0 && (
          <div className="mt-8 border-t pt-6">
            <h2 className="text-lg font-bold mb-4">SIMILAR PRODUCTS</h2>
            <div className="grid grid-cols-5 gap-3">
              {similar.map((item) => (
                <div
                  key={item._id || item.id}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    navigate(`/product/${item._id || item.id}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  tabIndex={0}
                  role="button"
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate(`/product/${item._id || item.id}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                >
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-2">
                    <h4 className="font-semibold text-xs">{item.brand}</h4>
                    <p className="text-xs text-gray-500 mb-1 truncate">{item.name}</p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-sm">₹{item.price}</span>
                      {item.originalPrice && (
                        <>
                          <span className="line-through text-gray-400 text-xs">₹{item.originalPrice}</span>
                          <span className="text-orange-500 text-xs">({item.discount || Math.round((1 - item.price / item.originalPrice) * 100)}% OFF)</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>

  );
}