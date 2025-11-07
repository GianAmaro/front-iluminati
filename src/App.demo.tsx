import { useEffect } from "react";
import FlightMap from "./components/FlightMap";
import FlightStatsChart from "./components/FlightStatsChart";
import StatusCard from "./components/StatusCard";
import ZabbixAlertsContainer from "./components/ZabbixAlertsContainer";
import { mockFlights, mockSystemStatus, mockAlerts } from "./utils/mockData";
import { useSystemStatus } from "./hooks/useSystemStatus";
import "./App.css";
import { Plane, ChartColumn, Map, ClipboardMinus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFlights } from "./hooks/useFlights";


/**
 * Componente de demostración con datos simulados
 * Usa este componente para probar la UI sin necesidad de backend
 *
 * Para usarlo, reemplaza la importación en main.tsx:
 * import App from './App.demo.tsx'
 */
function AppDemo() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("🎨 Modo Demo Activado - Usando datos simulados");
  }, []);

  // 🔹 Hook para obtener el estado del sistema
  const { status, loading: statusLoading } = useSystemStatus();
  const { flights, loading: flightsLoading } = useFlights();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-200">


      {/* Header */}
      <header className="bg-gradient-to-r from-blue-950 to-blue-900 shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
    {/* Logo y título */}
    <div className="flex items-center gap-3">
      <Plane className="w-8 h-8 text-blue-300" />
      <div>
        <h1 className="text-2xl font-bold text-white">
          Sistema de Vuelos: Iluminati
        </h1>
        <p className="text-sm text-blue-200/80">
          Modo Demo - Datos Simulados
        </p>
      </div>
    </div>

    {/* Dashboard botones */}
    <div className="flex items-center gap-2">
      <button className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-800/40 hover:bg-blue-700/60 text-white transition-colors">
        <ChartColumn className="w-5 h-5" />
        <span className="text-sm">Estados del Sistema</span>
      </button>

      <button
  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-800/40 hover:bg-blue-700/60 text-white transition-colors"
  onClick={() => navigate("/mapa")}
>
  <Map className="w-5 h-5" />
  <span className="text-sm">Mapa</span>
</button>


      <button className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-800/40 hover:bg-blue-700/60 text-white transition-colors">
        <ClipboardMinus className="w-5 h-5" />
        <span className="text-sm">Registros</span>
      </button>
    </div>
  </div>
</header>


      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
  <div className="space-y-6">
    {/* Primera fila: Estado del Sistema y Alertas */}
<div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 w-full">
      <div className="mr-4">
        <StatusCard status={status} loading={statusLoading} />
      </div>

      <div className="flex justify-end">
        <div className="flex justify-end">
  <div className="w-full max-w-md">
    {/* 🔥 Reemplaza el componente de mock por el real */}
    <ZabbixAlertsContainer />
  </div>
</div>

      </div>
    </div>

    

    {/* Tercera fila: Estadísticas */}
    <div>
      <FlightStatsChart flights={flights} loadingFlights={flightsLoading} />

    </div>

    
  </div>
</main>


      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-blue-800 border-t border-white mt-12">
  <div className="max-w-7xl mx-auto px-6 py-6 text-center text-white">
    <p className="text-sm">
      Sistema de Monitoreo de Vuelos sobre Ciudad de México
    </p>
    <p className="text-sm font-light">
      Powered by <span className="font-semibold text-blue-300">OpenSky API</span> &{" "}
      <span className="font-semibold text-blue-300">Zabbix Cloud</span>
    </p>
    <p className="text-xs text-yellow-400 mt-2 italic">
      🎨 Modo Demo: Mostrando datos simulados para demostración
    </p>
  </div>
</footer>

    </div>
  );
}

export default AppDemo;
