import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GlassSurface from "../components/GlassSurface";
import FlightList from "../components/FlightList";
import FlightMap from "../components/FlightMap";
import ZabbixAlerts from "../components/ZabbixAlerts";
import Estado from "../components/Estado";
import { mockFlights, mockAlerts } from "../utils/mockData";
import type { FlightData, ZabbixAlert } from "../types";

function DashboardPageDemo() {
  const [flights] = useState<FlightData[]>(mockFlights);
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

              <div className="inline-flex flex-col h-6 items-center justify-center gap-2.5 !p-2.5 relative flex-[0_0_auto] bg-[#00e62a15] rounded-xl overflow-hidden backdrop-blur-[2.0px] backdrop-brightness-[100.0%] backdrop-saturate-[100.0%] [-webkit-backdrop-filter:blur(2.0px)_brightness(100.0%)_saturate(100.0%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)]">
                <div className="relative w-fit mt-[-7.50px] mb-[-5.50px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-sm tracking-[0] leading-[normal]">
                  En línea
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

        {/* Main Content - Wrapped in GlassSurface */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <GlassSurface
            className="w-full max-w-[1400px] !p-8 !bg-white/30"
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
                      statusLabel="En línea"
                      title="OpenSky"
                      subtitle="29/10/25 10:20:13"
                    />

                    <Estado
                      statusLabel="En línea"
                      title="Mongo DB"
                      subtitle="29/10/25 09:45:00"
                    />

                    <Estado
                      statusLabel="Sin conexión"
                      title="Zabbix"
                      subtitle="29/10/25 09:45:00"
                      pillFromColor="rgba(200,200,200,0.6)"
                      pillToColor="rgba(120,120,120,0.6)"
                    />
                    <Estado
                      statusLabel="1358"
                      title="Total de registros"
                      subtitle="29/10/25 10:15:30"
                    />
                  </div>

                  {/* Segunda fila de Estados - 3 en medio */}
                  <div className="flex gap-4">
                    <Estado
                      statusLabel="18"
                      title="Total de vuelos"
                      subtitle="29/10/25 10:15:30"
                    />

                    <Estado
                      statusLabel="33.46ft"
                      title="Altitud promedio"
                      subtitle="29/10/25 10:18:45"
                    />

                    <Estado
                      statusLabel="907hm/h"
                      title="Velocidad promedio"
                      subtitle="29/10/25 10:20:00"
                    />
                    <Estado statusLabel="" title="Ver más" subtitle="" />
                  </div>

                  {/* Lista de Vuelos - Ancho completo de esta columna */}
                  <div className="lg:col-span-4 !space-y-6">
                    <FlightList flights={flights} loading={false} />
                  </div>
                </div>

                {/* Columna derecha - 2/5 del ancho */}
                <div className="lg:col-span-2 flex flex-col gap-6 h-full">
                  {/* ZabbixAlerts - Mitad superior */}
                  <div className="flex-1 min-h-0">
                    <ZabbixAlerts
                      alerts={alerts}
                      onRemoveAlert={removeAlert}
                      onClearAll={clearAlerts}
                    />
                  </div>

                  {/* FlightMap - Mitad inferior */}
                  <div className="flex-1 min-h-0">
                    <FlightMap flights={flights} />
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
