"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { weddingConfig, weddingImages } from "@/data/weddingConfig";

export default function FamilySection() {
  const { bride, groom } = weddingConfig.couple;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-padding" id="families">
      <div className="container-standard">
        {/* Section Header */}
        <motion.header
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-[620px] mx-auto mb-10 sm:mb-14"
        >
          <p
            className="text-xs tracking-[0.28em] text-[#74866D] font-semibold mb-2 uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            With Love &amp; Gratitude
          </p>
          <h2
            className="text-2xl sm:text-4xl font-normal text-[#343C32] leading-tight mb-2 tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            The Families
          </h2>
          <div className="w-48 mx-auto my-2 opacity-90" aria-hidden="true">
            <img
              src={weddingImages.decorations.dividerSvg}
              alt=""
              className="w-full h-auto"
            />
          </div>
          <p className="text-xs sm:text-sm text-[#817E72] leading-relaxed max-w-[500px] mx-auto">
            Honouring the roots, prayers, and generations that shaped this blessed union.
          </p>
        </motion.header>

        {/* Two Balanced Family Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-[880px] mx-auto items-stretch">
          {/* Bride's Family Card */}
          <motion.article
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="bg-[#FFFEFA] border border-[#B09866]/40 rounded-3xl p-6 sm:p-9 shadow-[0_8px_30px_-6px_rgba(52,60,50,0.08)] flex flex-col justify-between relative overflow-hidden"
          >
            {/* Subtle Corner Botanical Accent */}
            <div className="absolute -top-2 -right-2 w-20 opacity-30 pointer-events-none" aria-hidden="true">
              <img src={weddingImages.decorations.botanicalCornerSvg} alt="" className="rotate-90" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-4 h-[1px] bg-[#B09866]" />
                <span
                  className="text-[0.68rem] tracking-[0.22em] text-[#74866D] font-bold uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Bride&apos;s Family
                </span>
              </div>

              <h3
                className="text-xl sm:text-2xl font-normal text-[#343C32] leading-snug mb-1 tracking-tight"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                <span className="block whitespace-nowrap">Mr. Siyad Ommerkutty &amp;</span>
                <span className="block">Mrs. Shamla</span>
              </h3>

              <p className="text-xs sm:text-sm text-[#817E72] mb-5">
                {bride.family.residence}
              </p>
            </div>

            <div className="mt-auto pt-4 border-t border-[#B09866]/25">
              <p className="text-[0.68rem] font-semibold tracking-wider text-[#74866D] mb-1.5 uppercase">
                Family Roots
              </p>
              <p className="text-xs sm:text-[0.82rem] text-[#4A5335] leading-relaxed">
                {bride.family.lineage}
              </p>
            </div>
          </motion.article>

          {/* Groom's Family Card */}
          <motion.article
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="bg-[#FFFEFA] border border-[#B09866]/40 rounded-3xl p-6 sm:p-9 shadow-[0_8px_30px_-6px_rgba(52,60,50,0.08)] flex flex-col justify-between relative overflow-hidden"
          >
            {/* Subtle Corner Botanical Accent */}
            <div className="absolute -top-2 -right-2 w-20 opacity-30 pointer-events-none" aria-hidden="true">
              <img src={weddingImages.decorations.botanicalCornerSvg} alt="" className="rotate-90" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-4 h-[1px] bg-[#B09866]" />
                <span
                  className="text-[0.68rem] tracking-[0.22em] text-[#74866D] font-bold uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Groom&apos;s Family
                </span>
              </div>

              <h3
                className="text-xl sm:text-2xl font-normal text-[#343C32] leading-snug mb-1 tracking-tight"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                <span className="block whitespace-nowrap">Mr. Nazar T M &amp;</span>
                <span className="block">Mrs. Jumailath</span>
              </h3>

              <p className="text-xs sm:text-sm text-[#817E72] mb-5">
                {groom.family.residence}
              </p>
            </div>

            <div className="mt-auto pt-4 border-t border-[#B09866]/25">
              <p className="text-[0.68rem] font-semibold tracking-wider text-[#74866D] mb-1.5 uppercase">
                Family Blessings
              </p>
              <p className="text-xs sm:text-[0.82rem] italic text-[#4A5335] leading-relaxed">
                {groom.family.blessingNote}
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
