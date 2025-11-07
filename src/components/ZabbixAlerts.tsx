import React from "react";
import {
  Bell,
  AlertCircle,
  Info,
  AlertTriangle,
  CheckCircle,
  X,
} from "lucide-react";
import { formatTimeAgo } from "../utils/formatters";
import type { ZabbixAlert } from "../types";

interface ZabbixAlertsProps {
  alerts: ZabbixAlert[];
  onRemoveAlert?: (id: string) => void;
  onClearAll?: () => void;
  className?: string;
}

// Map Lucide icon per alert type
const iconForType: Record<ZabbixAlert["type"], React.ReactNode> = {
  info: <Info className="w-5 h-5 text-blue-600" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
  error: <AlertCircle className="w-5 h-5 text-red-600" />,
  success: <CheckCircle className="w-5 h-5 text-green-600" />,
};

const ZabbixAlerts: React.FC<ZabbixAlertsProps> = ({
  alerts,
  onRemoveAlert,
  onClearAll,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col h-full w-full items-center justify-start relative ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 !px-[13px] !py-[9px] self-stretch w-full bg-[#ffffffcc] rounded-[12px_12px_0px_0px] relative overflow-hidden flex-shrink-0">
        <Bell className="w-[17px] h-[18px] text-black" />
        <div className="[font-family:'Inter-SemiBold',Helvetica] font-semibold text-black text-[15px] tracking-[0] leading-[normal]">
          Notificaciones
        </div>
        {onClearAll && alerts.length > 0 && (
          <button
            onClick={onClearAll}
            className="ml-auto text-[15px] text-red-600 hover:text-red-700 transition-colors"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Body list container */}
      <div className="flex flex-col flex-1 items-start gap-1.5 !p-1.5 self-stretch w-full bg-[#ffffff80] rounded-[0px_0px_12px_12px] relative overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="w-full h-16 flex items-center justify-center bg-white/40 rounded-xl text-[15px] text-gray-600">
            No hay alertas recientes
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="w-full h-10 bg-[#ffffff80] rounded-xl relative overflow-hidden flex items-center !px-2 flex-shrink-0"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="flex-shrink-0">{iconForType[alert.type]}</div>
                <div className="truncate [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[15px] leading-[normal]">
                  {alert.message}
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="[font-family:'Inter-Medium',Helvetica] font-medium text-black text-[15px] whitespace-nowrap">
                  Hace {formatTimeAgo(alert.timestamp)}
                </span>
                {onRemoveAlert && (
                  <button
                    onClick={() => onRemoveAlert(alert.id)}
                    className="p-1 rounded hover:bg-white/50 transition-colors"
                    aria-label="Eliminar alerta"
                  >
                    <X className="w-4.5 h-4.5 text-black" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ZabbixAlerts;
