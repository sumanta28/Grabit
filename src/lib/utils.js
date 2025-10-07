import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// Combines Tailwind and conditional classes cleanly
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Returns the full image URL (works for your Bazario backend)
// export const getImg = (image) => {
//   if (!image) return ""; // avoids "undefined" URLs
//   return `https://bazario-backend-vmlz.onrender.com${image}`;
// };

export const getImg = (image) => {
  if (!image) return "/placeholder.png";
  return `https://bazario-backend-vmlz.onrender.com${image}`;
};

