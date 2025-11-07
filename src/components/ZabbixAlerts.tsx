import React, { useState } from "react";
import {
  Bell,
  X,
  AlertCircle,
  Info,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { formatTimeAgo } from "../utils/formatters";
import type { ZabbixAlert } from "../types";

interface ZabbixAlertsProps {
  alerts: ZabbixAlert[];
  onRemoveAlert: (id: string) => void;
  onClearAll: () => void;
}

const ZabbixAlerts: React.FC<ZabbixAlertsProps> = ({
  alerts,
  onRemoveAlert,
  onClearAll,
}) => {
  const [top, setTop] = useState(50); // posición inicial vertical
  const [dragging, setDragging] = useState(false);
  const [relY, setRelY] = useState<number | null>(null);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "info":
      default:
        return <Info className="w-5 h-5 text-blue-300" />;
    }
  };

  const getAlertStyles = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-900/20 border-red-500 text-red-200 hover:bg-red-900/10";
      case "warning":
        return "bg-yellow-900/20 border-yellow-400 text-yellow-200 hover:bg-yellow-900/10";
      case "success":
        return "bg-green-900/20 border-green-500 text-green-200 hover:bg-green-900/10";
      case "info":
      default:
        return "bg-blue-900/20 border-blue-500 text-blue-200 hover:bg-blue-900/10";
    }
  };

  // Funciones para drag vertical
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setRelY(e.clientY - top);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging || relY === null) return;
    setTop(e.clientY - relY);
  };

  const onMouseUp = () => {
    setDragging(false);
    setRelY(null);
  };

  return (
    <div
      className="glass-card fixed cursor-grab z-50"
      style={{
        top: top,
        right: 20,
        width: "350px",
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div className="flex items-center justify-between mb-4 text-white">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Bell className="w-6 h-6 text-blue-300" />
          Alertas de Zabbix ({alerts.length})
        </h2>
        {alerts.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm text-blue-200 hover:text-white underline"
          >
            Limpiar Todo
          </button>
        )}
      </div>

      <div className="max-h-[400px] overflow-y-auto space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-blue-200 opacity-80">
            <Bell className="w-12 h-12 mx-auto mb-2 opacity-60" />
            <p>No hay alertas recientes</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-lg p-4 ${getAlertStyles(
                alert.type
              )} relative transition-all`}
            >
              <button
                onClick={() => onRemoveAlert(alert.id)}
                className="absolute top-2 right-2 hover:opacity-70 text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-3 pr-6">
                <div className="mt-1">{getAlertIcon(alert.type)}</div>
                <div className="flex-1">
                  <p className="font-medium mb-1">{alert.message}</p>
                  {alert.action && (
                    <p className="text-sm opacity-80 mb-1">
                      Acción: {alert.action}
                    </p>
                  )}
                  <p className="text-xs opacity-70">
                    {formatTimeAgo(alert.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ZabbixAlerts;
