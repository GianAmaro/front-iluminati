import { useEffect } from "react";
import { Plane } from "lucide-react";
import { wsService } from "./services/websocket";
import { useFlights } from "./hooks/useFlights";
import { useSystemStatus } from "./hooks/useSystemStatus";
import { useZabbixAlerts } from "./hooks/useZabbixAlerts";
import FlightList from "./components/FlightList";
import FlightMap from "./components/FlightMap";
import FlightStatsChart from "./components/FlightStatsChart";
import StatusCard from "./components/StatusCard";
import ZabbixAlerts from "./components/ZabbixAlerts";
import ConnectionStatus from "./components/ConnectionStatus";
import "./App.css";

function App() {
  const { flights, loading: flightsLoading } = useFlights();
  const { status, loading: statusLoading } = useSystemStatus();
  const { alerts, removeAlert, clearAlerts } = useZabbixAlerts();

  useEffect(() => {
    // Conectar al WebSocket al montar la aplicación
    wsService.connect();

    return () => {
      // Desconectar al desmontar
      wsService.disconnect();
    };
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
                  Sistema de monitoreo en tiempo real con Zabbix Cloud
                </p>
              </div>
            </div>
            <ConnectionStatus />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Primera fila: Estado del Sistema y Alertas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StatusCard status={status} loading={statusLoading} />
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
            <FlightList flights={flights} loading={flightsLoading} />
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
        </div>
      </footer>
    </div>
  );
}

export default App;
