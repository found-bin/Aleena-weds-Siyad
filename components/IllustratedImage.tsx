"use client";

import React, { useState, useEffect, useRef } from "react";

interface IllustratedImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  aspectRatio?: string; // e.g. "4/5", "16/10", "1/1"
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  sizes?: string;
  caption?: string;
}

export default function IllustratedImage({
  src,
  fallbackSrc,
  alt,
  aspectRatio = "16/10",
  className = "",
  containerClassName = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  caption
}: IllustratedImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const attemptedAltPrefixRef = useRef(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Synchronize currentSrc when src prop changes
  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    attemptedAltPrefixRef.current = false;
  }, [src]);

  // Check if image is already cached/complete on mount
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [currentSrc]);

  const handleError = () => {
    // 1. First, attempt alternate basePath prefix if running in different environment
    if (!attemptedAltPrefixRef.current) {
      attemptedAltPrefixRef.current = true;
      const subpath = "/wedding_invite_one";
      if (currentSrc.includes(subpath)) {
        // Strip subpath
        const stripped = currentSrc.replace(subpath, "");
        setCurrentSrc(stripped);
        return;
      } else if (!currentSrc.startsWith("http")) {
        // Add subpath
        const prefixed = `${subpath}${currentSrc.startsWith("/") ? currentSrc : `/${currentSrc}`}`;
        setCurrentSrc(prefixed);
        return;
      }
    }

    // 2. Next, try fallbackSrc if provided
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }

    // 3. Only if all fail, show graceful placeholder
    setHasError(true);
  };

  return (
    <figure
      className={`relative overflow-hidden w-full ${containerClassName}`}
      style={{ aspectRatio }}
    >
      {!hasError ? (
        <>
          {/* Soft ivory background */}
          <div
            className={`absolute inset-0 bg-[#F7F3E9] transition-opacity duration-500 pointer-events-none ${
              isLoaded ? "opacity-0" : "opacity-100"
            }`}
            aria-hidden="true"
          />

          <img
            ref={imgRef}
            src={currentSrc}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            sizes={sizes}
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
            className={`w-full h-full object-cover object-center transition-all duration-500 ease-out ${
              isLoaded ? "opacity-100 scale-100" : "opacity-90 scale-[1.01]"
            } ${className}`}
          />
        </>
      ) : (
        /* Graceful Botanical Illustration Fallback */
        <div className="absolute inset-0 bg-gradient-to-br from-[#F7F3E9] via-[#FFFEFA] to-[#EBE4D5] flex flex-col items-center justify-center p-6 text-center border border-[#C6AD76]/30">
          <span
            className="text-xs uppercase tracking-[0.2em] text-[#74866D] font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Aleena &amp; Siyad
          </span>
          <p className="text-[0.7rem] text-[#817E72] mt-1 max-w-[200px] leading-tight">
            {alt}
          </p>
        </div>
      )}

      {caption && (
        <figcaption className="sr-only">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
