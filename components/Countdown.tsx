"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { weddingConfig } from "@/data/weddingConfig";

export default function Countdown() {
  const shouldReduceMotion = useReducedMotion();
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    isPassed: false,
    isToday: false
  });

  useEffect(() => {
    // Target timestamp locked to Asia/Kolkata
    const targetTimestamp = new Date(weddingConfig.dateTime.nikahIsoTime).getTime();

    const calculate = () => {
      const now = Date.now();
      const diff = targetTimestamp - now;

      if (diff <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
          isPassed: diff <= -86400000,
          isToday: diff > -86400000
        });
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
        isPassed: false,
        isToday: false
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  let statusMessage = "Until our beautiful journey begins, Insha'Allah";
  if (timeLeft.isToday) {
    statusMessage = "Today is the blessed wedding day. Alhamdulillah!";
  } else if (timeLeft.isPassed) {
    statusMessage = "The Nikah has taken place. May Allah shower the couple with barakah.";
  }

  return (
    <section className="section-padding text-center" id="countdown">
      <div className="container-standard">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85 }}
          className="bg-[#FFFEFA] border border-[#B09866]/40 rounded-3xl p-6 sm:p-12 max-w-[780px] mx-auto shadow-sm"
        >
          <p
            className="text-xs tracking-[0.28em] text-[#74866D] font-bold mb-2 uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            COUNTING THE MOMENTS
          </p>
          <h2
            className="text-2xl sm:text-4xl font-normal text-[#343C32] leading-tight mb-2 tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Until the Sacred Nikah
          </h2>
          <p className="text-xs sm:text-sm text-[#817E72] mb-6">
            Sunday, 13 December 2026 &middot; 11:00 AM IST &middot; Kuthiathode Juma Masjid
          </p>

          {/* Prominent Serif Numeral Cards: 2x2 on mobile, 4-in-a-row on desktop */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-[580px] mx-auto my-6 sm:my-8 select-none"
            aria-live="polite"
          >
            {/* Days */}
            <div className="bg-[#FBF9F4] border border-[#B09866]/40 rounded-2xl py-4 sm:py-6 px-3 shadow-sm flex flex-col items-center justify-center">
              <span
                className="block text-4xl sm:text-5xl md:text-6xl font-normal text-[#343C32] tabular-nums leading-none"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {timeLeft.days}
              </span>
              <span
                className="block text-[0.62rem] sm:text-xs tracking-[0.22em] text-[#74866D] font-bold mt-2 uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="bg-[#FBF9F4] border border-[#B09866]/40 rounded-2xl py-4 sm:py-6 px-3 shadow-sm flex flex-col items-center justify-center">
              <span
                className="block text-4xl sm:text-5xl md:text-6xl font-normal text-[#343C32] tabular-nums leading-none"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {timeLeft.hours}
              </span>
              <span
                className="block text-[0.62rem] sm:text-xs tracking-[0.22em] text-[#74866D] font-bold mt-2 uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="bg-[#FBF9F4] border border-[#B09866]/40 rounded-2xl py-4 sm:py-6 px-3 shadow-sm flex flex-col items-center justify-center">
              <span
                className="block text-4xl sm:text-5xl md:text-6xl font-normal text-[#343C32] tabular-nums leading-none"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {timeLeft.minutes}
              </span>
              <span
                className="block text-[0.62rem] sm:text-xs tracking-[0.22em] text-[#74866D] font-bold mt-2 uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Minutes
              </span>
            </div>

            {/* Seconds */}
            <div className="bg-[#FBF9F4] border border-[#B09866]/40 rounded-2xl py-4 sm:py-6 px-3 shadow-sm flex flex-col items-center justify-center">
              <span
                className="block text-4xl sm:text-5xl md:text-6xl font-normal text-[#343C32] tabular-nums leading-none"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {timeLeft.seconds}
              </span>
              <span
                className="block text-[0.62rem] sm:text-xs tracking-[0.22em] text-[#74866D] font-bold mt-2 uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Seconds
              </span>
            </div>
          </div>

          <p
            className="text-base sm:text-lg italic text-[#4A5335] my-5 leading-relaxed"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            “{statusMessage}”
          </p>

          <div className="mt-4">
            <a href="#rsvp" className="btn btn-sage-primary text-xs sm:text-sm tracking-wider uppercase px-8 py-3.5">
              RSVP Your Attendance
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
