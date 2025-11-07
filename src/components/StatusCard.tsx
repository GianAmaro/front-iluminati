import React from "react";
import { Activity, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import type { SystemStatus } from "../types";

interface StatusCardProps {
  status: SystemStatus | null;
  loading: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({ status, loading }) => {
  if (loading) {
    return (
      <div className="bg-blue-950/30 rounded-lg shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-blue-900/40 rounded w-1/3 mb-4"></div>
        <div className="h-20 bg-blue-900/40 rounded"></div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="bg-blue-950/30 rounded-lg shadow-lg p-6 border border-white/20">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
          <Activity className="w-6 h-6 text-blue-300" />
          Estado del Sistema
        </h2>
        <p className="text-blue-200/80">
          No se pudo cargar el estado del sistema
        </p>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "offline":
        return <XCircle className="w-5 h-5 text-red-400" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-blue-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-950/30 text-green-300";
      case "offline":
        return "bg-red-950/30 text-red-300";
      case "error":
        return "bg-yellow-950/30 text-yellow-300";
      default:
        return "bg-blue-900/30 text-blue-300";
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-950/30 to-blue-900/30 rounded-lg shadow-lg p-6 border border-white/20">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-200">
        <Activity className="w-6 h-6 text-blue-300" />
        Estado del Sistema
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-blue-200 font-medium">API OpenSky</span>
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
          <span className="text-blue-200 font-medium">Base de Datos</span>
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
          <span className="text-blue-200 font-medium">Zabbix Monitor</span>
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

        <div className="pt-4 border-t border-blue-800/40">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-blue-200/80">Total Registros</p>
              <p className="text-2xl font-bold text-blue-200">
                {status.total_records.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-blue-200/80">Última Actualización</p>
              <p className="text-sm font-medium text-blue-200">
                {new Date(status.last_update).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
