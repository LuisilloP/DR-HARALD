import Link from "next/link";
import {
  RiFacebookFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiWhatsappFill,
} from "react-icons/ri";
import {
  CONTACT,
  SOCIAL_MEDIA,
  DOCTOR,
  FOOTER_LINKS,
} from "@/lib/constants";
import { getCurrentYear, getGoogleMapsEmbedUrl } from "@/lib/utils";
import { siteContent } from "@/lib/content";

export default function Footer() {
  const { footer } = siteContent;
  const mapEmbedUrl =
    CONTACT.address.googleMapsEmbedUrl ??
    getGoogleMapsEmbedUrl(CONTACT.address.googleMapsUrl);

  return (
    <footer id="contact" className="bg-slate-950 py-16 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        <div className="max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            {DOCTOR.name}
          </p>
          <p className="mt-4 text-2xl font-semibold">{footer.headline}</p>
          <p className="mt-4 text-sm text-white/70">
            {footer.hoursLabel}: {CONTACT.schedule.full}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span>
              {footer.phoneLabel} {CONTACT.phone}
            </span>
            <span>{CONTACT.email}</span>
            <Link
              href={CONTACT.address.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              {CONTACT.address.full}
            </Link>
          </div>
          <div className="mt-6 flex items-center gap-4 text-xl">
            <Link
              aria-label="WhatsApp"
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-400 text-slate-950 transition hover:bg-sky-300"
            >
              <RiWhatsappFill />
            </Link>
            <Link
              aria-label="Instagram"
              href={SOCIAL_MEDIA.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
            >
              <RiInstagramLine />
            </Link>
            <Link
              aria-label="Facebook"
              href={SOCIAL_MEDIA.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
            >
              <RiFacebookFill />
            </Link>
            <Link
              aria-label="LinkedIn"
              href={SOCIAL_MEDIA.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
            >
              <RiLinkedinFill />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 text-sm text-white/80 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
              {footer.locationsTitle}
            </p>
            <div className="mt-3 overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-lg shadow-black/20">
              <iframe
                title={footer.mapFrameTitle}
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-48 w-full border-0"
              />
            </div>
            <Link
              href={CONTACT.address.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm transition hover:text-white"
            >
              {footer.mapLinkLabel}
            </Link>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
              {footer.resourcesTitle}
            </p>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/50">
        {footer.copyrightPrefix} {getCurrentYear()} {DOCTOR.name}.{" "}
        {footer.copyrightSuffix}
      </div>
    </footer>
  );
}
