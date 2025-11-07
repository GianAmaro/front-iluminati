import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GlassSurface from "../components/GlassSurface";
import FlightList from "../components/FlightList";
import FlightMap from "../components/FlightMap";
//import ZabbixAlerts from "../components/ZabbixAlerts";
import ZabbixAlertsContainer from "../components/ZabbixAlertsContainer";
import Estado from "../components/Estado";
import DestinosChartsModal from "../components/DestinosChartsModal";
import { useFlights } from "../hooks/useFlights";
import { useSystemStatus } from "../hooks/useSystemStatus";
//import { useZabbixAlerts } from "../hooks/useZabbixAlerts";

// Dashboard principal con datos dinámicos

function DashboardPageDemo() {
  const { flights, loading: flightsLoading } = useFlights();
  const { status, loading: statusLoading } = useSystemStatus();
  //const { alerts, clearAlerts, removeAlert } = useZabbixAlerts();
  const [showDestinosModal, setShowDestinosModal] = useState(false);

  // Estado combinado para el pill de estado general
  const allOnline =
    !statusLoading &&
    status?.api_status === "online" &&
    status?.database_status === "online" &&
    status?.zabbix_status === "online";
  const anyOnline =
    !statusLoading &&
    (status?.api_status === "online" ||
      status?.database_status === "online" ||
      status?.zabbix_status === "online");

  const pillLabel = statusLoading
    ? "..."
    : allOnline
    ? "En línea"
    : anyOnline
    ? "Con conexión"
    : "Sin conexión";

  const pillColorClass = statusLoading
    ? "bg-[#00e62a15]"
    : allOnline
    ? "bg-[rgba(17,209,46,0.15)]"
    : anyOnline
    ? "bg-[rgba(255,200,0,0.15)]"
    : "bg-[rgba(200,200,200,0.15)]";

  // Estadísticas derivadas simples
  const totalVuelos = flights.length;
  const promedioAltitud = flights.length
    ? Math.round(
        flights.reduce((acc, f) => acc + f.geo_altitude, 0) / flights.length
      )
    : 0;
  const promedioVelocidad = flights.length
    ? Math.round(
        flights.reduce((acc, f) => acc + f.velocity, 0) / flights.length
      )
    : 0;
  const totalRegistros = status?.total_records ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white relative">
      {/* Image Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="/images/fondo.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-50"
        >
          <div className="flex items-center justify-between !px-[29px] !py-[11px] relative w-full min-w-[926px] min-h-[46px]">
            <div className="inline-flex items-center justify-center gap-3 relative flex-[0_0_auto]">
              <div className="relative w-fit [font-family:'Inter-SemiBold',Helvetica] font-semibold text-white text-sm tracking-[0] leading-[normal]">
                Dashboard
              </div>

              <div
                className={`inline-flex flex-col h-6 items-center justify-center gap-2.5 !p-2.5 relative flex-[0_0_auto] rounded-xl overflow-hidden backdrop-blur-[2.0px] backdrop-brightness-[100.0%] backdrop-saturate-[100.0%] [-webkit-backdrop-filter:blur(2.0px)_brightness(100.0%)_saturate(100.0%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] ${pillColorClass}`}
              >
                <div className="relative w-fit mt-[-7.50px] mb-[-5.50px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-sm tracking-[0] leading-[normal]">
                  {pillLabel}
                </div>
              </div>
            </div>

            <Link
              to="/"
              className="relative w-[38px] h-4 [font-family:'Inter-Medium',Helvetica] font-medium text-white text-sm tracking-[0] leading-[normal] whitespace-nowrap hover:text-white/80 transition-colors"
            >
              Inicio
            </Link>
          </div>
        </motion.header>

        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <GlassSurface
            className="max-w-[1000px] !px-4 !py-4 !bg-white/30"
            backgroundOpacity={0.1}
            borderRadius={24}
          >
            <main>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-6 gap-6"
              >
                {/* Columna izquierda - 3/5 del ancho */}
                <div className="lg:col-span-4 !space-y-6">
                  {/* Primera fila de Estados - 3 arriba */}
                  <div className="flex gap-4">
                    <Estado
                      statusLabel={
                        statusLoading
                          ? "..."
                          : status?.api_status === "online"
                          ? "En línea"
                          : status?.api_status === "error"
                          ? "Error"
                          : "Sin conexión"
                      }
                      title="OpenSky"
                      subtitle={
                        status?.last_update
                          ? new Date(status.last_update).toLocaleTimeString()
                          : "--:--"
                      }
                      pillFromColor={
                        status?.api_status === "online"
                          ? "rgba(17,209,46,0.5)"
                          : status?.api_status === "error"
                          ? "rgba(255,0,0,0.5)"
                          : "rgba(200,200,200,0.6)"
                      }
                      pillToColor={
                        status?.api_status === "online"
                          ? "rgba(9,107,23,0.5)"
                          : status?.api_status === "error"
                          ? "rgba(150,0,0,0.5)"
                          : "rgba(120,120,120,0.6)"
                      }
                    />

                    <Estado
                      statusLabel={
                        statusLoading
                          ? "..."
                          : status?.database_status === "online"
                          ? "En línea"
                          : status?.database_status === "error"
                          ? "Error"
                          : "Sin conexión"
                      }
                      title="Mongo DB"
                      subtitle={
                        status?.last_update
                          ? new Date(status.last_update).toLocaleTimeString()
                          : "--:--"
                      }
                      pillFromColor={
                        status?.database_status === "online"
                          ? "rgba(17,209,46,0.5)"
                          : status?.database_status === "error"
                          ? "rgba(255,0,0,0.5)"
                          : "rgba(200,200,200,0.6)"
                      }
                      pillToColor={
                        status?.database_status === "online"
                          ? "rgba(9,107,23,0.5)"
                          : status?.database_status === "error"
                          ? "rgba(150,0,0,0.5)"
                          : "rgba(120,120,120,0.6)"
                      }
                    />

                    <Estado
                      statusLabel={
                        statusLoading
                          ? "..."
                          : status?.zabbix_status === "online"
                          ? "En línea"
                          : status?.zabbix_status === "error"
                          ? "Error"
                          : "Sin conexión"
                      }
                      title="Zabbix"
                      subtitle={
                        status?.last_update
                          ? new Date(status.last_update).toLocaleTimeString()
                          : "--:--"
                      }
                      pillFromColor={
                        status?.zabbix_status === "online"
                          ? "rgba(17,209,46,0.5)"
                          : status?.zabbix_status === "error"
                          ? "rgba(255,0,0,0.5)"
                          : "rgba(200,200,200,0.6)"
                      }
                      pillToColor={
                        status?.zabbix_status === "online"
                          ? "rgba(9,107,23,0.5)"
                          : status?.zabbix_status === "error"
                          ? "rgba(150,0,0,0.5)"
                          : "rgba(120,120,120,0.6)"
                      }
                    />
                    <Estado
                      statusLabel={
                        statusLoading ? "..." : String(totalRegistros)
                      }
                      title="Total de registros"
                      subtitle={
                        status?.last_update
                          ? new Date(status.last_update).toLocaleTimeString()
                          : "--:--"
                      }
                    />
                  </div>

                  {/* Segunda fila de Estados - 3 en medio */}
                  <div className="flex gap-4">
                    <Estado
                      statusLabel={flightsLoading ? "..." : String(totalVuelos)}
                      title="Total de vuelos"
                      subtitle={
                        flightsLoading
                          ? "Cargando"
                          : new Date().toLocaleTimeString()
                      }
                    />

                    <Estado
                      statusLabel={
                        flightsLoading ? "..." : `${promedioAltitud} ft`
                      }
                      title="Altitud promedio"
                      subtitle={
                        flightsLoading
                          ? "Cargando"
                          : new Date().toLocaleTimeString()
                      }
                    />

                    <Estado
                      statusLabel={
                        flightsLoading ? "..." : `${promedioVelocidad} km/h`
                      }
                      title="Velocidad promedio"
                      subtitle={
                        flightsLoading
                          ? "Cargando"
                          : new Date().toLocaleTimeString()
                      }
                    />
                    <Estado
                      statusLabel=""
                      title="Ver más"
                      subtitle=""
                      onClick={() => setShowDestinosModal(true)}
                    />
                  </div>

                  {/* Mapa de Vuelos - Ancho completo de esta columna */}
                  <div className="lg:col-span-4">
                    <FlightMap flights={flights} />
                  </div>
                </div>

                {/* Columna derecha - 2/5 del ancho */}
                <div className="lg:col-span-2 flex flex-col gap-6 h-full">
                  {/* ZabbixAlerts - Mitad superior */}
                  <div className="flex-1 min-h-0 max-h-[400px]">
                    
                    <div className="w-full max-w-md">
                    {/* 🔥 Reemplaza el componente de mock por el real */}
                    <ZabbixAlertsContainer />
                  </div>
                  </div>
                  

                  {/* FlightList - Mitad inferior */}
                  <div className="flex-1 min-h-0 overflow-hidden">
                    <div className="h-full min-h-0">
                      <FlightList flights={flights} loading={flightsLoading} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </main>
          </GlassSurface>
        </div>

        {/* Footer */}
        <footer className="mt-12">
          <GlassSurface borderRadius={0} backgroundOpacity={0.1}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
              <p className="text-center text-sm text-white/70">
                Sistema de Monitoreo de Vuelos sobre Ciudad de México - Powered
                by OpenSky API & Zabbix Cloud
              </p>
            </div>
          </GlassSurface>
        </footer>
      </div>
      {/* Modal Destinos */}
      {showDestinosModal && (
        <DestinosChartsModal
          flights={flights}
          onClose={() => setShowDestinosModal(false)}
        />
      )}
      {/* End Content Container */}
    </div>
  );
}

export default DashboardPageDemo;
