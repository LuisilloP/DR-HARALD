"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCalendarScheduleLine,
  RiCheckFill,
  RiCheckboxCircleFill,
  RiCloseLine,
  RiPulseLine,
  RiStethoscopeLine,
  RiTimerLine,
  RiTimeLine,
  RiUser3Line,
} from "react-icons/ri";
import { CONTACT, DOCTOR, SERVICES } from "@/lib/constants";

/* ─── Types ─── */

type BookingFormData = {
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
};

type ClientFormData = {
  rut: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

type BookingApiResponse = {
  ok: boolean;
  message: string;
};

type BookingServiceOption = {
  id: string;
  title: string;
};

type WeekDayAvailability = {
  id: string;
  isoDate: string;
  dayShort: string;
  dayNumber: string;
  monthShort: string;
  slots: string[];
};

/* ─── Constants ─── */

const STEPS = ["Servicio", "Semana y hora", "Datos cliente", "Confirmar"] as const;

const SLOT_PATTERNS = [
  ["09:00", "10:00", "11:00", "15:00", "16:00", "18:00"],
  ["09:00", "11:00", "15:00", "17:00"],
  ["10:00", "12:00", "16:00", "18:00"],
  ["09:00", "10:00", "15:00", "16:00", "17:00"],
  ["11:00", "12:00", "15:00", "18:00"],
  ["09:00", "10:00", "11:00"],
];

/* ─── Helpers ─── */

const toSlug = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getConsultationName = (originalTitle: string): string => {
  const normalized = toSlug(originalTitle);
  const dictionary: Record<string, string> = {
    "cirugia-oral": "Consulta oral",
    "exodoncia-de-terceros-molares": "Consulta terceros molares",
    "implantes-dentales-y-faciales": "Consulta implantes dentales y faciales",
    "manejo-del-dolor-facial-y-atm": "Consulta ATM y dolor facial",
    "tratamiento-de-fracturas-faciales": "Consulta fracturas faciales",
    "tratamiento-de-quistes-y-tumores": "Consulta quistes y tumores",
  };

  if (dictionary[normalized]) return dictionary[normalized];
  return `Consulta ${originalTitle.toLowerCase()}`;
};

const SERVICE_OPTIONS: BookingServiceOption[] = SERVICES.map((service) => ({
  id: toSlug(service.title),
  title: getConsultationName(service.title),
}));

const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const sanitizeRut = (value: string): string =>
  value
    .replace(/\./g, "")
    .replace(/\s+/g, "")
    .replace(/-/g, "")
    .toUpperCase();

/** Formats a RUT string as XX.XXX.XXX-X while the user types. */
const formatRut = (raw: string): string => {
  const clean = raw.replace(/[^0-9kK]/g, "").toUpperCase();
  if (clean.length === 0) return "";
  if (clean.length === 1) return clean;

  const body = clean.slice(0, -1);
  const verifier = clean.slice(-1);

  // Add dots every 3 digits from right to left
  const reversed = body.split("").reverse();
  const chunks: string[] = [];
  for (let i = 0; i < reversed.length; i += 3) {
    chunks.push(reversed.slice(i, i + 3).reverse().join(""));
  }
  const formatted = chunks.reverse().join(".");

  return `${formatted}-${verifier}`;
};

const SLOT_TIMER_SECONDS = 5 * 60; // 5 minutes

const normalizePhone = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("56")) return `+${digits}`;
  if (digits.startsWith("9") && digits.length === 9) return `+56${digits}`;
  if (digits.length === 8) return `+569${digits}`;
  return `+${digits}`;
};

const buildWeekAvailability = (): WeekDayAvailability[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dayFormatter = new Intl.DateTimeFormat("es-CL", { weekday: "short" });
  const monthFormatter = new Intl.DateTimeFormat("es-CL", { month: "short" });

  return Array.from({ length: 7 }, (_, index) => {
    const current = new Date(today);
    current.setDate(today.getDate() + index);

    const day = current.getDay();
    const slots =
      day === 0
        ? []
        : SLOT_PATTERNS[(index + day) % SLOT_PATTERNS.length].slice(0, 6);

    const isoDate = current.toISOString().split("T")[0];

    return {
      id: isoDate,
      isoDate,
      dayShort: dayFormatter.format(current).replace(".", ""),
      dayNumber: String(current.getDate()),
      monthShort: monthFormatter.format(current).replace(".", ""),
      slots,
    };
  });
};

