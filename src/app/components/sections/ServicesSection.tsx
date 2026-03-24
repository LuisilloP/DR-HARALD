"use client";

import { motion } from "framer-motion";
import ServiceCard from "@/app/components/ui/ServiceCard";
import { SERVICES } from "@/lib/constants";
import { siteContent } from "@/lib/content";

export default function ServicesSection() {
  const { servicesSection } = siteContent;

  return (
    <section id="services" className="bg-white py-10 sm:py-24 cursor-pointer">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">
            {servicesSection.badge}
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
            {servicesSection.title}
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            {servicesSection.description}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
