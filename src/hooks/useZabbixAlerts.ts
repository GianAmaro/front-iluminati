import { useState, useEffect } from "react";
import { wsService } from "../services/websocket";
import type { ZabbixAlert } from "../types";

export const useZabbixAlerts = (maxAlerts: number = 50) => {
  const [alerts, setAlerts] = useState<ZabbixAlert[]>([]);

  useEffect(() => {
    const handleAlert = (alert: ZabbixAlert) => {
      setAlerts((prev) => [alert, ...prev].slice(0, maxAlerts));
    };

    wsService.on("zabbix_alert", handleAlert);

    return () => {
      wsService.off("zabbix_alert", handleAlert);
    };
  }, [maxAlerts]);

  const clearAlerts = () => setAlerts([]);

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return { alerts, clearAlerts, removeAlert };
};
