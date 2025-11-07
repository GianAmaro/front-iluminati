import React from "react";
import type { FlightData } from "../types";

interface FlightStatsProps {
  flights: FlightData[];
}

const FlightStatsChart: React.FC<FlightStatsProps> = ({ flights }) => {
  // Calcular estadísticas
  const stats = React.useMemo(() => {
    const countryCount: { [key: string]: number } = {};
    let totalAltitude = 0;
    let totalVelocity = 0;
    let validAltitude = 0;
    let validVelocity = 0;

    flights.forEach((flight) => {
      // Contar por país
      countryCount[flight.origin_country] =
        (countryCount[flight.origin_country] || 0) + 1;

      // Sumar altitudes
      if (flight.geo_altitude !== null && flight.geo_altitude > 0) {
        totalAltitude += flight.geo_altitude;
        validAltitude++;
      }

      // Sumar velocidades
      if (flight.velocity !== null && flight.velocity > 0) {
        totalVelocity += flight.velocity;
        validVelocity++;
      }
    });

    const countryData = Object.entries(countryCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    const avgAltitude = validAltitude > 0 ? totalAltitude / validAltitude : 0;
    const avgVelocity = validVelocity > 0 ? totalVelocity / validVelocity : 0;

    return {
      countryData,
      avgAltitude: Math.round(avgAltitude * 3.28084), // metros a pies
      avgVelocity: Math.round(avgVelocity * 3.6), // m/s a km/h
      totalFlights: flights.length,
    };
  }, [flights]);

  return (
    <div className="w-full">
      {/* Título de sección */}
      <h3 className="text-sm font-medium text-gray-700 mb-4">
        Estadística de vuelos
      </h3>

      {/* Grid de 4 stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total de Vuelos */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <div className="flex flex-col items-center text-center justify-center h-full">
            <p className="text-5xl font-bold text-gray-900">
              {stats.totalFlights}
            </p>
            <p className="mt-3 text-sm text-gray-700">Total de vuelos</p>
          </div>
        </div>

        {/* Altitud Promedio */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <div className="flex flex-col items-center text-center justify-center h-full">
            <p className="text-4xl font-bold text-gray-900">
              {stats.avgAltitude.toLocaleString()}fts
            </p>
            <p className="mt-3 text-sm text-gray-700">Altitud promedio</p>
          </div>
        </div>

        {/* Velocidad Promedio */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <div className="flex flex-col items-center text-center justify-center h-full">
            <p className="text-4xl font-bold text-gray-900">
              {stats.avgVelocity}km/h
            </p>
            <p className="mt-3 text-sm text-gray-700">Velocidad promedio</p>
          </div>
        </div>

        {/* Ver Gráficas */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 cursor-pointer hover:bg-white/30 transition-colors">
          <div className="flex flex-col items-center text-center justify-center h-full">
            <div className="flex gap-1 mb-2">
              <div className="w-2 h-12 bg-gray-700 rounded"></div>
              <div className="w-2 h-16 bg-gray-700 rounded"></div>
              <div className="w-2 h-10 bg-gray-700 rounded"></div>
              <div className="w-2 h-14 bg-gray-700 rounded"></div>
              <div className="w-2 h-8 bg-gray-700 rounded"></div>
            </div>
            <p className="text-sm text-gray-700 font-medium">Ver Gráficas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightStatsChart;
