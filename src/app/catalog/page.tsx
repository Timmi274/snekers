import type { Metadata } from "next";
import CatalogClient from "@/components/CatalogClient";

export const metadata: Metadata = {
  title: "Каталог кроссовок",
  description:
    "12 оригинальных моделей Nike, adidas, New Balance, ASICS и Salomon в наличии. Фильтры по бренду, категории и размеру, цены в рублях.",
};

export default function CatalogPage() {
  return <CatalogClient />;
}
