import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const formatDate = (date: Date): string => {
  return format(date, "dd/MM/yyyy HH:mm:ss", { locale: es });
};

export const formatTimeAgo = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true, locale: es });
};

export const formatFlightStatus = (status: string | null): string => {
  if (!status) return "Desconocido";
  switch (status) {
    case "on_time":
      return "A tiempo";
    case "delayed":
      return "Retrasado";
    case "boarding":
      return "Embarcando";
    case "in_flight":
      return "En vuelo";
    case "landed":
      return "Aterrizado";
    default:
      return "Desconocido";
  }
};

export const formatAltitude = (meters: number | null): string => {
  if (meters === null) return "N/A";
  const feet = meters * 3.28084;
  return `${Math.round(feet).toLocaleString()} ft`;
};

export const formatVelocity = (mps: number | null): string => {
  if (mps === null) return "N/A";
  const kmh = mps * 3.6;
  return `${Math.round(kmh)} km/h`;
};

export const formatHeading = (degrees: number | null): string => {
  if (degrees === null) return "N/A";
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degrees / 45) % 8;
  return `${directions[index]} (${Math.round(degrees)}°)`;
};

export const formatCallsign = (callsign: string | null): string => {
  if (!callsign) return "Desconocido";
  return callsign.trim() || "Desconocido";
};
