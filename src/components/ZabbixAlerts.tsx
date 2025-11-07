import React from "react";
import {
  Bell,
  X,
  AlertCircle,
  Info,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import GlassSurface from "./GlassSurface";
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
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-5 h-5" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5" />;
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "info":
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getAlertStyles = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "info":
      default:
        return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  return (
    <GlassSurface className="p-6">
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            <Bell className="w-6 h-6 text-blue-300" />
            Alertas de Zabbix ({alerts.length})
          </h2>
          {alerts.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-sm text-white/70 hover:text-white underline"
            >
              Limpiar Todo
            </button>
          )}
        </div>

        <div className="max-h-[400px] overflow-y-auto space-y-2">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-gray-200">
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No hay alertas recientes</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`border rounded-lg p-4 ${getAlertStyles(
                  alert.type
                )} relative bg-white/5 border-white/10`}
              >
                <button
                  onClick={() => onRemoveAlert(alert.id)}
                  className="absolute top-2 right-2 hover:opacity-70"
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
    </GlassSurface>
  );
};

export default ZabbixAlerts;
