"use client";

import { useState, useEffect } from "react";
import Decoration from "@app/(main)/product/[id]/Components/Decoration";
import Title from "@app/(main)/product/[id]/Components/Title";
import ProductActions from "@app/(main)/product/[id]/Components/ProductActions";
import ProductImages from "@app/(main)/product/[id]/Components/ProductImages";
import AlternateTitle from "@app/(main)/product/[id]/Components/AlternateTitle";
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
    <div className="relative flex h-fit min-h-[90vh] flex-row pb-6 xl:flex-col">
      <div className="absolute -z-10 ml-12 h-full w-[60%] -skew-x-[20deg] transform rounded-2xl bg-gradient-to-r from-foreground/5 xl:ml-4 sm:ml-0"></div>
      <div className="h-fit w-3/5 pl-10 xl:w-full xl:p-0 sm:px-2">
        <ProductImages images={product.product.images} />
      </div>
      <div className="flex w-2/5 flex-col gap-4 px-6 pt-28 xl:mx-auto xl:w-[80%] xl:pt-10 lg:w-[90%] lg:pt-0 sm:w-full">
        <ProductActions product={product} />
      </div>
      <Decoration />
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
