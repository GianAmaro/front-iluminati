import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plane, Home } from "lucide-react";
import FlightList from "../components/FlightList";
import FlightMap from "../components/FlightMap";
import FlightStatsChart from "../components/FlightStatsChart";
import StatusCard from "../components/StatusCard";
import ZabbixAlerts from "../components/ZabbixAlerts";
import ConnectionStatus from "../components/ConnectionStatus";
import { mockFlights, mockSystemStatus, mockAlerts } from "../utils/mockData";
import type { FlightData, SystemStatus, ZabbixAlert } from "../types";

function DashboardPageDemo() {
  const navigate = useNavigate();
  const [flights] = useState<FlightData[]>(mockFlights);
  const [status] = useState<SystemStatus>(mockSystemStatus);
  const [alerts, setAlerts] = useState<ZabbixAlert[]>(mockAlerts);

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  // Simular actualizaciones periódicas
  useEffect(() => {
    const interval = setInterval(() => {
      // Aquí podrías simular cambios en los datos si lo deseas
      console.log("Demo mode: datos simulados activos");
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-md sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Plane className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Monitor de Vuelos CDMX
                </h1>
                <p className="text-sm text-gray-600">
                  Sistema de monitoreo en tiempo real con Zabbix Cloud{" "}
                  <span className="text-amber-600 font-semibold">
                    (MODO DEMO)
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ConnectionStatus />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Inicio</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Primera fila: Estado del Sistema y Alertas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StatusCard status={status} loading={false} />
            <ZabbixAlerts
              alerts={alerts}
              onRemoveAlert={removeAlert}
              onClearAll={clearAlerts}
            />
          </div>

          {/* Segunda fila: Mapa de Vuelos */}
          <div>
            <FlightMap flights={flights} />
          </div>

          {/* Tercera fila: Estadísticas */}
          <div>
            <FlightStatsChart flights={flights} />
          </div>

          {/* Cuarta fila: Lista de Vuelos */}
          <div>
            <FlightList flights={flights} loading={false} />
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-600">
            Sistema de Monitoreo de Vuelos sobre Ciudad de México - Powered by
            OpenSky API & Zabbix Cloud
            <span className="ml-2 text-amber-600 font-semibold">
              (MODO DEMO - Datos Simulados)
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default DashboardPageDemo;
