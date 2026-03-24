"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  RiMenuLine,
  RiCloseLine,
  RiCalendarScheduleLine,
} from "react-icons/ri";
import {
  NAV_ITEMS,
  DOCTOR,
  NAVIGATION_CTA_LABEL,
} from "@/lib/constants";
import { scrollToSection } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (target: string) => {
    scrollToSection(target);
    setIsOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-3">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/20 bg-neutral-900/70 px-4 py-2 text-white shadow-lg backdrop-blur-md sm:px-6">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => handleNavigate("hero")}
        >
         
          <Image
                          src={"/images/logo_v1.png"}
                          alt={"logo"}
                          width={36}
                          height={36}
                          sizes="150px"
                          className="w-10 max-w-full object-contain"
                          style={{ height: "auto" }}
                        />
          <div className="leading-tight">
            <p className="text-sm font-semibold">{DOCTOR.name}</p>
            <p className="text-[0.7rem] text-white/70 sm:text-xs">
              {DOCTOR.subtitle}
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.target}
              onClick={() => handleNavigate(item.target)}
              className="transition-colors hover:text-sky-400"
              type="button"
            >
              {item.label}
            </button>
          ))}
          <Link
            href="/reservas"
            className="flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-sky-400"
          >
            <RiCalendarScheduleLine className="text-lg" />
            {NAVIGATION_CTA_LABEL}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xl text-white transition md:hidden"
        >
          {isOpen ? <RiCloseLine /> : <RiMenuLine />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-3 flex max-w-6xl flex-col gap-3 rounded-3xl border border-white/15 bg-neutral-900/95 p-6 text-white shadow-xl backdrop-blur-md md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavigate(item.target)}
                className="rounded-2xl bg-white/5 px-4 py-3 text-left text-sm font-medium tracking-wide transition hover:bg-white/10"
                type="button"
              >
                {item.label}
              </button>
            ))}
            <Link
              href="/reservas"
              className="flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-sky-400"
            >
              <RiCalendarScheduleLine className="text-lg" />
              {NAVIGATION_CTA_LABEL}
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
