import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp } from "lucide-react";
import type { FlightData } from "../types";

interface FlightStatsProps {
  flights: FlightData[];
}

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#F97316",
];

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
      if (flight.altitude !== null && flight.altitude > 0) {
        totalAltitude += flight.altitude;
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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        Estadísticas de Vuelos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total de Vuelos</p>
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalFlights}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Altitud Promedio</p>
          <p className="text-3xl font-bold text-green-600">
            {stats.avgAltitude.toLocaleString()} ft
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Velocidad Promedio</p>
          <p className="text-3xl font-bold text-purple-600">
            {stats.avgVelocity} km/h
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Barras - Países */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            Vuelos por País
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.countryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" name="Vuelos" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Pastel - Distribución */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            Distribución por País
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.countryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: any) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.countryData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FlightStatsChart;
