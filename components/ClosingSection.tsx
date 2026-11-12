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
          <div className="w-36 sm:w-44 mb-8 opacity-75 pointer-events-none">
            <IllustratedImage
              src={weddingImages.decorations.botanicalAccent.src}
              fallbackSrc={weddingImages.decorations.botanicalAccent.fallbackSrc}
              alt=""
              aspectRatio="20/9"
              className="w-full h-full object-contain filter invert contrast-125 opacity-70"
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

          {/* Couple Names — Single Line */}
          <h2
            className="text-[clamp(1.4rem,4.4vw,2.75rem)] font-normal text-white leading-tight mb-4 tracking-wide whitespace-nowrap text-center"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <span>{weddingConfig.couple.bride.fullName}</span>{" "}
            <span
              className="text-[#C6AD76] italic font-normal text-[0.85em] mx-1.5"
              style={{ fontFamily: "var(--font-script)" }}
            >
              &amp;
            </span>{" "}
            <span>{weddingConfig.couple.groom.fullName}</span>
          </h2>

          {/* Closing Wish with Generous Vertical Space */}
          <p
            className="text-xs sm:text-sm tracking-[0.24em] uppercase text-[#C6AD76] mb-8 font-medium"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {weddingConfig.islamic.closingWish}
          </p>

          {/* Refined Date & Venue Identifier */}
          <div className="inline-block text-[0.72rem] sm:text-xs tracking-[0.22em] text-[#D8CFBC] uppercase border border-[#C6AD76]/30 rounded-full px-6 py-2.5 bg-white/[0.03] backdrop-blur-sm">
            13 December 2026 &middot; Kuthiathode Juma Masjid
          </div>
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
