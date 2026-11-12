"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { weddingConfig, weddingImages } from "@/data/weddingConfig";
import IllustratedImage from "@/components/IllustratedImage";
import { MapPin, Calendar, Clock, ExternalLink } from "lucide-react";

export default function ScheduleSection() {
  const { events } = weddingConfig;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-padding" id="events">
      <div className="container-standard">
        {/* Section Header */}
        <motion.header
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-[640px] mx-auto mb-12 sm:mb-16"
        >
          <p
            className="text-xs tracking-[0.28em] text-[#74866D] font-bold mb-2 uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            CELEBRATION DETAILS
          </p>
          <h2
            className="text-2xl sm:text-4xl font-normal text-[#343C32] leading-tight mb-3 tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Wedding Events
          </h2>
          <div className="w-48 mx-auto my-3 opacity-90" aria-hidden="true">
            <img
              src={weddingImages.decorations.dividerSvg}
              alt=""
              className="w-full h-auto"
            />
          </div>
          <p className="text-xs sm:text-sm text-[#817E72] leading-relaxed max-w-[520px] mx-auto">
            We warmly invite you to join us at each milestone of this blessed union.
          </p>
        </motion.header>

        {/* Distinct Premium Stationery Event Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 mb-10 items-stretch">
          {events.map((event, idx) => (
            <motion.article
              key={event.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, delay: idx * 0.15 }}
              className="bg-[#FFFEFA] border border-[#C6AD76]/45 rounded-3xl overflow-hidden shadow-[0_8px_30px_-6px_rgba(52,60,50,0.1)] hover:shadow-[0_16px_40px_-6px_rgba(52,60,50,0.16)] hover:border-[#C6AD76]/70 transition-all duration-300 flex flex-col h-full group"
            >
              {/* Venue Photograph Area with Reserved Aspect Ratio */}
              <div className="relative w-full overflow-hidden bg-[#F7F3E9] border-b border-[#C6AD76]/30">
                <IllustratedImage
                  src={event.imageSrc}
                  fallbackSrc={event.fallbackSrc}
                  alt={event.imageAlt}
                  aspectRatio="16/10"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />

                {/* Top Subtle Label Banner */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[0.65rem] tracking-[0.22em] font-bold uppercase bg-[#FFFEFA]/95 text-[#343C32] border border-[#C6AD76]/50 shadow-sm backdrop-blur-sm">
                    {event.category}
                  </span>

                  {event.timeConfirmed ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.62rem] tracking-wider font-semibold uppercase bg-[#74866D] text-[#FFFEFA] shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFFEFA] animate-pulse" />
                      Confirmed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.62rem] tracking-wider font-semibold uppercase bg-[#FFFEFA]/95 text-[#817E72] border border-[#C6AD76]/40 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C6AD76]" />
                      To be announced
                    </span>
                  )}
                </div>
              </div>

              {/* Card Content Details with Generous Spacing */}
              <div className="p-7 sm:p-9 flex flex-col justify-between flex-grow">
                <div>
                  <h3
                    className="text-2xl sm:text-3xl font-normal text-[#343C32] leading-tight mb-3 tracking-tight"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {event.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#817E72] leading-relaxed mb-6">
                    {event.description}
                  </p>

                  {/* Structured Details Box */}
                  <div className="rounded-2xl bg-[#F7F3E9]/50 border border-[#C6AD76]/30 p-5 sm:p-6 flex flex-col gap-4 mb-7">
                    {/* Date & Time Row */}
                    {event.timeConfirmed && event.dateDisplay ? (
                      <div className="flex items-start gap-3.5 text-xs sm:text-sm">
                        <Calendar className="w-4 h-4 text-[#74866D] shrink-0 mt-0.5" />
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-[#343C32]">
                          <strong className="font-semibold text-sm sm:text-base">{event.dateDisplay}</strong>
                          <span className="hidden sm:inline text-[#C6AD76]">&middot;</span>
                          <span className="flex items-center gap-1.5 text-[#4A5547] font-medium text-xs sm:text-sm">
                            <Clock className="w-3.5 h-3.5 text-[#74866D]" />
                            {event.timeDisplay}
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Honest Handling of Unconfirmed Reception Schedule */
                      <div className="flex items-start gap-3.5 text-xs sm:text-sm text-[#817E72]">
                        <Clock className="w-4 h-4 text-[#C6AD76] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-[#343C32] block text-sm sm:text-base">
                            Date &amp; Timing
                          </span>
                          <span className="block text-xs text-[#817E72] mt-0.5">
                            To be announced by the family once confirmed
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="w-full h-[1px] bg-[#C6AD76]/25" aria-hidden="true" />

                    {/* Venue & Location Row */}
                    <div className="flex items-start gap-3.5 text-xs sm:text-sm">
                      <MapPin className="w-4 h-4 text-[#74866D] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#343C32] font-semibold text-sm sm:text-base">
                          {event.venueName}
                        </strong>
                        <span className="text-xs text-[#817E72] block mt-1 leading-relaxed">
                          {event.venueAddress}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Get Directions Button */}
                <div className="pt-2">
                  <a
                    href={event.mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sage-primary w-full py-4 text-xs sm:text-sm font-semibold tracking-wider flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md transition-all"
                  >
                    <MapPin className="w-4 h-4 text-[#C6AD76]" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-75 ml-0.5" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="text-center text-xs italic text-[#817E72] max-w-[550px] mx-auto">
          <em>Note:</em> The reception schedule will be announced and shared with loved ones before the celebration.
        </p>
      </div>
    </section>
  );
}
