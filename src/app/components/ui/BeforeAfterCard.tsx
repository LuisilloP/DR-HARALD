"use client";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from "react-compare-slider";

interface BeforeAfterCardProps {
  title: string;
  description: string;
  beforeSrc: string;
  afterSrc: string;
  aspectRatio?: string;
  highlight?: string;
  className?: string;
  theme?: "light" | "dark";
}

export default function BeforeAfterCard({
  title,
  description,
  beforeSrc,
  afterSrc,
  aspectRatio = "h-[320px]",
  highlight,
  className = "",
  theme = "light",
}: BeforeAfterCardProps) {
  const isDark = theme === "dark";

  return (
    <article
      className={`overflow-hidden rounded-[30px] border ${
        isDark
          ? "border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.02] text-white shadow-[0_26px_45px_-35px_rgba(15,23,42,0.95)]"
          : "border-slate-200 bg-white text-slate-900 shadow-lg"
      } ${className}`}
    >
      <div
        className={`relative overflow-hidden ${
          isDark ? "bg-neutral-950" : "bg-slate-900"
        } ${aspectRatio}`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 pt-4">
          <span className="rounded-full border border-white/35 bg-black/50 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] text-white">
            ANTES
          </span>
          <span className="rounded-full border border-white/35 bg-black/50 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] text-white">
            DESPUES
          </span>
        </div>
        <ReactCompareSlider
          className="before-after-compare absolute inset-0"
          itemOne={
            <ReactCompareSliderImage
              src={beforeSrc}
              alt={`${title} antes`}
              className="h-full w-full object-cover"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={afterSrc}
              alt={`${title} después`}
              className="h-full w-full object-cover"
            />
          }
          position={50}
          style={{ width: "100%", height: "100%" }}
          handle={
            <ReactCompareSliderHandle
              buttonStyle={{
                width: 36,
                height: 36,
                borderRadius: "9999px",
                background: "rgba(15, 23, 42, 0.88)",
                border: "2px solid rgba(226, 232, 240, 0.9)",
                boxShadow: "0 10px 20px rgba(15, 23, 42, 0.35)",
              }}
              linesStyle={{
                backgroundColor: "rgba(226,232,240,0.92)",
                width: "2px",
              }}
            />
          }
        />
      </div>
      <div className="space-y-3 px-6 py-6">
        {highlight ? (
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] ${
              isDark ? "text-sky-300" : "text-sky-500"
            }`}
          >
            {highlight}
          </p>
        ) : null}
        <h3
          className={`text-lg font-semibold ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          {title}
        </h3>
        <p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
          {description}
        </p>
      </div>
    </article>
  );
}
