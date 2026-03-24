"use client";

import { Disclosure } from "@headlessui/react";
import { RiArrowDownSLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { siteContent } from "@/lib/content";

export default function FaqSection() {
  const { faqSection, faqs } = siteContent;

  return (
    <section id="faq" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">
            {faqSection.badge}
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
            {faqSection.title}
          </h2>
          <p className="mt-4 text-base text-slate-600">
            {faqSection.description}
          </p>
        </motion.div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq) => (
            <Disclosure
              key={faq.question}
              as="div"
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              {({ open }: { open: boolean }) => (
                <>
                  <Disclosure.Button className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                    <span className="text-sm font-semibold text-slate-900">
                      {faq.question}
                    </span>
                    <RiArrowDownSLine
                      className={`text-xl text-sky-500 transition ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="border-t border-slate-100 bg-slate-50 px-5 py-5 text-sm text-slate-600">
                    {faq.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
