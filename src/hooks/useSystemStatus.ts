import { useState, useEffect, useCallback } from "react";
import { systemService } from "../services/api";
import { wsService } from "../services/websocket";
import type { SystemStatus } from "../types";

export const useSystemStatus = () => {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    try {
      setLoading(true);
      const data = await systemService.getSystemStatus();
      setStatus(data);
    } catch (err) {
      console.error("Error fetching system status:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();

    // Actualizar cada 10 segundos
    const interval = setInterval(fetchStatus, 10000);

    // Escuchar actualizaciones en tiempo real
    const handleStatusUpdate = (newStatus: SystemStatus) => {
      setStatus(newStatus);
    };

    wsService.on("system_status", handleStatusUpdate);

    return () => {
      clearInterval(interval);
      wsService.off("system_status", handleStatusUpdate);
    };
  }, [fetchStatus]);

  return { status, loading, refetch: fetchStatus };
};
