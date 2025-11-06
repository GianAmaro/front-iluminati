import { useEffect } from "react";
import { Plane } from "lucide-react";
import FlightList from "./components/FlightList";
import FlightMap from "./components/FlightMap";
import FlightStatsChart from "./components/FlightStatsChart";
import StatusCard from "./components/StatusCard";
import ZabbixAlerts from "./components/ZabbixAlerts";
import { mockFlights, mockSystemStatus, mockAlerts } from "./utils/mockData";
import "./App.css";

/**
 * Componente de demostración con datos simulados
 * Usa este componente para probar la UI sin necesidad de backend
 *
 * Para usarlo, reemplaza la importación en main.tsx:
 * import App from './App.demo.tsx'
 */
function AppDemo() {
  useEffect(() => {
    console.log("🎨 Modo Demo Activado - Usando datos simulados");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Plane className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Monitor de Vuelos CDMX
                </h1>
                <p className="text-sm text-gray-600">
                  Modo Demo - Datos Simulados
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
              <span>🎨 Modo Demo</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Primera fila: Estado del Sistema y Alertas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StatusCard status={mockSystemStatus} loading={false} />
            <ZabbixAlerts
              alerts={mockAlerts}
              onRemoveAlert={(id) => console.log("Remove alert:", id)}
              onClearAll={() => console.log("Clear all alerts")}
            />
          </div>

          {/* Segunda fila: Mapa de Vuelos */}
          <div>
            <FlightMap flights={mockFlights} />
          </div>

          {/* Tercera fila: Estadísticas */}
          <div>
            <FlightStatsChart flights={mockFlights} />
          </div>

          {/* Cuarta fila: Lista de Vuelos */}
          <div>
            <FlightList flights={mockFlights} loading={false} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-600">
            Sistema de Monitoreo de Vuelos sobre Ciudad de México - Powered by
            OpenSky API & Zabbix Cloud
          </p>
          <p className="text-center text-xs text-yellow-600 mt-1">
            Modo Demo: Mostrando datos simulados para demostración
          </p>
        </div>
      </footer>
    </div>
  );
}

export default AppDemo;
