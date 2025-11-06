import axios from "axios";
import type {
  FlightData,
  FlightStats,
  SystemStatus,
  ApiResponse,
} from "../types";

// Configuración de la API
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// Servicios de la API
export const flightService = {
  // Obtener todos los vuelos activos
  getActiveFlights: async (): Promise<FlightData[]> => {
    try {
      const response = await api.get<ApiResponse<FlightData[]>>(
        "/flights/active"
      );
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching active flights:", error);
      return [];
    }
  },

  // Obtener estadísticas de vuelos
  getFlightStats: async (): Promise<FlightStats | null> => {
    try {
      const response = await api.get<ApiResponse<FlightStats>>(
        "/flights/stats"
      );
      return response.data.data || null;
    } catch (error) {
      console.error("Error fetching flight stats:", error);
      return null;
    }
  },

  // Obtener vuelos por país
  getFlightsByCountry: async (country: string): Promise<FlightData[]> => {
    try {
      const response = await api.get<ApiResponse<FlightData[]>>(
        `/flights/country/${country}`
      );
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching flights by country:", error);
      return [];
    }
  },

  // Obtener historial de vuelos
  getFlightHistory: async (hours: number = 24): Promise<FlightData[]> => {
    try {
      const response = await api.get<ApiResponse<FlightData[]>>(
        `/flights/history?hours=${hours}`
      );
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching flight history:", error);
      return [];
    }
  },
};

export const systemService = {
  // Obtener estado del sistema
  getSystemStatus: async (): Promise<SystemStatus | null> => {
    try {
      const response = await api.get<ApiResponse<SystemStatus>>(
        "/system/status"
      );
      return response.data.data || null;
    } catch (error) {
      console.error("Error fetching system status:", error);
      return null;
    }
  },

  // Health check
  healthCheck: async (): Promise<boolean> => {
    try {
      const response = await api.get("/health");
      return response.status === 200;
    } catch (error) {
      return false;
    }
  },
};

export default api;
