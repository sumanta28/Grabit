import React from "react";
import { Helmet } from "react-helmet-async";

export default function Seo({
  title = "Grabit – a multi-vendor online store for everything you need",
  description = "Shop your way with Grabit – An online store designed to fit every part of your lifestyle.",
  canonical = "https://www.grabit.com/",
  image = "https://www.grabit.com/product-image.jpg",
}) {
  return (
    <Helmet>
      {/* Title */}
      <title>{title}</title>

      {/* Meta description */}
      <meta name="description" content={description} />

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Grabit" />
      <meta property="og:image" content={image} />
      <meta
        property="og:image:alt"
        content="Grabit online store for lifestyle shopping across multiple categories"
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@grabit" />
      <meta name="twitter:creator" content="@grabit" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": "${canonical}#service",
          "name": "Grabit",
          "description": "${description}",
          "image": "${image}",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.grabit.com/assets/img/logo.png"
          },
          "url": "${canonical}",
          "serviceType": "Multi-vendor Ecommerce Platform",
          "category": "Ecommerce",
          "providerMobility": "stationary",
          "areaServed": {
            "@type": "Country",
            "name": "India"
          },
          "slogan": "Grabit – An Online Store for Everything You Need"
        }
      `}</script>
    </Helmet>
  );
}
