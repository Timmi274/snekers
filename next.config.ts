import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "static.nike.com",
      },
      {
        protocol: "https",
        hostname: "assets.adidas.com",
      },
      {
        protocol: "https",
        hostname: "nb.scene7.com",
      },
      {
        protocol: "https",
        hostname: "images.stockx.com",
      },
      {
        protocol: "https",
        hostname: "cdn-images.farfetch-contents.com",
      },
      {
        protocol: "https",
        hostname: "media.endclothing.com",
      },
      {
        protocol: "https",
        hostname: "image.goat.com",
      },
    ],
  },
};

export default nextConfig;
