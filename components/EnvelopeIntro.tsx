"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { weddingConfig, assetPath } from "@/data/weddingConfig";
import { ArrowRight } from "lucide-react";

interface FoldedIntroProps {
  onOpened: () => void;
  isOpen: boolean;
}

export default function EnvelopeIntro({ onOpened, isOpen }: FoldedIntroProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const folioWrapperRef = useRef<HTMLDivElement>(null);
  const leftCoverFlapRef = useRef<HTMLDivElement>(null);
  const rightCoverFlapRef = useRef<HTMLDivElement>(null);
  const crestSealRef = useRef<HTMLDivElement>(null);
  const innerCardRef = useRef<HTMLDivElement>(null);
  const innerContentRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    // Check if visitor has already seen the intro in this session
    try {
      if (sessionStorage.getItem("wedding_intro_seen") === "true") {
        onOpened();
        if (stageRef.current) stageRef.current.style.display = "none";
        return;
      }
    } catch {
      // In case sessionStorage is blocked by privacy mode
    }

    if (isOpen && stageRef.current) {
      stageRef.current.style.display = "none";
    }

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, [isOpen]);

  const handleOpenSequence = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    try {
      sessionStorage.setItem("wedding_intro_seen", "true");
    } catch {
      // Ignore storage errors
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      if (stageRef.current) {
        stageRef.current.style.pointerEvents = "none";
        stageRef.current.style.display = "none";
      }
      onOpened();
      return;
    }

    // Coordinated GSAP Timeline for the Sage Heirloom Folded Paper Reveal
    const tl = gsap.timeline({
      onComplete: () => {
        if (stageRef.current) {
          stageRef.current.style.pointerEvents = "none";
          stageRef.current.style.display = "none";
        }
        onOpened();
      }
    });
    tlRef.current = tl;

    // 1. Button press micro-feedback
    if (openBtnRef.current) {
      tl.to(openBtnRef.current, {
        scale: 0.94,
        duration: 0.14,
        ease: "power2.inOut"
      });
    }

    // 2. Monogram seal & ribbon release
    if (crestSealRef.current) {
      tl.to(
        crestSealRef.current,
        {
          scale: 0.6,
          opacity: 0,
          y: -10,
          duration: 0.4,
          ease: "power2.in"
        },
        "+=0.05"
      );
    }

    // 3. Folded Sage Covers unfold outward with 3D perspective
    if (leftCoverFlapRef.current) {
      tl.to(
        leftCoverFlapRef.current,
        {
          rotateY: -155,
          duration: 1.0,
          ease: "power3.inOut"
        },
        "-=0.25"
      );
    }

    if (rightCoverFlapRef.current) {
      tl.to(
        rightCoverFlapRef.current,
        {
          rotateY: 155,
          duration: 1.0,
          ease: "power3.inOut"
        },
        "<"
      );
    }

    // 4. Inner warm ivory stationery card expands forward
    if (innerCardRef.current) {
      tl.to(
        innerCardRef.current,
        {
          scale: 1.03,
          boxShadow: "0 28px 60px -10px rgba(52, 60, 50, 0.28)",
          duration: 0.9,
          ease: "power2.out"
        },
        "-=0.7"
      );
    }

    // 5. Sequential reveal of inner invitation typography
    if (innerContentRef.current) {
      tl.fromTo(
        innerContentRef.current.children,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      );
    }

    // 6. Smooth crossfade to main invitation page:
    // Allow pointer events to pass through immediately as crossfade begins so visitors can interact
    if (stageRef.current) {
      tl.to(
        stageRef.current,
        {
          opacity: 0,
          scale: 1.02,
          duration: 0.75,
          ease: "power2.inOut",
          delay: 0.3,
          onStart: () => {
            if (stageRef.current) {
              stageRef.current.style.pointerEvents = "none";
            }
            onOpened();
          }
        }
      );
    }
  };

  const handleSkip = () => {
    try {
      sessionStorage.setItem("wedding_intro_seen", "true");
    } catch {
      // Ignore storage errors
    }

    if (tlRef.current) {
      tlRef.current.kill();
    }
    if (stageRef.current) {
      stageRef.current.style.pointerEvents = "none";
      stageRef.current.style.display = "none";
    }
    onOpened();
  };

  if (isOpen) return null;

  return (
    <div
      ref={stageRef}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-between p-4 sm:p-7 overflow-hidden select-none"
      style={{
        background:
          "radial-gradient(ellipse at 50% 35%, #FFFEFA 0%, #FBF9F4 55%, #F0EAE0 100%)"
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Folded Wedding Invitation"
    >
      {/* Botanical Corner Ornaments — Tucked into corners to prevent text overlap */}
      <div
        className="absolute top-0 left-0 w-20 sm:w-36 pointer-events-none opacity-60"
        aria-hidden="true"
      >
        <img
          src={assetPath("/assets/sage-botanical-corner.svg")}
          alt=""
          className="w-full h-auto drop-shadow-sm"
        />
      </div>
      <div
        className="absolute bottom-0 right-0 w-20 sm:w-36 pointer-events-none opacity-60 rotate-180"
        aria-hidden="true"
      >
        <img
          src={assetPath("/assets/sage-botanical-corner.svg")}
          alt=""
          className="w-full h-auto drop-shadow-sm"
        />
      </div>

      {/* Intro Header */}
      <header className="relative z-10 text-center mt-2 sm:mt-4 px-4 max-w-[290px] sm:max-w-md mx-auto">
        <p
          className="text-[0.68rem] sm:text-xs tracking-[0.22em] text-[#74866D] font-bold mb-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          IN THE NAME OF ALLAH · THE MOST MERCIFUL
        </p>
        <p
          className="text-[0.6rem] sm:text-[0.72rem] tracking-[0.2em] text-[#817E72] font-medium"
          style={{ fontFamily: "var(--font-display)" }}
        >
          A SACRED NIKAH INVITATION
        </p>
      </header>

      {/* 3D Folded Folio Scene */}
      <div
        ref={folioWrapperRef}
        className="relative my-auto flex items-center justify-center"
        style={{
          width: "min(90vw, 370px)",
          height: "285px",
          perspective: "1400px"
        }}
      >
        {/* INNER WARM IVORY INVITATION CARD (Revealed when folio opens) */}
        <article
          ref={innerCardRef}
          className="absolute inset-0 rounded-lg p-5 sm:p-6 text-center z-[2] border border-[#C6AD76]/45 flex flex-col items-center justify-center shadow-lg"
          style={{
            background:
              "linear-gradient(155deg, #FFFEFA 0%, #F7F3E9 55%, #F0EAE0 100%)",
            boxShadow:
              "0 18px 45px -8px rgba(52, 60, 50, 0.16), 0 4px 14px rgba(52, 60, 50, 0.08)"
          }}
          aria-hidden="true"
        >
          <div
            ref={innerContentRef}
            className="w-full h-full border border-[#C6AD76]/35 p-3 sm:p-4 rounded flex flex-col items-center justify-center"
          >
            {/* Arabic Bismillah Calligraphy */}
            <p
              className="font-arabic text-[#343C32] text-lg sm:text-xl font-normal leading-relaxed tracking-normal select-text mb-1"
              lang="ar"
              dir="rtl"
            >
              {weddingConfig.islamic.bismillahArabic}
            </p>

            {/* Subtle English Translation */}
            <p
              className="text-[0.52rem] sm:text-[0.56rem] italic text-[#74866D] tracking-wide my-1 opacity-90 leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              “{weddingConfig.islamic.bismillahEnglish}”
            </p>

            {/* Subtitle with subtle vertical breathing room */}
            <p className="text-[0.58rem] sm:text-[0.62rem] tracking-[0.22em] text-[#817E72] font-medium uppercase my-1">
              Together with their families
            </p>

            <h2
              className="text-[#343C32] text-2xl sm:text-3xl font-normal leading-tight my-1.5"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <span>{weddingConfig.couple.bride.firstName}</span>
              <em
                className="mx-1.5 text-[#C6AD76] font-normal"
                style={{ fontFamily: "var(--font-script)" }}
              >
                ×
              </em>
              <span>{weddingConfig.couple.groom.firstName}</span>
            </h2>

            <div className="flex items-center gap-2 text-[#C6AD76] text-xs my-1">
              <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#C6AD76] to-transparent"></span>
              ✦
              <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#C6AD76] to-transparent"></span>
            </div>

            <p
              className="text-[0.62rem] tracking-[0.2em] text-[#74866D] font-bold uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Nikah Ceremony
            </p>

            <p
              className="text-xs sm:text-sm font-semibold tracking-wider text-[#343C32] mt-0.5"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Sunday &middot; 13 December 2026
            </p>
          </div>
        </article>

        {/* FOLDED SAGE FOLIO COVERS (Left and Right Flaps meeting in center) */}
        <div
          onClick={handleOpenSequence}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleOpenSequence();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleOpenSequence();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Tap to open folded invitation"
          className="absolute inset-0 z-[5] cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C6AD76]"
          style={{
            transformStyle: "preserve-3d"
          }}
        >
          {/* Left Sage Flap */}
          <div
            ref={leftCoverFlapRef}
            className="absolute top-0 bottom-0 left-0 w-1/2 rounded-l-lg border-y border-l border-[#C6AD76]/60 p-4 flex flex-col justify-between overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, #7E9277 0%, #74866D 50%, #5F7059 100%)",
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              boxShadow:
                "-6px 12px 25px -4px rgba(52, 60, 50, 0.22)"
            }}
          >
            {/* Fine Inner Foil Border */}
            <div className="absolute inset-2 border border-[#C6AD76]/40 rounded-l pointer-events-none" />
            <div className="w-12 opacity-80">
              <img src={assetPath("/assets/sage-botanical-corner.svg")} alt="" />
            </div>
            <div className="text-left z-10 pl-1">
              <span
                className="text-[0.62rem] tracking-[0.24em] text-[#F7F3E9] uppercase font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Aleena
              </span>
            </div>
          </div>

          {/* Right Sage Flap */}
          <div
            ref={rightCoverFlapRef}
            className="absolute top-0 bottom-0 right-0 w-1/2 rounded-r-lg border-y border-r border-[#C6AD76]/60 p-4 flex flex-col justify-between items-end overflow-hidden"
            style={{
              background:
                "linear-gradient(215deg, #7E9277 0%, #74866D 50%, #5F7059 100%)",
              transformOrigin: "right center",
              transformStyle: "preserve-3d",
              boxShadow:
                "6px 12px 25px -4px rgba(52, 60, 50, 0.22)"
            }}
          >
            {/* Fine Inner Foil Border */}
            <div className="absolute inset-2 border border-[#C6AD76]/40 rounded-r pointer-events-none" />
            <div className="w-12 opacity-80 rotate-90">
              <img src={assetPath("/assets/sage-botanical-corner.svg")} alt="" />
            </div>
            <div className="text-right z-10 pr-1">
              <span
                className="text-[0.62rem] tracking-[0.24em] text-[#F7F3E9] uppercase font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Siyad
              </span>
            </div>
          </div>

          {/* Center Monogram Crest / Seal — Using the Actual Supplied Favicon Artwork */}
          <div
            ref={crestSealRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10] w-20 h-20 sm:w-24 sm:h-24 pointer-events-none drop-shadow-xl"
            aria-hidden="true"
          >
            <img
              src={assetPath("/favicon/android-chrome-512x512.png")}
              alt="Aleena &amp; Siyad Monogram"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Intro Footer & CTA */}
      <footer className="relative z-10 text-center w-full max-w-sm mb-2 sm:mb-4">
        <p
          className="text-[#343C32] text-xl sm:text-2xl font-normal mb-3"
          style={{ fontFamily: "var(--font-couple)" }}
        >
          {weddingConfig.couple.bride.fullName}{" "}
          <span
            className="text-[#B09866] italic font-serif px-1"
          >
            &amp;
          </span>{" "}
          {weddingConfig.couple.groom.fullName}
        </p>

        <button
          ref={openBtnRef}
          type="button"
          onClick={handleOpenSequence}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleOpenSequence();
          }}
          disabled={isOpening}
          className="group relative inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-[0.22em] text-[#FFFEFA] border border-[#C6AD76] shadow-lg transition-all"
          style={{
            background:
              "linear-gradient(135deg, #74866D 0%, #44503f 100%)",
            boxShadow: "0 8px 24px rgba(52, 60, 50, 0.22)"
          }}
        >
          <span>OPEN INVITATION</span>
          <ArrowRight className="w-4 h-4 text-[#C6AD76] transition-transform group-hover:translate-x-1" />
        </button>

        <div className="mt-3 flex flex-col items-center gap-1">
          <button
            type="button"
            onClick={handleSkip}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleSkip();
            }}
            className="text-[0.72rem] tracking-wider text-[#817E72] underline underline-offset-4 hover:text-[#343C32] transition-colors"
          >
            Skip intro &rarr;
          </button>
          <p
            className="text-xs italic text-[#817E72] mt-0.5"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            A blessed beginning, Insha&apos;Allah
          </p>
        </div>
      </footer>
    </div>
  );
}
