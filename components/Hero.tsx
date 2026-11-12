"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { weddingConfig, weddingImages, assetPath } from "@/data/weddingConfig";
import IllustratedImage from "@/components/IllustratedImage";
import { Calendar, ChevronDown } from "lucide-react";

interface HeroProps {
  onAddToCalendar: () => void;
}

export default function Hero({ onAddToCalendar }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="relative w-full flex flex-col items-center text-center px-4 sm:px-6 pt-[max(2rem,env(safe-area-inset-top))] pb-8 sm:pb-12 overflow-hidden">
      {/* Decorative Sage Divider Top */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-[200px] sm:max-w-[260px] mb-3 opacity-80 pointer-events-none mx-auto"
        aria-hidden="true"
      >
        <img
          src={assetPath("/assets/sage-divider.svg")}
          alt=""
          className="w-full h-auto"
        />
      </motion.div>

      <div className="w-full max-w-[720px] mx-auto relative z-10 flex flex-col items-center">
        {/* Arabic Bismillah & English Translation with Generous, Balanced Spacing */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-4 sm:mb-6 max-w-[580px] mx-auto w-full text-center"
        >
          {/* Sacred Arabic Text */}
          <p
            lang="ar"
            dir="rtl"
            className="font-arabic text-[clamp(1.75rem,4.4vw,2.65rem)] text-[#2F372C] font-normal leading-[2.1] tracking-wide select-text text-center"
          >
            {weddingConfig.islamic.bismillahArabic}
          </p>

          {/* English Translation — Subtle, Clean Italic Serif */}
          <p
            className="text-[0.72rem] sm:text-xs italic text-[#74866D] mt-2.5 sm:mt-3 font-normal tracking-[0.04em] max-w-[460px] mx-auto leading-relaxed opacity-90"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            “{weddingConfig.islamic.bismillahEnglish}”
          </p>
        </motion.div>

        {/* Feature Couple Photograph / Portrait Frame */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.25, ease: "easeOut" }}
          className="relative my-3 sm:my-5 mx-auto w-full max-w-[240px] sm:max-w-[280px] md:max-w-[300px]"
        >
          <div className="p-2 sm:p-2.5 rounded-2xl bg-[#FFFEFA] border border-[#B09866]/40 shadow-[0_10px_30px_-6px_rgba(52,60,50,0.12)]">
            <div className="overflow-hidden rounded-xl bg-[#FBF9F4]">
              <IllustratedImage
                src={weddingImages.couple.illustration.src}
                fallbackSrc={weddingImages.couple.illustration.fallbackSrc}
                alt={weddingImages.couple.illustration.alt}
                aspectRatio="4/5"
                priority={true}
                className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </motion.div>

        {/* Lead Invitation Text */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.35 }}
          className="w-full mt-1"
        >
          <p
            className="text-[0.68rem] sm:text-xs tracking-[0.28em] text-[#74866D] font-bold mb-1.5 uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            TOGETHER WITH THEIR FAMILIES
          </p>
          <p
            className="hero-lead-text italic text-[#4A5335] max-w-[560px] mx-auto mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm md:text-base font-normal"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            We cordially invite you to celebrate the Nikah of
          </p>
        </motion.div>

        {/* Couple Names — Large, Romantic, Stacked with 'with' */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.45 }}
          className="my-3 sm:my-4 w-full flex flex-col items-center justify-center text-center"
        >
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-normal text-[#343C32] tracking-tight leading-tight select-text"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Aleena Siyad
          </h1>
          <div className="flex items-center justify-center gap-3 my-1.5 sm:my-2" aria-hidden="true">
            <span className="w-8 sm:w-12 h-[1px] bg-[#B09866]/40" />
            <em
              className="text-sm sm:text-base md:text-lg text-[#B09866] font-normal leading-none"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              with
            </em>
            <span className="w-8 sm:w-12 h-[1px] bg-[#B09866]/40" />
          </div>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-normal text-[#343C32] tracking-tight leading-tight select-text"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Siyad T N
          </h1>
        </motion.div>

        {/* Groom Lineage Subtext — No S/o Prefix */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.55 }}
          className="text-xs sm:text-sm text-[#4A5335] max-w-[520px] mx-auto leading-relaxed my-2"
        >
          <strong className="text-[#343C32] font-semibold block mb-0.5">
            Mr. Nazar T M &amp; Mrs. Jumailath
          </strong>
          <span className="text-[#817E72] text-[0.76rem] sm:text-xs block">
            Thankichira, CMC 33, Cherthala
          </span>
        </motion.div>

        {/* Sacred Insha'Allah Blessing — Clean Italic Serif Font */}
        <p
          className="text-xl sm:text-2xl italic text-[#4A5335] my-2.5 sm:my-3 font-normal tracking-wide select-text"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Insha&apos;Allah
        </p>

        {/* Date & Venue Distinct Stationery Containers */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.65 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-[560px] mx-auto my-3 sm:my-4 px-1"
        >
          {/* Wedding Date Container */}
          <div className="bg-[#FFFEFA] border border-[#B09866]/40 rounded-2xl p-4 text-center flex flex-col justify-center items-center shadow-[0_4px_16px_-4px_rgba(52,60,50,0.08)]">
            <span
              className="text-[0.62rem] sm:text-[0.68rem] tracking-[0.22em] text-[#74866D] font-bold uppercase mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WEDDING DATE
            </span>
            <strong
              className="text-base sm:text-lg font-bold text-[#343C32] tracking-wide"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              13 December 2026
            </strong>
            <span className="text-[0.72rem] sm:text-xs text-[#817E72] mt-0.5">
              Sunday
            </span>
          </div>

          {/* Nikah Ceremony & Venue Container */}
          <div className="bg-[#FFFEFA] border border-[#B09866]/40 rounded-2xl p-4 text-center flex flex-col justify-center items-center shadow-[0_4px_16px_-4px_rgba(52,60,50,0.08)]">
            <span
              className="text-[0.62rem] sm:text-[0.68rem] tracking-[0.22em] text-[#74866D] font-bold uppercase mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              NIKAH CEREMONY &amp; VENUE
            </span>
            <strong
              className="text-base sm:text-lg font-bold text-[#343C32] tracking-wide"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              11:00 AM IST
            </strong>
            <span className="text-[0.72rem] sm:text-xs text-[#817E72] mt-0.5">
              Kuthiathode Juma Masjid
            </span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.75 }}
          className="flex items-center justify-center gap-3.5 sm:gap-4 flex-wrap my-2"
        >
          <a href="#events" className="btn btn-sage-primary text-xs sm:text-sm">
            <span>View Schedule</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
          <button
            type="button"
            onClick={onAddToCalendar}
            className="btn btn-ivory-outline text-xs sm:text-sm"
          >
            <Calendar className="w-4 h-4 text-[#B09866]" />
            <span>Add to Calendar</span>
          </button>
        </motion.div>

        {/* Subtle Scroll Cue — Positioned 32-40px below action buttons */}
        <div className="mt-8 sm:mt-10 mb-2 text-center text-[#817E72] text-[0.65rem] tracking-[0.24em] flex flex-col items-center gap-1 opacity-75">
          <span>SCROLL TO EXPLORE</span>
          <span className="text-xs animate-bounce" aria-hidden="true">&darr;</span>
        </div>
      </div>
    </header>
  );
}
