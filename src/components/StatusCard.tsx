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
      <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Activity className="w-6 h-6" />
          Estado del Sistema
        </h2>
        <p className="text-gray-500">No se pudo cargar el estado del sistema</p>
      </div>
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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Activity className="w-6 h-6 text-blue-600" />
        Estado del Sistema
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-medium">API OpenSky</span>
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
          <span className="text-gray-700 font-medium">Base de Datos</span>
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
          <span className="text-gray-700 font-medium">Zabbix Monitor</span>
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

        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Registros</p>
              <p className="text-2xl font-bold text-gray-800">
                {status.total_records.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Última Actualización</p>
              <p className="text-sm font-medium text-gray-700">
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
