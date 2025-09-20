import React from "react";
import { Helmet } from "react-helmet-async";

export default function Seo() {
  return (
    <Helmet>
      {/* Title */}
      <title>Grabit – a multi-vendor online store for everything you need</title>

      {/* Meta description */}
      <meta
        name="description"
        content="Shop your way with Grabit – An online store designed to fit every part of your lifestyle."
      />

      {/* Canonical */}
      <link rel="canonical" href="https://www.grabit.com/" />

      {/* Robots */}
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Grabit – a multi-vendor online store for everything you need"
      />
      <meta
        property="og:description"
        content="Shop your way with Grabit – An online store designed to fit every part of your lifestyle."
      />
      <meta property="og:url" content="https://www.grabit.com/" />
      <meta property="og:site_name" content="grabit" />
      <meta
        property="og:image"
        content="https://www.grabit.com/product-image.jpg"
      />
      <meta
        property="og:image:alt"
        content="Grabit online store for lifestyle shopping across multiple categories"
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@grabit" />
      <meta name="twitter:creator" content="@grabit" />
      <meta
        name="twitter:title"
        content="Grabit – a multi-vendor online store for everything you need"
      />
      <meta
        name="twitter:description"
        content="Shop your way with Grabit – An online store designed to fit every part of your lifestyle."
      />
      <meta
        name="twitter:image"
        content="https://www.grabit.com/product-image.jpg"
      />

      {/* Structured Data */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": "https://www.grabit.com/#service",
          "name": "Grabit",
          "description": "Grabit is a multi-vendor ecommerce service that connects buyers and sellers on a single platform.",
          "disambiguatingDescription": "An ecommerce platform, not to be confused with delivery or cashback sites.",
          "image": "https://www.grabit.com/assets/img/main-image.jpg",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.grabit.com/assets/img/logo.png"
          },
          "url": "https://www.grabit.com/",
          "serviceType": "Multi-vendor Ecommerce Platform",
          "category": "Ecommerce",
          "providerMobility": "stationary",
          "termsOfService": "https://www.grabit.com/terms",
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
