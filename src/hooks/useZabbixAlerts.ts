import { useState, useEffect } from "react";
import { wsService } from "../services/websocket";
import { zabbixService } from "../services/api"; // 👈 importar tu nuevo servicio
import type { ZabbixAlert } from "../types";

export const useZabbixAlerts = (maxAlerts: number = 50) => {
  const [alerts, setAlerts] = useState<ZabbixAlert[]>([]);

  // 🔹 Cargar alertas iniciales desde el backend
  useEffect(() => {
    const fetchInitialAlerts = async () => {
      try {
        const data = await zabbixService.getAlerts();
        setAlerts(data.slice(0, maxAlerts));
      } catch (error) {
        console.error("❌ Error fetching initial alerts:", error);
      }
    };
    fetchInitialAlerts();
  }, [maxAlerts]);

  // 🔹 Escuchar nuevas alertas en tiempo real por WebSocket
  useEffect(() => {
    const handleAlert = (alert: ZabbixAlert) => {
      setAlerts((prev) => [alert, ...prev].slice(0, maxAlerts));
    };

    wsService.on("zabbix_alert", handleAlert);

    return () => {
      wsService.off("zabbix_alert", handleAlert);
    };
  }, [maxAlerts]);

  // 🔹 Utilidades
  const clearAlerts = () => setAlerts([]);
  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return { alerts, clearAlerts, removeAlert };
};

