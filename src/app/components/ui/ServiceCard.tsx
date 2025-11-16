"use client";

import { motion } from "framer-motion";
import { OptimizedVideo } from "@/components/OptimizedVideo";

interface ServiceCardProps {
  title: string;
  description: string;
  videoSrc: string;
  poster: string;
}

export default function ServiceCard({
  title,
  description,
  videoSrc,
  poster,
}: ServiceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      whileHover={{ translateY: -6 }}
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <OptimizedVideo
          className="absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
          poster={poster}
          autoPlay
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/60 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-6 pb-6 pt-6">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </motion.article>
  );
}