const formatHumanDate = (isoDate: string): string => {
  if (!isoDate) return "Sin seleccionar";
  const date = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat("es-CL", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  })
    .format(date)
    .replace(".", "");
};

const initialClientData: ClientFormData = {
  rut: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
};

/* ─── Main Component ─── */

export default function BookingPage() {
  const weekAvailability = useMemo(buildWeekAvailability, []);
  const firstAvailableDay = weekAvailability.find((day) => day.slots.length > 0);

  const [selectedDayId, setSelectedDayId] = useState<string>(
    firstAvailableDay?.id ?? "",
  );
  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: "",
    preferredDate: firstAvailableDay?.isoDate ?? "",
    preferredTime: "",
    notes: "",
  });
  const [clientData, setClientData] = useState<ClientFormData>(initialClientData);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [modalError, setModalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [slotTimerSeconds, setSlotTimerSeconds] = useState(0);
  const [timerResetKey, setTimerResetKey] = useState(0);

  const calendarScrollRef = useRef<HTMLDivElement>(null);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start / reset timer when a time slot is selected
  useEffect(() => {
    // Clear any existing timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (!formData.preferredTime) {
      setSlotTimerSeconds(0);
      return;
    }

    // Start countdown
    setSlotTimerSeconds(SLOT_TIMER_SECONDS);
    timerIntervalRef.current = setInterval(() => {
      setSlotTimerSeconds((prev) => {
        if (prev <= 1) {
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [formData.preferredTime, formData.preferredDate, timerResetKey]);

  const selectedService = useMemo(
    () => SERVICE_OPTIONS.find((service) => service.id === formData.serviceId),
    [formData.serviceId],
  );

  const selectedDay = useMemo(
    () => weekAvailability.find((day) => day.id === selectedDayId) ?? null,
    [selectedDayId, weekAvailability],
  );

  const isStep1Ready = Boolean(selectedService);
  const isStep2Ready = Boolean(formData.preferredDate && formData.preferredTime);
  const normalizedPhone = normalizePhone(clientData.phone);
  const isStep3Ready =
    sanitizeRut(clientData.rut).length >= 8 &&
    clientData.firstName.trim().length >= 2 &&
    clientData.lastName.trim().length >= 2 &&
    normalizedPhone.replace(/\D/g, "").length >= 11 &&
    isValidEmail(clientData.email.trim());
  const isStep4Ready = Boolean(successMessage);

  const completedSteps = [isStep1Ready, isStep2Ready, isStep3Ready, isStep4Ready]
    .filter(Boolean).length;
  const progressValue = (completedSteps / STEPS.length) * 100;
  const ctaLabel = submitting
    ? "Enviando reserva..."
    : isStep3Ready
      ? "Revisar y confirmar reserva"
      : "Completar datos del cliente";

  /* ─── Handlers ─── */

  const handleInputChange = (key: keyof BookingFormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setError("");
    setSuccessMessage("");
  };

  const handleClientChange = (key: keyof ClientFormData, value: string): void => {
    const finalValue = key === "rut" ? formatRut(value) : value;
    setClientData((prev) => ({ ...prev, [key]: finalValue }));
    setModalError("");
    setError("");
    setSuccessMessage("");
  };

  const handleServiceSelect = (serviceId: string): void => {
    handleInputChange("serviceId", serviceId);
  };

  const clearServiceSelection = (): void => {
    setFormData((prev) => ({ ...prev, serviceId: "", preferredTime: "" }));
    setError("");
    setSuccessMessage("");
  };

  const handleSelectDay = (day: WeekDayAvailability): void => {
    setSelectedDayId(day.id);
    setFormData((prev) => ({
      ...prev,
      preferredDate: day.isoDate,
      preferredTime: "",
    }));
    setError("");
    setSuccessMessage("");
  };

  const handleSelectTime = (slot: string): void => {
    handleInputChange("preferredTime", slot);
  };

  const timerMinutes = Math.floor(slotTimerSeconds / 60);
  const timerSecs = slotTimerSeconds % 60;
  const timerDisplay = `${timerMinutes}:${String(timerSecs).padStart(2, "0")}`;
  const isTimerExpired = formData.preferredTime !== "" && slotTimerSeconds === 0;
  const isTimerActive = formData.preferredTime !== "" && slotTimerSeconds > 0;

  const scrollCalendar = useCallback((direction: "left" | "right") => {
    const container = calendarScrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.7;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  const openClientModal = (): void => {
    if (!isStep1Ready || !isStep2Ready) {
      setError("Primero selecciona servicio, dia y hora.");
      return;
    }
    setError("");
    setModalError("");
    setIsClientModalOpen(true);
  };

  const handleConfirmReservation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedService || !isStep1Ready || !isStep2Ready) {
      setModalError("Faltan datos de servicio o agenda.");
      return;
    }

    if (!isStep3Ready) {
      setModalError("Completa RUT, nombre, apellido, telefono y email validos.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: formData.serviceId,
          serviceName: selectedService.title,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          notes: formData.notes,
          customer: {
            rut: sanitizeRut(clientData.rut),
            firstName: clientData.firstName.trim(),
            lastName: clientData.lastName.trim(),
            fullName: `${clientData.firstName.trim()} ${clientData.lastName.trim()}`.trim(),
            phone: normalizedPhone,
            email: clientData.email.trim(),
          },
          source: "web-reservas",
        }),
      });

      const payload = (await response.json()) as BookingApiResponse;

      if (!response.ok || !payload.ok) {
        setError(
          payload.message ||
            "No pudimos procesar tu reserva. Intenta nuevamente en unos minutos.",
        );
        return;
      }

      setSuccessMessage(
        payload.message ||
          "Reserva enviada correctamente. Te contactaremos para confirmar.",
      );
      setIsClientModalOpen(false);
    } catch {
      setModalError(
        "No hubo conexion con el servidor de reservas. Intentalo nuevamente.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ─── Render ─── */

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-100 text-slate-900">
      {/* Decorative blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-cyan-300/25 blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-sky-200/20 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-200/70 bg-white/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
            <Link href="/" className="inline-flex min-w-0 items-center gap-2.5 sm:gap-3">
              <Image
                src="/images/logo_v1.png"
                alt="Logo Dr. Harald Ziller"
                width={44}
                height={44}
                className="h-10 w-10 shrink-0 rounded-xl border border-slate-200 bg-white p-1 sm:h-11 sm:w-11"
              />
              <div className="min-w-0 leading-tight">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {DOCTOR.name}
                </p>
                <p className="hidden text-xs text-slate-600 sm:block">
                  Reserva online de consultas
                </p>
              </div>
            </Link>
            <Link
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700 transition hover:bg-emerald-100 sm:px-4 sm:py-2 sm:text-sm"
            >
              WhatsApp
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="mx-auto w-full max-w-6xl px-4 py-5 pb-36 sm:px-6 sm:py-8 sm:pb-10 lg:px-8 lg:py-10">
          <section className="rounded-2xl border border-slate-200/90 bg-white shadow-[0_24px_70px_-24px_rgba(15,23,42,0.35)] sm:rounded-3xl">
            {/* Hero banner */}
            <div className="bg-linear-to-r from-cyan-600 via-teal-600 to-emerald-600 px-4 py-6 text-white sm:px-8 sm:py-7">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
                <RiPulseLine />
                Agenda clinica
              </p>
              <h1 className="mt-3 text-xl font-semibold leading-tight sm:mt-4 sm:text-4xl">
                Reserva tu consulta en pocos pasos
              </h1>
              <p className="mt-2 max-w-2xl text-xs text-cyan-50 sm:mt-3 sm:text-base">
                Flujo simple: servicio, agenda semanal, datos del cliente y confirmacion.
              </p>
            </div>

            {/* Progress bar + steps */}
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-8 sm:py-5">
              <div className="mb-3 flex items-center justify-between text-xs font-medium text-slate-600">
                <span>Progreso de tu reserva</span>
                <span>{Math.round(progressValue)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-linear-to-r from-cyan-500 via-teal-500 to-emerald-500 transition-all duration-300"
                  style={{ width: `${progressValue}%` }}
                />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-1.5 sm:gap-3">
                {STEPS.map((step, index) => {
                  const isReady = index < completedSteps;
                  const stepNumber = index + 1;
                  return (
                    <div
                      key={step}
                      className="flex flex-col items-center gap-1 rounded-lg border border-slate-200 bg-white px-1 py-2 sm:flex-row sm:gap-2 sm:rounded-xl sm:px-2.5 sm:py-2.5 md:p-3"
                    >
                      <span
                        className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold sm:h-7 sm:w-7 sm:text-xs ${
                          isReady
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {isReady ? <RiCheckFill /> : stepNumber}
                      </span>
                      <span className="line-clamp-1 text-center text-[9px] font-medium leading-tight text-slate-700 sm:text-left sm:text-sm">
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Content grid: main + aside */}
            <div className="grid gap-5 px-4 py-5 sm:px-8 sm:py-7 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
              {/* Left column */}
              <div className="min-w-0 space-y-8">
                {/* ─── SERVICE SECTION ─── */}
                <section className="min-w-0">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 sm:text-xl">
                    <RiStethoscopeLine className="shrink-0 text-cyan-600" />
                    Servicio
                  </h2>
                  <p className="mt-1.5 text-sm text-slate-600">
                    Todas las opciones son consultas. Selecciona una.
                  </p>

                  {!selectedService ? (
                    <div className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                      {SERVICE_OPTIONS.map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => handleServiceSelect(service.id)}
                          className="group min-w-0 rounded-xl border border-slate-200 bg-linear-to-b from-white to-slate-50 p-3 text-left transition hover:-translate-y-0.5 hover:border-cyan-400 hover:shadow-md hover:shadow-cyan-100 active:scale-[0.98] sm:rounded-2xl sm:p-4"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="min-w-0 text-sm font-semibold text-slate-900 sm:text-base">
                              {service.title}
                            </p>
                            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-[11px] font-bold text-slate-500 transition group-hover:border-cyan-500 group-hover:text-cyan-700">
                              +
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 rounded-xl border border-cyan-300 bg-linear-to-r from-cyan-50 to-emerald-50 p-3 sm:rounded-2xl sm:p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-700 sm:text-xs">
                        Servicio seleccionado
                      </p>
                      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                        <p className="min-w-0 text-sm font-semibold text-slate-900 sm:text-lg">
                          {selectedService.title}
                        </p>
                        <button
                          type="button"
                          onClick={clearServiceSelection}
                          className="shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700 sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm"
                        >
                          Cambiar
                        </button>
                      </div>
                    </div>
                  )}
                </section>

                {/* ─── CALENDAR SECTION ─── */}
                <section className="min-w-0">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 sm:text-xl">
                    <RiCalendarScheduleLine className="shrink-0 text-cyan-600" />
                    Disponibilidad de la semana
                  </h2>
                  <p className="mt-1.5 text-sm text-slate-600">
                    Selecciona dia y luego una hora disponible.
                  </p>

                  {/* Calendar with arrow buttons */}
                  <div className="mt-4">
                    <div className="flex items-center gap-1.5">
                      {/* Left arrow */}
                      <button
                        type="button"
                        onClick={() => scrollCalendar("left")}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-cyan-400 hover:text-cyan-700 active:scale-95 sm:h-9 sm:w-9"
                        aria-label="Desplazar calendario a la izquierda"
                      >
                        <RiArrowLeftSLine className="text-lg" />
                      </button>

                      {/* Scrollable day cards */}
                      <div
                        ref={calendarScrollRef}
                        className="flex min-w-0 flex-1 gap-2 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                      >
                        {weekAvailability.map((day) => {
                          const isSelected = selectedDayId === day.id;
                          const isDisabled = day.slots.length === 0;

                          return (
                            <button
                              key={day.id}
                              type="button"
                              onClick={() => handleSelectDay(day)}
                              disabled={isDisabled}
                              className={`min-w-[70px] shrink-0 rounded-xl border p-2 text-center transition active:scale-[0.97] sm:min-w-[100px] sm:rounded-2xl sm:p-3 ${
                                isDisabled
                                  ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                                  : isSelected
                                    ? "border-cyan-500 bg-cyan-50 text-cyan-800 shadow-md shadow-cyan-100"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-cyan-300"
                              }`}
                            >
                              <p className="text-[10px] font-semibold uppercase sm:text-xs">
                                {day.dayShort}
                              </p>
                              <p className="mt-0.5 text-lg font-bold sm:mt-1 sm:text-2xl">
                                {day.dayNumber}
                              </p>
                              <p className="text-[10px] uppercase sm:text-xs">
                                {day.monthShort}
                              </p>
                              <p className="mt-1 text-[10px] font-medium sm:mt-2 sm:text-xs">
                                {isDisabled ? "Sin cupos" : `${day.slots.length} horas`}
                              </p>
                            </button>
                          );
                        })}
                      </div>

                      {/* Right arrow */}
                      <button
                        type="button"
                        onClick={() => scrollCalendar("right")}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-cyan-400 hover:text-cyan-700 active:scale-95 sm:h-9 sm:w-9"
                        aria-label="Desplazar calendario a la derecha"
                      >
                        <RiArrowRightSLine className="text-lg" />
                      </button>
                    </div>
                  </div>

                  {/* Available time slots */}
                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:mt-5 sm:rounded-2xl sm:p-4">
                    <p className="text-sm font-semibold leading-snug text-slate-800">
                      Horas disponibles{" "}
                      {selectedDay
                        ? `(${formatHumanDate(selectedDay.isoDate)})`
                        : ""}
                    </p>
                    {selectedDay && selectedDay.slots.length > 0 ? (
                      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {selectedDay.slots.map((slot) => {
                          const isSelected = formData.preferredTime === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => handleSelectTime(slot)}
                              className={`rounded-lg border px-2 py-2.5 text-center text-sm font-semibold transition active:scale-[0.97] sm:rounded-xl sm:px-3 sm:py-2.5 ${
                                isSelected
                                  ? "border-emerald-500 bg-emerald-500 text-white"
                                  : "border-slate-300 bg-white text-slate-700 hover:border-cyan-400 hover:text-cyan-700"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="mt-3 text-sm text-slate-500">
                        No hay horas en este dia. Selecciona otro.
                      </p>
                    )}
                  </div>

                  {/* Timer badge */}
                  {isTimerActive ? (
                    <div className="mt-3 flex items-center gap-2 rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-2 sm:rounded-xl">
                      <span className="relative flex h-2.5 w-2.5 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500" />
                      </span>
                      <RiTimerLine className="shrink-0 text-sm text-cyan-600" />
                      <p className="text-xs font-medium text-cyan-800 sm:text-sm">
                        Hora reservada por <span className="font-bold tabular-nums">{timerDisplay}</span> min
                      </p>
                    </div>
                  ) : isTimerExpired ? (
                    <div className="mt-3 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 sm:rounded-xl">
                      <RiTimerLine className="shrink-0 text-sm text-amber-600" />
                      <p className="text-xs font-medium text-amber-800 sm:text-sm">
                        El tiempo expiro.
                        <button
                          type="button"
                          onClick={() => setTimerResetKey((k) => k + 1)}
                          className="ml-1 font-bold text-amber-900 underline underline-offset-2 transition hover:text-amber-700"
                        >
                          Renovar 5 min
                        </button>
                      </p>
                    </div>
                  ) : null}

                  {/* Notes */}
                  <label className="mt-4 block space-y-1 text-sm">
                    <span className="font-medium text-slate-700">
                      Comentarios adicionales
                    </span>
                    <textarea
                      value={formData.notes}
                      onChange={(event) => handleInputChange("notes", event.target.value)}
                      rows={3}
                      className="block w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-base outline-hidden transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 sm:rounded-xl sm:text-sm"
                      placeholder="Escribe brevemente el motivo de consulta."
                    />
                  </label>

                  <p className="mt-4 flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-medium leading-snug text-slate-600 sm:inline-flex sm:px-4 sm:text-xs">
                    <RiUser3Line className="shrink-0 text-sm text-cyan-600" />
                    <span>Los datos del cliente se piden al final, en el modal.</span>
                  </p>
                </section>
              </div>

              {/* ─── RIGHT SIDEBAR / SUMMARY ─── */}
              <aside className="min-w-0 h-fit rounded-xl border border-slate-200 bg-slate-50 p-2 sm:rounded-2xl sm:p-4 lg:sticky lg:top-6">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white sm:rounded-2xl">
                  <div className="bg-slate-900 px-4 py-3 text-white sm:py-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300 sm:text-[11px]">
                      Resumen de reserva
                    </p>
                    <p className="mt-1.5 break-words text-sm font-semibold leading-tight sm:mt-2 sm:text-lg">
                      {selectedService?.title ?? "Selecciona un servicio"}
                    </p>
                    <p className="mt-1 break-words text-[11px] text-slate-300 sm:text-sm">
                      {formData.preferredDate && formData.preferredTime
                        ? `${formatHumanDate(formData.preferredDate)} - ${formData.preferredTime}`
                        : "Sin fecha ni hora seleccionada"}
                    </p>
                  </div>
                  <div className="divide-y divide-slate-200">
                    <SummaryLine
                      label="Paciente"
                      value={
                        clientData.firstName || clientData.lastName
                          ? `${clientData.firstName} ${clientData.lastName}`.trim()
                          : "Se solicitara al finalizar"
                      }
                    />
                    <SummaryLine
                      label="RUT"
                      value={clientData.rut || "Se solicitara al finalizar"}
                    />
                    <SummaryLine
                      label="Telefono"
                      value={normalizedPhone || "Se solicitara al finalizar"}
                    />
                    <SummaryLine
                      label="Estado"
                      value={isStep2Ready ? "Agenda seleccionada" : "Pendiente de agenda"}
                    />
                  </div>
                </div>

                <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-2.5 sm:mt-4 sm:rounded-xl sm:p-3">
                  <p className="text-xs font-medium text-emerald-800">Confirmacion manual</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-emerald-700 sm:text-xs">
                    La hora queda solicitada y luego se confirma por telefono o WhatsApp.
                  </p>
                </div>

                {error ? (
                  <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 sm:mt-4">
                    {error}
                  </p>
                ) : null}

                {successMessage ? (
                  <p className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 sm:mt-4">
                    {successMessage}
                  </p>
                ) : null}

                <button
                  type="button"
                  onClick={openClientModal}
                  disabled={!isStep1Ready || !isStep2Ready || submitting}
                  className="mt-4 hidden w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-600 to-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 lg:inline-flex"
                >
                  <RiTimeLine className="text-base" />
                  {ctaLabel}
                </button>
              </aside>
            </div>
          </section>
        </main>

        {/* Fixed bottom CTA (mobile/tablet only) */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 shadow-[0_-10px_30px_-20px_rgba(15,23,42,0.5)] backdrop-blur lg:hidden">
          <div className="mx-auto w-full max-w-6xl px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-2.5">
            <button
              type="button"
              onClick={openClientModal}
              disabled={!isStep1Ready || !isStep2Ready || submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-600 to-emerald-600 px-4 py-3.5 text-sm font-semibold text-white transition active:scale-[0.98] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RiTimeLine className="text-base" />
              {ctaLabel}
            </button>
          </div>
        </div>

        {/* Client data modal */}
        {isClientModalOpen ? (
          <div className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/50 sm:items-center sm:p-4">
            <div className="max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl shadow-slate-900/35 sm:rounded-2xl sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                  Datos del cliente
                </h2>
                <button
                  type="button"
                  onClick={() => setIsClientModalOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Cerrar modal"
                >
                  <RiCloseLine className="text-xl" />
                </button>
              </div>

              <form onSubmit={handleConfirmReservation} className="space-y-3">
                <input
                  value={clientData.rut}
                  onChange={(event) => handleClientChange("rut", event.target.value)}
                  className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-hidden transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 sm:text-sm"
                  placeholder="Ej: 20.091.176-8"
                  autoComplete="off"
                  maxLength={12}
                  required
                />
                <input
                  value={clientData.firstName}
                  onChange={(event) => handleClientChange("firstName", event.target.value)}
                  className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-hidden transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 sm:text-sm"
                  placeholder="Nombre"
                  autoComplete="given-name"
                  required
                />
                <input
                  value={clientData.lastName}
                  onChange={(event) => handleClientChange("lastName", event.target.value)}
                  className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-hidden transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 sm:text-sm"
                  placeholder="Apellido"
                  autoComplete="family-name"
                  required
                />
                <div className="flex overflow-hidden rounded-xl border border-slate-300">
                  <span className="inline-flex shrink-0 items-center border-r border-slate-300 bg-slate-50 px-3 text-sm font-semibold text-slate-600 sm:px-4">
                    +569
                  </span>
                  <input
                    value={clientData.phone}
                    onChange={(event) => handleClientChange("phone", event.target.value)}
                    className="min-w-0 flex-1 px-3 py-3 text-base outline-hidden transition focus:bg-cyan-50/40 sm:px-4 sm:text-sm"
                    placeholder="Ingrese telefono"
                    autoComplete="tel"
                    required
                  />
                </div>
                <input
                  type="email"
                  value={clientData.email}
                  onChange={(event) => handleClientChange("email", event.target.value)}
                  className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-hidden transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 sm:text-sm"
                  placeholder="Email"
                  autoComplete="email"
                  required
                />

                {modalError ? (
                  <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    {modalError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 flex w-full items-center justify-center rounded-xl bg-emerald-400 px-4 py-3 text-base font-semibold text-white transition hover:bg-emerald-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg"
                >
                  {submitting ? "Confirmando..." : "Confirmar reserva"}
                </button>
              </form>
            </div>
          </div>
        ) : null}

        {/* Success confirmation overlay */}
        {successMessage ? (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-white/95 p-6 backdrop-blur-sm">
            <div className="w-full max-w-md text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 sm:h-24 sm:w-24">
                <RiCheckboxCircleFill className="text-5xl text-emerald-500 sm:text-6xl" />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-slate-900 sm:text-3xl">
                ¡Reserva confirmada!
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                {successMessage}
              </p>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Detalle de la reserva</p>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Servicio</span>
                    <span className="font-medium text-slate-900">{selectedService?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Fecha</span>
                    <span className="font-medium text-slate-900">{formatHumanDate(formData.preferredDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Hora</span>
                    <span className="font-medium text-slate-900">{formData.preferredTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Paciente</span>
                    <span className="font-medium text-slate-900">{clientData.firstName} {clientData.lastName}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-cyan-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 active:scale-[0.98]"
                >
                  Volver al inicio
                </Link>
                <Link
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 active:scale-[0.98]"
                >
                  Escribir por WhatsApp
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */

type SummaryRowProps = {
  label: string;
  value: string;
};

function SummaryLine({ label, value }: SummaryRowProps) {
  return (
    <div className="px-3 py-2.5 sm:px-4 sm:py-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-[11px] sm:tracking-[0.16em]">
        {label}
      </p>
      <p className="mt-0.5 break-words text-sm font-medium leading-snug text-slate-900 sm:mt-1">
        {value}
      </p>
    </div>
  );
}
