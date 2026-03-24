"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteContent } from "@/lib/content";

export default function AboutSection() {
  const { about } = siteContent;

  return (
    <section id="about" className="bg-neutral-50  lg:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-white shadow-xl sm:rounded-3xl"
        >
          <Image
            src={"/images/dr_harald.webp"}
            alt={about.imageAlt}
            width={520}
            height={620}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/90 p-5 text-slate-900 shadow-lg backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">
              {about.badge}
            </p>
            <p className="mt-1 text-lg font-semibold">{about.cardName}</p>
            <p className="text-sm text-slate-600">{about.cardSubtitle}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-2xl px-4"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">
            {about.sectionBadge}
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
            {about.title}
          </h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base text-slate-600 sm:text-lg">
              {paragraph}
            </p>
          ))}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {about.credentials.map((credential) => (
              <div
                key={credential.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {credential.title}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  {credential.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
