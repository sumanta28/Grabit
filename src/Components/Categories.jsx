import React from "react";
import "../Styles/Categories.css";


import photo1 from "../assets/Home/Categories/PHOTO 1.png";
import photo2 from "../assets/Home/Categories/PHOTO 2.png";
import photo3 from "../assets/Home/Categories/PHOTO 3.png";
import photo4 from "../assets/Home/Categories/PHOTO 4.png";
import photo5 from "../assets/Home/Categories/PHOTO 5.png";
import photo6 from "../assets/Home/Categories/PHOTO 6.png";
import photo7 from "../assets/Home/Categories/PHOTO 7.png";
import photo8 from "../assets/Home/Categories/PHOTO 8.png";
import photo9 from "../assets/Home/Categories/PHOTO 9.png";
import photo10 from "../assets/Home/Categories/PHOTO 10.png";
import photo11 from "../assets/Home/Categories/PHOTO 11.png";
import photo12 from "../assets/Home/Categories/PHOTO 12.png";
import photo13 from "../assets/Home/Categories/PHOTO 13.png";
import photo14 from "../assets/Home/Categories/PHOTO 14.png";
import photo15 from "../assets/Home/Categories/PHOTO 15.png";
import photo16 from "../assets/Home/Categories/PHOTO 16.png";

const items = [
  { title: "Ethnic Wear", discount: "50-80% OFF", image: photo1 },
  { title: "Western Wear", discount: "70-80% OFF", image: photo2 },
  { title: "Smart Wearables", discount: "70-80% OFF", image: photo3 },
  { title: "Footwear", discount: "50-80% OFF", image: photo4 },
  { title: "Indoor Plants", discount: "Flat 50% OFF", image: photo5 },
  { title: "Furniture & Storage", discount: "50-60% OFF", image: photo6 },
  { title: "Home Appliances", discount: "Up to 40% OFF", image: photo7 },
  { title: "Jewellery & Accessories", discount: "Up to 50% OFF", image: photo8 },
  { title: "Kids Clothing", discount: "40-50% OFF", image: photo9 },
  { title: "Toys & Games", discount: "Up to 60% OFF", image: photo10 },
  { title: "Footwear", discount: "Up to 40% OFF", image: photo11 },
  { title: "Beauty & Personal Care", discount: "Flat 30% OFF", image: photo12 },
  { title: "Laptop & Desktop", discount: "40-50% OFF", image: photo13 },
  { title: "Men Fashion Accessories", discount: "Up to 60% OFF", image: photo14 },
  { title: "Kitchen Decor", discount: "Up to 40% OFF", image: photo15 },
  { title: "Lamps & Lighting", discount: "Flat 50% OFF", image: photo16 },
];

export default function Categories() {
  return (
    <section className="category py-20">
      <div className="container mx-auto px-6">
        <div className="by mb-6">
          <h3 className="shop-heading">SHOP BY CATEGORY</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="category-card relative rounded-2xl overflow-hidden h-96"
            >

              <div
                className="absolute inset-0 bg-center bg-cover card-bg"
                style={{ backgroundImage: `url(${item.image})` }}
                aria-hidden="true"
              />


              <div className="shop-overlay absolute bottom-0 left-0 w-full text-center">
                <h4 className="shop-title">{item.title}</h4>
                <h3 className="shop-discount">{item.discount}</h3>
                <h6 className="shop-action">Shop Now</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
