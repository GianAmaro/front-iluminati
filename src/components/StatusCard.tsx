import React from "react";
import { Activity, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import GlassSurface from "./GlassSurface";
import type { SystemStatus } from "../types";

interface StatusCardProps {
  status: SystemStatus | null;
  loading: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({ status, loading }) => {
  if (loading) {
    return (
      <GlassSurface className="p-6 animate-pulse">
        <div className="w-full">
          <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
          <div className="h-20 bg-white/10 rounded"></div>
        </div>
      </GlassSurface>
    );
  }

  if (!status) {
    return (
      <GlassSurface className="p-6">
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
            <Activity className="w-6 h-6 text-blue-300" />
            Estado del Sistema
          </h2>
          <p className="text-white/70">
            No se pudo cargar el estado del sistema
          </p>
        </div>
      </GlassSurface>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "offline":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800";
      case "offline":
        return "bg-red-100 text-red-800";
      case "error":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <GlassSurface className="p-6">
      <div className="w-full">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
          <Activity className="w-6 h-6 text-blue-300" />
          Estado del Sistema
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/90 font-medium">API OpenSky</span>
            <div className="flex items-center gap-2">
              {getStatusIcon(status.api_status)}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  status.api_status
                )}`}
              >
                {status.api_status}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/90 font-medium">Base de Datos</span>
            <div className="flex items-center gap-2">
              {getStatusIcon(status.database_status)}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  status.database_status
                )}`}
              >
                {status.database_status}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/90 font-medium">Zabbix Monitor</span>
            <div className="flex items-center gap-2">
              {getStatusIcon(status.zabbix_status)}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  status.zabbix_status
                )}`}
              >
                {status.zabbix_status}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-white/60">Total Registros</p>
                <p className="text-2xl font-bold text-white">
                  {status.total_records.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-white/60">Última Actualización</p>
                <p className="text-sm font-medium text-white/90">
                  {new Date(status.last_update).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassSurface>
  );
};

export default StatusCard;
