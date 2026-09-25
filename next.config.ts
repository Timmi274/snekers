import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Все изображения товаров лежат локально в /public/products
    // (официальные продуктные фото с сайтов производителей).
    remotePatterns: [],
  },
};

export default nextConfig;
