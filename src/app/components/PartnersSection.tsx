import Image from "next/image";

const partners = [
  {
    name: "ACHS",
    logo: "/images/asociated/achs.png",
  },
  {
    name: "Clínica Aéreo",
    logo: "/images/asociated/aereo.png",
  },
  {
    name: "Clínica Cable",
    logo: "/images/asociated/cable.png",
  },
  {
    name: "Imatec",
    logo: "/images/asociated/imatec.png",
  },
  {
    name: "Centro Mirador",
    logo: "/images/asociated/mirador.png",
  },
  {
    name: "PHAM",
    logo: "/images/asociated/pham.png",
  },
];

export default function PartnersSection() {
  return (
    <section id="partners" className="bg-neutral-50 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Convenios
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
            Alianzas estratégicas
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-6 shadow-sm"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={100}
                sizes="150px"
                className="w-[150px] max-w-full object-contain"
                style={{ height: "auto" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
