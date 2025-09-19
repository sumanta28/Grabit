import React, { useRef, useState, useEffect } from "react";
import "../Styles/PriceDrop.css";
import { Heart, ShoppingCart, Check, ChevronLeft, ChevronRight } from "lucide-react";

import pic1 from "../../src/assets/Home/PriceDrop/pic1.jpg";
import pic2 from "../../src/assets/Home/PriceDrop/pic2.jpg";
import pic3 from "../../src/assets/Home/PriceDrop/pic3.jpg";
import pic4 from "../../src/assets/Home/PriceDrop/pic4.jpg";
import pic5 from "../../src/assets/Home/PriceDrop/pic5.jpg";
import pic6 from "../../src/assets/Home/PriceDrop/pic6.jpg";
import pic7 from "../../src/assets/Home/PriceDrop/pic7.jpg";

const products = [
  { id: 1, img: pic1, brand: "Just Herbs", title: "Vitamin C Glow Serum", oldPrice: 1490, price: 1267, discount: "15%" },
  { id: 2, img: pic2, brand: "Halo", title: "Night Extrad De Petium", oldPrice: 2890, price: 2023, discount: "30%" },
  { id: 3, img: pic3, brand: "ZARA", title: "Co-ords Set", oldPrice: 2990, price: 2093, discount: "30%" },
  { id: 4, img: pic4, brand: "Apkamart", title: "Flower Vase Marble", oldPrice: 4000, price: 1799, discount: "55%" },
  { id: 5, img: pic5, brand: "BoAt", title: "Stone SpinX Pro", oldPrice: 9999, price: 2299, discount: "77%" },
  { id: 6, img: pic6, brand: "New Balance", title: "Gradient Retro Square", oldPrice: 13175, price: 3389, discount: "74%" },
  { id: 7, img: pic7, brand: "GIVA", title: "Stone Jewellery", oldPrice: 1590, price: 1193, discount: "24%" },
];

export default function PriceDrop() {
  const rowRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [cartIds, setCartIds] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  const updateArrows = () => {
    const el = rowRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 5);
    setShowRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 5);
  };

  useEffect(() => {
    updateArrows();
    const el = rowRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scroll = (dir = 1) => {
    const el = rowRef.current;
    if (!el) return;
    const distance = Math.round(el.clientWidth * 0.7);
    el.scrollBy({ left: dir * distance, behavior: "smooth" });
    setTimeout(updateArrows, 400);
  };

  const toggleCart = (id) => {
    setCartIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleWishlist = (id) => {
    setWishlistIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <section className="price-drop">
      <div className="price-drop-container">
   
        <div className="price-drop-header">
          <h2 className="price-drop-title">Price Drop!!</h2>
        </div>

        <div className="products-container">
          <div ref={rowRef} className="products-row">
            {products.map((product) => {
              const inCart = cartIds.includes(product.id);
              const inWishlist = wishlistIds.includes(product.id);
              
              return (
                <div key={product.id} className="product-card">
              
                  <div className="product-image-container">
                    <img
                      src={product.img}
                      alt={`${product.brand} ${product.title}`}
                      className="product-image"
                    />
                    
           
                    <div className="discount-badge">
                      {product.discount} OFF
                    </div>

                
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
                      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart size={16} fill={inWishlist ? "currentColor" : "none"} />
                    </button>
                  </div>

   
                  <div className="product-details">
                    <div className="product-info">
                      <h3 className="product-brand">{product.brand}</h3>
                      <p className="product-title">{product.title}</p>
                    </div>

                    <div className="product-footer">
                      <div className="price-section">
                        <div className="old-price">
                          <span>₹</span>
                          <span>{product.oldPrice.toLocaleString()}</span>
                        </div>
                        <div className="current-price">
                          <span>₹</span>
                          <span>{product.price.toLocaleString()}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleCart(product.id)}
                        className={`add-cart-btn ${inCart ? 'added' : ''}`}
                        aria-label={inCart ? "Remove from cart" : "Add to cart"}
                      >
                        {inCart ? (
                          <>
                            <Check size={16} />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={16} />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

     
          <div className="nav-overlay">
            {showLeft && (
              <button
                onClick={() => scroll(-1)}
                className="nav-arrow nav-left"
                aria-label="Previous products"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            
            {showRight && (
              <button
                onClick={() => scroll(1)}
                className="nav-arrow nav-right"
                aria-label="Next products"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}