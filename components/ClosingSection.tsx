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
      <section className="relative bg-gradient-to-b from-[#2D352B] via-[#242C23] to-[#1C231B] text-white py-10 sm:py-14 px-4 sm:px-6 text-center overflow-hidden">
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
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-[640px] mx-auto flex flex-col items-center"
        >
          {/* Delicate Botanical Accent Branch */}
          <div className="w-28 sm:w-36 mb-2.5 sm:mb-3 pointer-events-none opacity-90 mx-auto">
            <IllustratedImage
              src={weddingImages.decorations.botanicalAccent.src}
              fallbackSrc={weddingImages.decorations.botanicalAccent.fallbackSrc}
              alt={weddingImages.decorations.botanicalAccent.alt}
              aspectRatio="669/373"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* English Blessing / Dua — Balanced Spacing */}
          <p
            className="text-base sm:text-xl md:text-2xl italic text-[#EDE7DB] mb-2.5 sm:mb-3 max-w-[540px] mx-auto leading-relaxed font-light"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            “{weddingConfig.islamic.duaEnglish}”
          </p>

          {/* Refined Gold Separator */}
          <div
            className="flex items-center justify-center gap-3 text-[#C6AD76] mb-2.5 sm:mb-3 opacity-70"
            aria-hidden="true"
          >
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C6AD76] to-transparent" />
            <span className="text-[0.65rem] tracking-widest">✦</span>
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C6AD76] to-transparent" />
          </div>

          {/* Couple Names — Romantic Calligraphy */}
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-1 my-1.5 sm:my-2 text-center">
            <h2
              className="text-[clamp(1.9rem,5.5vw,3.25rem)] font-normal text-white tracking-wide leading-tight whitespace-nowrap"
              style={{ fontFamily: "var(--font-calligraphy)" }}
            >
              Aleena Siyad
            </h2>
            <span
              className="text-base sm:text-2xl text-[#C6AD76] italic font-serif leading-none px-1"
              aria-label="and"
            >
              &amp;
            </span>
            <h2
              className="text-[clamp(1.9rem,5.5vw,3.25rem)] font-normal text-white tracking-wide leading-tight whitespace-nowrap"
              style={{ fontFamily: "var(--font-calligraphy)" }}
            >
              Siyad TN
            </h2>
          </div>

          {/* Closing Wish */}
          <p
            className="text-xs sm:text-sm tracking-[0.24em] uppercase text-[#B09866] mt-2 mb-1 font-medium"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {weddingConfig.islamic.closingWish}
          </p>

          {/* Date & Venue Reminder Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B09866]/40 bg-[#242C23]/90 text-[#EDE7DB] text-[0.72rem] sm:text-xs tracking-wider mt-2.5 shadow-sm">
            <span>13 December 2026</span>
            <span className="text-[#B09866]">&middot;</span>
            <span>Kuthiathode &amp; Chandiroor</span>
          </div>
        </motion.div>
      </section>

      {/* Clean, Harmonious Footer with Safe-Area aware bottom padding to prevent audio overlap */}
      <footer className="pt-6 pb-14 sm:pb-8 px-6 bg-[#161C15] text-[#A6B2A2] text-xs text-center border-t border-[#C6AD76]/15">
        <div className="max-w-[500px] mx-auto space-y-1.5">
          <p className="text-sm font-light text-[#E5DDD0]" style={{ fontFamily: "var(--font-serif)" }}>
            With heartfelt gratitude for your prayers &amp; presence
          </p>
          <p className="text-xs text-[#95A291]">
            Aleena &amp; Siyad &middot; {currentYear}
          </p>
          <div className="pt-1.5 text-[0.7rem] text-[#7A8776]">
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
