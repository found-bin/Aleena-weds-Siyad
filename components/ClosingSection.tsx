"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { weddingConfig, weddingImages } from "@/data/weddingConfig";
import IllustratedImage from "@/components/IllustratedImage";

export default function ClosingSection() {
  const currentYear = new Date().getFullYear();
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <section className="relative bg-gradient-to-b from-[#2D352B] via-[#242C23] to-[#1C231B] text-white py-20 sm:py-28 px-6 sm:px-8 text-center overflow-hidden">
        {/* Soft Ambient Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background:
              "radial-gradient(circle at 50% 35%, rgba(198, 173, 118, 0.18) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-[640px] mx-auto flex flex-col items-center"
        >
          {/* Delicate Botanical Accent Branch */}
          <div className="w-40 sm:w-52 mb-6 sm:mb-8 pointer-events-none opacity-90 mx-auto">
            <IllustratedImage
              src={weddingImages.decorations.botanicalAccent.src}
              fallbackSrc={weddingImages.decorations.botanicalAccent.fallbackSrc}
              alt={weddingImages.decorations.botanicalAccent.alt}
              aspectRatio="669/373"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* English Blessing / Dua with Generous Spacing */}
          <p
            className="text-lg sm:text-xl md:text-2xl italic text-[#EDE7DB] mb-8 max-w-[540px] mx-auto leading-relaxed font-light"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            “{weddingConfig.islamic.duaEnglish}”
          </p>

          {/* Refined Gold Separator */}
          <div
            className="flex items-center justify-center gap-3 text-[#C6AD76] mb-8 opacity-70"
            aria-hidden="true"
          >
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C6AD76] to-transparent" />
            <span className="text-[0.65rem] tracking-widest">✦</span>
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C6AD76] to-transparent" />
          </div>

          {/* Couple Names */}
          <div className="flex flex-col items-center justify-center my-4 text-center">
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Aleena Siyad
            </h2>
            <em
              className="my-1 text-sm sm:text-base text-[#B09866] font-normal leading-none"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              with
            </em>
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Siyad T N
            </h2>
          </div>

          {/* Closing Wish with Generous Vertical Space */}
          <p
            className="text-xs sm:text-sm tracking-[0.24em] uppercase text-[#B09866] mt-4 mb-2 font-medium"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {weddingConfig.islamic.closingWish}
          </p>
        </motion.div>
      </section>

      {/* Clean, Harmonious Footer */}
      <footer className="py-8 px-6 bg-[#161C15] text-[#A6B2A2] text-xs text-center border-t border-[#C6AD76]/15">
        <div className="max-w-[500px] mx-auto space-y-2">
          <p className="text-sm font-light text-[#E5DDD0]" style={{ fontFamily: "var(--font-serif)" }}>
            With heartfelt gratitude for your prayers &amp; presence
          </p>
          <p className="text-xs text-[#95A291]">
            Aleena &amp; Siyad &middot; {currentYear}
          </p>
          <div className="pt-2 text-[0.7rem] text-[#7A8776]">
            <span>Designed by </span>
            <a
              href={weddingConfig.brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C6AD76] hover:text-[#E4D5B7] transition-colors underline underline-offset-2"
            >
              {weddingConfig.brand.name}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
