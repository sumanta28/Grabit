import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility to merge Tailwind classes
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Image URL builder
export const getImg = (image) => {
  return `https://bazario-backend-vmlz.onrender.com${image}`;
};
