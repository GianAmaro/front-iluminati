import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plane, Home } from "lucide-react";
import GlassSurface from "../components/GlassSurface";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white relative">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src="/videos/clouds.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-50"
        >
          <GlassSurface borderRadius={0} backgroundOpacity={0.1}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Plane className="w-8 h-8 text-blue-300" />
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      Monitor de Vuelos CDMX
                    </h1>
                    <p className="text-sm text-white/70">
                      Sistema de monitoreo en tiempo real con Zabbix Cloud{" "}
                      <span className="text-amber-400 font-semibold">
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
                    className="flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    <span>Inicio</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </GlassSurface>
        </motion.header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            {/* Primera fila: Estado del Sistema y Alertas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <StatusCard status={status} loading={false} />
              <ZabbixAlerts
                alerts={alerts}
                onRemoveAlert={removeAlert}
                onClearAll={clearAlerts}
              />
            </div>

            {/* Segunda fila: Mapa de Vuelos - Centrado */}
            <div className="flex justify-center">
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
        <footer className="mt-12">
          <GlassSurface borderRadius={0} backgroundOpacity={0.1}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
              <p className="text-center text-sm text-white/70">
                Sistema de Monitoreo de Vuelos sobre Ciudad de México - Powered
                by OpenSky API & Zabbix Cloud
                <span className="ml-2 text-amber-400 font-semibold">
                  (MODO DEMO - Datos Simulados)
                </span>
              </p>
            </div>
          </GlassSurface>
        </footer>
      </div>
      {/* End Content Container */}
    </div>
  );
}

export default DashboardPageDemo;
