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
      <div className="w-full">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
          <Activity className="w-6 h-6 text-blue-300" />
          Estado del Sistema
        </h2>
        <p className="text-white/70">No se pudo cargar el estado del sistema</p>
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
    <div className="w-full">
      {/* Grid de 4 status cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* OpenSky Card */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <div className="flex flex-col items-center text-center">
            {getStatusIcon(status.api_status)}
            <span
              className={`mt-3 px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(
                status.api_status
              )}`}
            >
              {status.api_status === "online" ? "En línea" : status.api_status}
            </span>
            <p className="mt-3 text-sm text-gray-700 font-medium">OpenSky</p>
            <p className="text-xs text-gray-600 mt-1">
              {new Date(status.last_update).toLocaleString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* BD Card */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <div className="flex flex-col items-center text-center">
            {getStatusIcon(status.database_status)}
            <span
              className={`mt-3 px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(
                status.database_status
              )}`}
            >
              {status.database_status === "online"
                ? "En línea"
                : status.database_status}
            </span>
            <p className="mt-3 text-sm text-gray-700 font-medium">BD</p>
            <p className="text-xs text-gray-600 mt-1">
              {new Date(status.last_update).toLocaleString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* Zabbix Cloud Card */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <div className="flex flex-col items-center text-center">
            {getStatusIcon(status.zabbix_status)}
            <span
              className={`mt-3 px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(
                status.zabbix_status
              )}`}
            >
              {status.zabbix_status === "online"
                ? "En línea"
                : status.zabbix_status}
            </span>
            <p className="mt-3 text-sm text-gray-700 font-medium">
              Zabbix Cloud
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {new Date(status.last_update).toLocaleString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* Total Registros Card */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <div className="flex flex-col items-center text-center justify-center h-full">
            <p className="text-5xl font-bold text-gray-900">
              {status.total_records.toLocaleString()}
            </p>
            <p className="mt-3 text-sm text-gray-700 font-medium">
              Total de registros
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {new Date(status.last_update).toLocaleString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
