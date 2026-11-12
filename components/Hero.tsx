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
    <header className="relative min-h-[100svh] flex flex-col items-center justify-between text-center px-4 sm:px-6 pt-[max(2.5rem,env(safe-area-inset-top))] pb-[max(2.5rem,env(safe-area-inset-bottom))] overflow-hidden">
      {/* Decorative Sage Divider Top */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-[220px] sm:max-w-[280px] mb-3 opacity-80 pointer-events-none mx-auto"
        aria-hidden="true"
      >
        <img
          src={assetPath("/assets/sage-divider.svg")}
          alt=""
          className="w-full h-auto"
        />
      </motion.div>

      <div className="w-full max-w-[760px] mx-auto relative z-10 flex flex-col items-center flex-grow justify-center py-2">
        {/* Arabic Bismillah & English Translation with Generous, Balanced Spacing */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-5 sm:mb-7 max-w-[580px] mx-auto w-full text-center"
        >
          {/* Sacred Arabic Text */}
          <p
            lang="ar"
            dir="rtl"
            className="font-arabic text-[clamp(1.75rem,4.4vw,2.65rem)] text-[#2F372C] font-normal leading-[2.1] tracking-wide select-text text-center"
          >
            {weddingConfig.islamic.bismillahArabic}
          </p>

          {/* English Translation — Smaller, Subtle, Well-Spaced */}
          <p
            className="text-[0.72rem] sm:text-xs italic text-[#74866D] mt-3 sm:mt-4 font-normal tracking-[0.04em] max-w-[460px] mx-auto leading-relaxed opacity-90"
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
          className="relative my-4 sm:my-6 mx-auto w-full max-w-[250px] sm:max-w-[290px] md:max-w-[320px]"
        >
          <div className="p-2 sm:p-2.5 rounded-2xl bg-[#FFFEFA] border border-[#C6AD76]/45 shadow-[0_12px_36px_-6px_rgba(52,60,50,0.15)]">
            <div className="overflow-hidden rounded-xl bg-[#F7F3E9]">
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
            className="text-[0.68rem] sm:text-xs tracking-[0.28em] text-[#74866D] font-semibold mb-1.5 uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Together with their families
          </p>
          <p
            className="hero-lead-text italic text-[#4A5547] max-w-[560px] mx-auto mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm md:text-base font-normal"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            We cordially invite you to celebrate the Nikah of our beloved daughter
          </p>
        </motion.div>

        {/* Couple Names — Strictly Single Line with Responsive Fluid Typography */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.45 }}
          className="my-3 sm:my-4 w-full flex items-center justify-center text-center overflow-hidden"
        >
          <h1
            className="hero-couple-title font-normal text-[#343C32] text-center select-text"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <span>{weddingConfig.couple.bride.fullName}</span>
            <span
              className="text-[#C6AD76] font-normal italic mx-1.5 sm:mx-2.5"
              style={{ fontFamily: "var(--font-script)", fontSize: "1.08em" }}
            >
              &amp;
            </span>
            <span>{weddingConfig.couple.groom.fullName}</span>
          </h1>
        </motion.div>

        {/* Groom Lineage Subtext */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.55 }}
          className="text-xs sm:text-sm text-[#4A5547] max-w-[520px] mx-auto leading-relaxed my-2"
        >
          <strong className="text-[#343C32] font-semibold block mb-0.5">
            {weddingConfig.couple.groom.family.parents}
          </strong>
          <span className="text-[#817E72] text-[0.76rem] sm:text-xs block">
            {weddingConfig.couple.groom.family.residence}
          </span>
        </motion.div>

        {/* Sacred Insha'Allah Blessing — High Contrast & Clear Visibility */}
        <p
          className="text-2xl sm:text-3xl text-[#343C32] font-normal my-2.5 sm:my-3.5 tracking-wide select-text"
          style={{ fontFamily: "var(--font-script)" }}
        >
          Insha&apos;Allah
        </p>

        {/* Date & Venue Distinct Stationery Containers */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.65 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-[560px] mx-auto my-3.5 sm:my-5 px-1"
        >
          {/* Wedding Date Container */}
          <div className="bg-[#FFFEFA] border border-[#C6AD76]/45 rounded-2xl p-4 text-center flex flex-col justify-center items-center shadow-[0_4px_16px_-4px_rgba(52,60,50,0.08)]">
            <span
              className="text-[0.62rem] sm:text-[0.68rem] tracking-[0.22em] text-[#74866D] font-bold uppercase mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Wedding Date
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
          <div className="bg-[#FFFEFA] border border-[#C6AD76]/45 rounded-2xl p-4 text-center flex flex-col justify-center items-center shadow-[0_4px_16px_-4px_rgba(52,60,50,0.08)]">
            <span
              className="text-[0.62rem] sm:text-[0.68rem] tracking-[0.22em] text-[#74866D] font-bold uppercase mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Nikah Ceremony &amp; Venue
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
            <Calendar className="w-4 h-4 text-[#C6AD76]" />
            <span>Add to Calendar</span>
          </button>
        </motion.div>
      </div>

      {/* Subtle Scroll Cue */}
      <div className="pt-2 text-center text-[#817E72] text-[0.65rem] tracking-[0.24em] flex flex-col items-center gap-1 opacity-75">
        <span>SCROLL TO EXPLORE</span>
        <span className="text-xs animate-bounce" aria-hidden="true">&darr;</span>
      </div>
    </header>
  );
}
