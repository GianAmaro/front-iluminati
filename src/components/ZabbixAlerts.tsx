import React from "react";
import {
  Bell,
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

const ZabbixAlerts: React.FC<ZabbixAlertsProps> = ({ alerts }) => {
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

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-gray-700" />
        <h2 className="text-base font-bold text-gray-900">Notificaciones</h2>
      </div>

      <div className="max-h-[280px] overflow-y-auto space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No hay alertas recientes</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/40 relative"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-blue-600">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">
                    {alert.message}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Hace {formatTimeAgo(alert.timestamp)}
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
