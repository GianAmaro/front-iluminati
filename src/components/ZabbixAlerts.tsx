import React, { useState } from "react";
import { createPortal } from "react-dom";
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
  const [selectedAlert, setSelectedAlert] = useState<ZabbixAlert | null>(null);

  const openAlert = (alert: ZabbixAlert) => setSelectedAlert(alert);
  const closeAlert = () => setSelectedAlert(null);
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
              onClick={() => openAlert(alert)}
              className="w-full h-10 bg-[#ffffff80] rounded-xl relative overflow-hidden flex items-center !px-2 flex-shrink-0 cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openAlert(alert);
              }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveAlert(alert.id);
                    }}
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
      {/* Modal popup para ver el mensaje completo */}
      {selectedAlert &&
        (typeof document !== "undefined" ? (
          createPortal(
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={closeAlert}
                aria-hidden
              />
              <div className="relative bg-white rounded-lg max-w-lg w-full mx-4 p-4 text-black shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {iconForType[selectedAlert.type]}
                    </div>
                    <div>
                      <div className="[font-family:'Inter-SemiBold',Helvetica] font-semibold text-black text-base">
                        Alerta
                      </div>
                      <div className="text-sm text-gray-600">
                        Hace {formatTimeAgo(selectedAlert.timestamp)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={closeAlert}
                    className="p-1 rounded hover:bg-gray-100"
                    aria-label="Cerrar alerta completa"
                  >
                    <X className="w-5 h-5 text-black" />
                  </button>
                </div>

                <div className="mt-4 [font-family:'Inter-Regular',Helvetica] text-black text-sm">
                  {selectedAlert.message}
                </div>

                {selectedAlert.action && (
                  <div className="mt-4 text-sm text-gray-700">
                    <strong>Acción:</strong> {selectedAlert.action}
                  </div>
                )}

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={closeAlert}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-black"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )
        ) : (
          // Fallback para SSR o entornos sin document
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={closeAlert}
              aria-hidden
            />
            <div className="relative bg-white rounded-lg max-w-lg w-full mx-4 p-4 text-black shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {iconForType[selectedAlert.type]}
                  </div>
                  <div>
                    <div className="[font-family:'Inter-SemiBold',Helvetica] font-semibold text-black text-base">
                      Alerta
                    </div>
                    <div className="text-sm text-gray-600">
                      Hace {formatTimeAgo(selectedAlert.timestamp)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeAlert}
                  className="p-1 rounded hover:bg-gray-100"
                  aria-label="Cerrar alerta completa"
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>

              <div className="mt-4 [font-family:'Inter-Regular',Helvetica] text-black text-sm">
                {selectedAlert.message}
              </div>

              {selectedAlert.action && (
                <div className="mt-4 text-sm text-gray-700">
                  <strong>Acción:</strong> {selectedAlert.action}
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <button
                  onClick={closeAlert}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-black"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ZabbixAlerts;
