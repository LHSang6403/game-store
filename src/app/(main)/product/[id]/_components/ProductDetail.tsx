"use client";

import { useState, useEffect } from "react";
import Title from "@/app/(main)/product/[id]/_components/Title";
import ProductActions from "@/app/(main)/product/[id]/_components/ProductActions";
import ProductImages from "@/app/(main)/product/[id]/_components/ProductImages";
import AlternateTitle from "@/app/(main)/product/[id]/_components/AlternateTitle";
import type { ProductWithDescriptionAndStorageType } from "@utils/types/index";

export default function ProductDetail({
  product,
}: {
  product: ProductWithDescriptionAndStorageType;
}) {
  const [showAlternateTitle, setShowAlternateTitle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const titleElement = document.getElementById("main-title");
      if (!titleElement) return;

      const rect = titleElement.getBoundingClientRect();
      if (rect.bottom < 0) {
        setShowAlternateTitle(true);
      } else {
        setShowAlternateTitle(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative z-10 flex h-fit w-full flex-col xl:flex-row">
      <div className="h-fit xl:w-3/5 w-full md:p-0 px-3">
        <ProductImages images={product.product.images} />
      </div>
      <div className="flex xl:w-2/5 flex-col h-fit gap-4 pr-10 xl:pt-28 md:w-full md:px-12 md:pt-10 w-full pt-0 px-4">
        <ProductActions product={product} />
      </div>
      {showAlternateTitle ? (
        <AlternateTitle
          brand={product.product.brand}
          name={product.product.name}
        />
      ) : null}
      <Title brand={product.product.brand} name={product.product.name} />
    </div>
  );
}
