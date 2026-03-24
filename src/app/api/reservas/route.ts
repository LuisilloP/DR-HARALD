import { NextResponse } from "next/server";

type BookingRequestBody = {
  serviceId?: string;
  serviceName?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  source?: string;
  customer?: {
    rut?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    phone?: string;
    email?: string;
  };
};

const isValidEmail = (email: string): boolean => {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidDate = (value: string): boolean => {
  if (!value) return false;
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
};

const isValidTime = (value: string): boolean => {
  if (!value) return false;
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
};

export async function POST(request: Request) {
  let body: BookingRequestBody;

  try {
    body = (await request.json()) as BookingRequestBody;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Formato de solicitud inválido." },
      { status: 400 },
    );
  }

  const serviceId = body.serviceId?.trim() ?? "";
  const serviceName = body.serviceName?.trim() ?? "";
  const customer = body.customer ?? {};
  const rut = customer.rut?.trim() ?? "";
  const firstName = customer.firstName?.trim() ?? "";
  const lastName = customer.lastName?.trim() ?? "";
  const fullName =
    customer.fullName?.trim() || `${firstName} ${lastName}`.trim();
  const phone = customer.phone?.trim() ?? "";
  const email = customer.email?.trim() ?? "";
  const preferredDate = body.preferredDate?.trim() ?? "";
  const preferredTime = body.preferredTime?.trim() ?? "";
  const notes = body.notes?.trim() ?? "";
  const source = body.source?.trim() || "web";

  if (!serviceId || !serviceName) {
    return NextResponse.json(
      { ok: false, message: "Selecciona un servicio válido." },
      { status: 400 },
    );
  }

  if (rut.replace(/[.\-\s]/g, "").length < 8) {
    return NextResponse.json(
      { ok: false, message: "Ingresa un RUT válido." },
      { status: 400 },
    );
  }

  if (firstName.length < 2) {
    return NextResponse.json(
      { ok: false, message: "Ingresa un nombre válido." },
      { status: 400 },
    );
  }

  if (lastName.length < 2) {
    return NextResponse.json(
      { ok: false, message: "Ingresa un apellido válido." },
      { status: 400 },
    );
  }

  if (fullName.length < 3) {
    return NextResponse.json(
      { ok: false, message: "Ingresa nombre completo válido." },
      { status: 400 },
    );
  }

  if (phone.replace(/\D/g, "").length < 8) {
    return NextResponse.json(
      { ok: false, message: "Ingresa un teléfono válido." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "El email no tiene un formato válido." },
      { status: 400 },
    );
  }

  if (!isValidDate(preferredDate)) {
    return NextResponse.json(
      { ok: false, message: "Selecciona una fecha válida." },
      { status: 400 },
    );
  }

  if (!isValidTime(preferredTime)) {
    return NextResponse.json(
      { ok: false, message: "Selecciona una hora válida." },
      { status: 400 },
    );
  }

  const reservationPayload = {
    serviceId,
    serviceName,
    preferredDate,
    preferredTime,
    notes,
    source,
    createdAt: new Date().toISOString(),
    customer: {
      rut,
      firstName,
      lastName,
      fullName,
      phone,
      email,
    },
  };

  const bookingApiUrl = process.env.BOOKING_API_URL;
  const bookingApiToken = process.env.BOOKING_API_TOKEN;

  if (!bookingApiUrl) {
    return NextResponse.json(
      {
        ok: true,
        message:
          "Reserva recibida. Configura BOOKING_API_URL para reenviar automáticamente al backend externo.",
      },
      { status: 201 },
    );
  }

  try {
    const upstreamResponse = await fetch(bookingApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(bookingApiToken
          ? { Authorization: `Bearer ${bookingApiToken}` }
          : {}),
      },
      body: JSON.stringify(reservationPayload),
      cache: "no-store",
    });

    const rawResponse = await upstreamResponse.text();
    let parsedResponse: unknown = null;

    if (rawResponse) {
      try {
        parsedResponse = JSON.parse(rawResponse) as unknown;
      } catch {
        parsedResponse = rawResponse;
      }
    }

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Tu reserva no pudo registrarse en el sistema externo. Revisa la API configurada.",
          upstream: parsedResponse,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message:
          "Reserva enviada correctamente. Te contactaremos para confirmación final.",
        upstream: parsedResponse,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          "No fue posible conectar con la API externa de reservas. Intenta nuevamente.",
      },
      { status: 502 },
    );
  }
}
