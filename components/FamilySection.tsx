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

        {/* Editorial Layout: Open Folio Stationery Spread with Delicate Botanicals */}
        <div className="max-w-[880px] mx-auto bg-[#FFFEFA] border border-[#C6AD76]/45 rounded-3xl p-6 sm:p-12 shadow-[0_8px_30px_-6px_rgba(52,60,50,0.08)] relative overflow-hidden">
          {/* Subtle Corner Botanical Accents */}
          <div className="absolute -top-3 -left-3 w-28 opacity-40 pointer-events-none" aria-hidden="true">
            <img src={weddingImages.decorations.botanicalCornerSvg} alt="" />
          </div>
          <div className="absolute -bottom-3 -right-3 w-28 opacity-40 pointer-events-none rotate-180" aria-hidden="true">
            <img src={weddingImages.decorations.botanicalCornerSvg} alt="" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 relative z-10">
            {/* Bride's Family Editorial Column */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="flex flex-col text-center md:text-left"
            >
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <span className="w-4 h-[1px] bg-[#C6AD76]" />
                <span
                  className="text-[0.68rem] tracking-[0.22em] text-[#74866D] font-bold uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Bride&apos;s Family
                </span>
              </div>

              <h3
                className="text-2xl sm:text-3xl font-normal text-[#343C32] leading-snug mb-1 tracking-tight"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {bride.family.parents}
              </h3>

              <p className="text-xs sm:text-sm text-[#817E72] mb-5">
                {bride.family.residence}
              </p>

              <div className="mt-auto pt-4 border-t border-[#C6AD76]/25">
                <p className="text-[0.68rem] font-semibold tracking-wider text-[#74866D] mb-1.5 uppercase">
                  Granddaughter of:
                </p>
                <p className="text-xs sm:text-[0.82rem] text-[#4A5547] leading-relaxed">
                  {bride.family.lineage}
                </p>
              </div>
            </motion.div>

            {/* Groom's Family Editorial Column */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="flex flex-col text-center md:text-left"
            >
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <span className="w-4 h-[1px] bg-[#C6AD76]" />
                <span
                  className="text-[0.68rem] tracking-[0.22em] text-[#74866D] font-bold uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Groom&apos;s Family
                </span>
              </div>

              <h3
                className="text-2xl sm:text-3xl font-normal text-[#343C32] leading-snug mb-1 tracking-tight"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {groom.family.parents}
              </h3>

              <p className="text-xs sm:text-sm text-[#817E72] mb-5">
                {groom.family.residence}
              </p>

              <div className="mt-auto pt-4 border-t border-[#C6AD76]/25">
                <p className="text-[0.68rem] font-semibold tracking-wider text-[#74866D] mb-1.5 uppercase">
                  Family Blessings:
                </p>
                <p className="text-xs sm:text-[0.82rem] italic text-[#4A5547] leading-relaxed">
                  {groom.family.blessingNote}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
