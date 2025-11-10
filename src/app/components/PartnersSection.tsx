import Image from "next/image";

const partners = [
  {
    name: "AXA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/AXA_Logo.svg/512px-AXA_Logo.svg.png",
  },
  {
    name: "Seguros Monterrey",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Seguros_Monterrey_New_York_Life_logo.svg/512px-Seguros_Monterrey_New_York_Life_logo.svg.png",
  },
  {
    name: "GNP",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/GNPlogo.svg/512px-GNPlogo.svg.png",
  },
  {
    name: "MetLife",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/MetLife_logo.svg/512px-MetLife_logo.svg.png",
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
            Aseguradoras y alianzas estratégicas
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Te ayudamos con la gestión de reembolsos y trámites según tu póliza.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-6 shadow-sm"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
