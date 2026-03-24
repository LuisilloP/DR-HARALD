import type { Metadata } from "next";
import BookingPage from "./BookingPage";

export const metadata: Metadata = {
  title: "Reservas online",
  description:
    "Reserva tu consulta maxilofacial online con selección de servicio, fecha y datos de contacto.",
};

export default function ReservasPage() {
  return <BookingPage />;
}
