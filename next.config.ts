import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Permet de générer des fichiers HTML statiques
  images: {
    unoptimized: true, // Nécessaire pour GitHub Pages
  },
};

export default nextConfig;
