import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlightMap from "./components/FlightMap";
import FlightList from "./components/FlightList";
import StatusCard from "./components/StatusCard";
import { Plane, ChartColumn, Map, ClipboardMinus } from "lucide-react";
import { useSystemStatus } from "./hooks/useSystemStatus";
import "./App.css";

function Mapa() {
  const navigate = useNavigate();

  // 🔹 Hook para obtener el estado del sistema
  const { status, loading: statusLoading } = useSystemStatus();

  // 🔹 Estados para vuelos
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("✈️ Cargando vuelos desde backend...");

    const fetchFlights = async () => {
      try {
        const response = await fetch("https://hackitiz-backend.onrender.com/flights");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("✅ Vuelos recibidos:", data.length || 0);
        setFlights(data);
      } catch (error) {
        console.error("❌ Error al obtener vuelos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
    const interval = setInterval(fetchFlights, 60000); // refresca cada minuto
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-950 to-blue-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Plane className="w-8 h-8 text-blue-300" />
            <div>
              <h1 className="text-2xl font-bold text-white">
                Sistema de Vuelos: Iluminati
              </h1>
              <p className="text-sm text-blue-200/80">
                🔗 Datos en tiempo real desde backend Flask
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-800/40 hover:bg-blue-700/60 text-white transition-colors"
              onClick={() => navigate("/")}
            >
              <ChartColumn className="w-5 h-5" />
              <span className="text-sm">Estados del Sistema</span>
            </button>

            <button className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-800/40 hover:bg-blue-700/60 text-white transition-colors">
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

      {/* Contenido principal */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 w-full">
            <div className="mr-4">
              {/* ✅ AQUÍ ESTABA EL ERROR - ahora usa datos reales */}
              <StatusCard status={status} loading={statusLoading} />
            </div>
          </div>

          {/* Mapa de vuelos */}
          <div className="mt-12">
            <FlightMap flights={flights} />
          </div>

          {/* Lista de vuelos */}
          <div className="mt-8">
            <FlightList flights={flights} loading={loading} />
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
            Powered by{" "}
            <span className="font-semibold text-blue-300">OpenSky API</span> &{" "}
            <span className="font-semibold text-blue-300">Zabbix Cloud</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Mapa;