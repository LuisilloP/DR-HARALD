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
}

export default function BeforeAfterCard({
  title,
  description,
  beforeSrc,
  afterSrc,
  aspectRatio = "h-[320px]",
  highlight,
  className = "",
}: BeforeAfterCardProps) {
  return (
    <article
      className={`overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg ${className}`}
    >
      <div className={`relative overflow-hidden bg-slate-900 ${aspectRatio}`}>
        <ReactCompareSlider
          className="absolute inset-0"
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
                background: "rgba(15, 23, 42, 0.9)",
                border: "2px solid rgba(255,255,255,0.8)",
                boxShadow: "0 8px 16px rgba(15,23,42,0.35)",
              }}
              linesStyle={{
                backgroundColor: "rgba(255,255,255,0.8)",
                width: "2px",
              }}
            />
          }
        />
      </div>
      <div className="space-y-3 px-6 py-6">
        {highlight ? (
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">
            {highlight}
          </p>
        ) : null}
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </article>
  );
}
