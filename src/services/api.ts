import axios from "axios";
import type {
  FlightData,
  SystemStatus,
  ApiResponse,
  ZabbixAlert,
} from "../types";

// Configuración de la API
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://hackitiz-backend.onrender.com";

console.log("🔧 API Base URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Aumentado a 30 segundos para cold starts
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para logging de requests
api.interceptors.request.use(
  (config) => {
    console.log("📤 Request:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
    });
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Interceptor mejorado para manejo de errores
api.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error(
        "⏱️ Timeout Error - El servidor tardó demasiado en responder"
      );
    } else if (error.response) {
      console.error("❌ API Error Response:", {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      console.error("❌ No Response from Server:", {
        url: error.config?.url,
        message: error.message,
        code: error.code,
      });
    } else {
      console.error("❌ Request Setup Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Servicios de la API
export const flightService = {
  // 🔹 Obtener vuelos activos sobre CDMX
  getActiveFlights: async (): Promise<FlightData[]> => {
    try {
      console.log("🛫 Fetching flights over CDMX...");
      const response = await api.get<any>("/flights");

      // Manejar dos posibles formatos de respuesta:
      // 1) { success: boolean, data: FlightData[] }
      // 2) FlightData[] (array plano)
      const resp = response.data;
      if (Array.isArray(resp)) {
        return resp as FlightData[];
      }
      if (resp && Array.isArray(resp.data)) {
        return resp.data as FlightData[];
      }
      // Fallback seguro
      return [];
    } catch (error) {
      console.error("❌ Error fetching flights:", error);
      return [];
    }
  },

  // 🔹 Obtener estadísticas de vuelos
  getFlightStats: async (): Promise<any> => {
    try {
      console.log("📊 Fetching flight stats...");
      const response = await api.get("/metrics/stats");
      return response.data; // ya viene como JSON listo
    } catch (error) {
      console.error("❌ Error fetching stats:", error);
      return null;
    }
  },

  // 🔹 (Opcional) Obtener solo el conteo de vuelos
  getFlightCount: async (): Promise<number> => {
    try {
      const response = await api.get("/metrics/flight_count");
      return response.data.count;
    } catch (error) {
      console.error("❌ Error fetching flight count:", error);
      return 0;
    }
  },

  // 🔹 (Opcional) Obtener timestamp de última actualización
  getLastUpdate: async (): Promise<string | null> => {
    try {
      const response = await api.get("/metrics/last_update");
      return response.data.timestamp;
    } catch (error) {
      console.error("❌ Error fetching last update:", error);
      return null;
    }
  },
};

export const systemService = {
  // Obtener estado del sistema
  getSystemStatus: async (): Promise<SystemStatus | null> => {
    try {
      console.log("🔍 Fetching system status...");
      const response = await api.get<ApiResponse<SystemStatus>>("/status");
      console.log("✅ System status received:", response.data.data);
      return response.data.data || null;
    } catch (error: any) {
      console.error("❌ Error fetching system status:", {
        message: error.message,
        code: error.code,
        response: error.response?.data,
      });
      return null;
    }
  },

  // Health check
  healthCheck: async (): Promise<boolean> => {
    try {
      console.log("💓 Health check...");
      const response = await api.get("/health");
      console.log("✅ Health check passed:", response.status);
      return response.status === 200;
    } catch (error) {
      console.error("❌ Health check failed:", error);
      return false;
    }
  },
};

export const zabbixService = {
  // Obtener alertas desde el backend
  getAlerts: async (): Promise<ZabbixAlert[]> => {
    try {
      console.log("🔔 Fetching Zabbix alerts...");
      const response = await api.get<any>("/zabbix/alerts");
      const raw = response.data || [];

      // Normalizar y validar la forma de las alertas devueltas por el backend
      const normalized: ZabbixAlert[] = Array.isArray(raw)
        ? raw.map((item: any) => ({
            id: String(
              item.id ?? item._id ?? Math.random().toString(36).slice(2)
            ),
            type:
              item.type === "warning" ||
              item.type === "error" ||
              item.type === "success"
                ? item.type
                : "info",
            message: String(item.message ?? item.msg ?? "Alerta"),
            timestamp: item.timestamp ? new Date(item.timestamp) : new Date(),
            action: item.action,
          }))
        : [];

      return normalized;
    } catch (error) {
      console.error("❌ Error fetching alerts:", error);
      return [];
    }
  },
};

export default api;
