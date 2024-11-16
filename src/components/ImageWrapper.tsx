"use client";

import Image from "next/image";
import React from "react";
import cn from "classnames";
import { Skeleton } from "@/components/ui/skeleton";

interface ImageWrapperProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio?: number;
  quality?: number;
  priority?: boolean;
  className?: string;
  customLoadingClassName?: string;
  style?: React.CSSProperties;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  isLoading: boolean;
  onLoad?: () => void;
  lazyLoad?: boolean;
}

export default function ImageWrapper({
  src,
  alt,
  width,
  height,
  quality = 100,
  priority = false,
  className = "",
  customLoadingClassName = "",
  objectFit = "cover",
  objectPosition = "center",
  isLoading,
  onLoad,
}: ImageWrapperProps) {
  return (
    <div
      className={cn(
        "center relative overflow-hidden rounded-lg shadow-xl",
        className
      )}
    >
      {isLoading && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-1 transition-opacity duration-500"
          style={{
            opacity: isLoading ? 1 : 0,
          }}
        >
          <Skeleton
            className={cn(
              "h-full w-full animate-pulse bg-foreground/10",
              customLoadingClassName
            )}
          />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        style={{
          objectFit,
          objectPosition,
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
        onLoadingComplete={onLoad}
      />
    </div>
  );
}
