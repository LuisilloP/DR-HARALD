"use client";

import { Disclosure } from "@headlessui/react";
import { RiArrowDownSLine } from "react-icons/ri";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "¿La cirugía de terceros molares duele mucho?",
    answer:
      "No. Trabajamos con anestesia local y, cuando es necesario, con sedación consciente para que no sientas dolor durante el procedimiento. El postoperatorio se controla con antiinflamatorios y analgésicos recetados, por lo que las molestias suelen ser leves y manejables.",
  },
  {
    question: "¿Cuánto tarda en cicatrizar un implante dental?",
    answer:
      "La osteointegración inicial tarda entre 8 y 12 semanas, dependiendo de la calidad ósea. Desde la primera cita te indicamos controles y cuidados para favorecer una cicatrización rápida y colocar la prótesis definitiva en el momento adecuado.",
  },
  {
    question: "¿Qué diferencia hay entre un implante subperióstico y uno endóseo?",
    answer:
      "El subperióstico se apoya sobre el hueso bajo el periostio y se fabrica a medida para adaptarse al contorno óseo; es ideal cuando el maxilar es delgado porque NO requiere perforar el hueso ni injertos. Los endóseos, en cambio, van dentro del hueso y necesitan mayor volumen óseo.",
  },
  {
    question: "¿Necesito injertos óseos para un implante subperióstico?",
    answer:
      "No: SIN NECESIDAD DE OTRA CIRUGÍA PARA TOMAR INJERTOS ÓSEOS. Al apoyarse sobre el hueso, se evita la toma de injertos adicionales y la recuperación suele ser más rápida.",
  },
  {
    question: "¿Cuándo se colocan los dientes sobre un implante subperióstico?",
    answer:
      "Cuando la fijación inicial es estable, SE INSTALAN LOS DIENTES DE FORMA INMEDIATA el mismo día (carga inmediata). Si el tejido necesita más tiempo, optamos por una carga progresiva para cuidar la adaptación.",
  },
  {
    question: "¿Puedo operarme si tengo diabetes?",
    answer:
      "Sí, siempre que la glicemia esté controlada. Coordinamos con tu médico tratante, realizamos exámenes previos y ajustamos el plan quirúrgico para garantizar una recuperación segura, minimizando riesgos de infección o retraso en la cicatrización.",
  },
  {
    question: "¿Qué cuidados debo tener después de una cirugía oral?",
    answer:
      "Te entregamos instrucciones detalladas que incluyen reposo relativo, dieta blanda, higiene con enjuagues específicos y uso de medicamentos. Además cuentas con un número de contacto directo para resolver dudas durante el proceso de recuperación.",
  },
];

export default function FaqSection() {
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
            Preguntas frecuentes
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Resolvemos tus dudas antes, durante y después del tratamiento
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Selecciona una pregunta para ver la respuesta. Nuestro equipo de
            atención está disponible para profundizar en cada caso.
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
