"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type PrestacionesListProps = {
  items: string[];
};

export default function PrestacionesList({ items }: PrestacionesListProps) {
  const [showAll, setShowAll] = useState(false);

  const primaryItems = items.slice(0, 2);
  const extraItems = items.slice(2);
  const itemBaseClass =
    "rounded-xl border border-[#8bb7dc]/35 bg-white/70 px-3 py-2 text-sm font-medium leading-snug text-slate-700";

  return (
    <div>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {primaryItems.map((item) => (
          <li key={item} className={itemBaseClass}>
            {item}
          </li>
        ))}
      </ul>

      <AnimatePresence initial={false}>
        {showAll ? (
          <motion.ul
            key="extra-prestaciones"
            className="mt-2 grid gap-2 overflow-hidden sm:grid-cols-2"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {
                height: "auto",
                opacity: 1,
                transition: {
                  when: "beforeChildren",
                  delayChildren: 0.03,
                  staggerChildren: 0.05,
                },
              },
              collapsed: {
                height: 0,
                opacity: 0,
                transition: {
                  when: "afterChildren",
                  staggerChildren: 0.045,
                  staggerDirection: -1,
                },
              },
            }}
          >
            {extraItems.map((item) => (
              <motion.li
                key={item}
                className={itemBaseClass}
                variants={{
                  open: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
                  collapsed: {
                    opacity: 0,
                    y: -10,
                    scale: 0.98,
                    filter: "blur(1px)",
                  },
                }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>

      {extraItems.length > 0 ? (
        <div className="mt-3 flex justify-center">
          <motion.button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#7faed6]/40 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#2e78b3] transition hover:bg-white"
          >
            <motion.span
              aria-hidden="true"
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ↓
            </motion.span>
            {showAll ? "Ver menos" : "Ver mas"}
          </motion.button>
        </div>
      ) : null}
    </div>
  );
}
