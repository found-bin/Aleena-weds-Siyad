"use client";

import React from "react";
import { weddingConfig } from "@/data/weddingConfig";
import { Share2 } from "lucide-react";

interface SharingBarProps {
  onShowToast: (msg: string) => void;
  onAddToCalendar: () => void;
}

export default function SharingBar({ onShowToast }: SharingBarProps) {
  const { bride, groom } = weddingConfig.couple;

  const handleNativeShare = async () => {
    const shareData = {
      title: `${bride.fullName} & ${groom.fullName} — Wedding Invitation`,
      text: `You are cordially invited to celebrate the Nikah of ${bride.fullName} & ${groom.fullName} on Sunday, 13 December 2026.`,
      url: typeof window !== "undefined" ? window.location.href : ""
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => onShowToast("Invitation link copied to clipboard!"))
        .catch(() => fallbackCopy(url));
    } else {
      fallbackCopy(url);
    }
  };

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      onShowToast("Invitation link copied to clipboard!");
    } catch {
      onShowToast("Please copy the link directly from your browser.");
    }
    document.body.removeChild(textArea);
  };

  return (
    <aside
      className="py-6 sm:py-8 px-4 text-center"
      aria-label="Share invitation"
      id="share"
    >
      <button
        type="button"
        onClick={handleNativeShare}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs text-[#74866D] hover:text-[#343C32] bg-white/70 hover:bg-white border border-[#C6AD76]/35 hover:border-[#74866D]/60 transition-all shadow-sm hover:shadow"
      >
        <Share2 className="w-3.5 h-3.5 text-[#C6AD76]" />
        <span className="font-medium tracking-wide">Share this invite</span>
      </button>
    </aside>
  );
}
