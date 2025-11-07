import { useState, useEffect, useCallback } from "react";
import { flightService } from "../services/api";
import { wsService } from "../services/websocket";
import type { FlightData } from "../types";

export const useFlights = () => {
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFlights = useCallback(async () => {
    try {
      setLoading(true);
      const data = await flightService.getActiveFlights();
      setFlights(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los vuelos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlights();

    // Actualizar cada 30 segundos
    const interval = setInterval(fetchFlights, 30000);

    // Escuchar actualizaciones en tiempo real
    const handleFlightUpdate = (flight: FlightData) => {
      setFlights((prev) => {
        const index = prev.findIndex((f) => f.icao24 === flight.icao24);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = flight;
          return updated;
        } else {
          return [...prev, flight];
        }
      });
    };

    const handleFlightsBatch = (newFlights: FlightData[]) => {
      setFlights(newFlights);
    };

    wsService.on("flight_update", handleFlightUpdate);
    wsService.on("flights_batch", handleFlightsBatch);

    return () => {
      clearInterval(interval);
      wsService.off("flight_update", handleFlightUpdate);
      wsService.off("flights_batch", handleFlightsBatch);
    };
  }, [fetchFlights]);

  return { flights, loading, error, refetch: fetchFlights };
};
