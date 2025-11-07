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
  "#1E3A8A", // Azul oscuro
  "#047857", // Verde oscuro
  "#B45309", // Naranja oscuro
  "#991B1B", // Rojo intenso
  "#5B21B6", // Morado oscuro
  "#BE185D", // Rosa intenso
  "#0F766E", // Verde azulado
  "#C2410C", // Naranja fuerte
];

const FlightStatsChart: React.FC<FlightStatsProps> = ({ flights }) => {
  const stats = React.useMemo(() => {
    const countryCount: { [key: string]: number } = {};
    let totalAltitude = 0;
    let totalVelocity = 0;
    let validAltitude = 0;
    let validVelocity = 0;

    flights.forEach((flight) => {
      countryCount[flight.origin_country] =
        (countryCount[flight.origin_country] || 0) + 1;

      if (flight.altitude !== null && flight.altitude > 0) {
        totalAltitude += flight.altitude;
        validAltitude++;
      }

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
      avgAltitude: Math.round(avgAltitude * 3.28084),
      avgVelocity: Math.round(totalVelocity / validVelocity * 3.6),
      totalFlights: flights.length,
    };
  }, [flights]);

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Título */}
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 px-4 py-2 rounded-3xl text-white bg-gradient-to-r from-blue-950 to-blue-900 shadow-lg border border-white/20">
        <TrendingUp className="w-6 h-6 text-white" />
        Estadísticas de Vuelos
      </h2>

      {/* Contenedor principal: stats y gráficos */}
      <div className="w-full lg:w-1/2">
  <div className="glass-card flex flex-col sm:flex-row justify-around items-center gap-10 text-center min-h-[180px] p-10 
      bg-gradient-to-r from-blue-950/800 to-blue-900/800 
      border border-white/20 shadow-lg backdrop-blur-lg">
    <div>
      <p className="text-sm opacity-80">Total de Vuelos</p>
      <p className="text-3xl font-bold">{stats.totalFlights}</p>
    </div>
    <div>
      <p className="text-sm opacity-80">Altitud Promedio</p>
      <p className="text-3xl font-bold">{stats.avgAltitude.toLocaleString()} ft</p>
    </div>
    <div>
      <p className="text-sm opacity-80">Velocidad Promedio</p>
      <p className="text-3xl font-bold">{stats.avgVelocity} km/h</p>
    </div>
  </div>
  

      
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Gráfica de Barras */}
        <div className="glass-card p-6 bg-gradient-to-r from-black-950/60 to-blue-900/60 border border-white/20 shadow-lg backdrop-blur-md">
          <h3 className="text-lg font-semibold mb-3 text-center text-white">
            Vuelos por País
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.countryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#000000ff" opacity={0.3} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#15161cff" }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: "#000000ff" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E3A8A",
                  border: "1px solid #1E3A8A",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend wrapperStyle={{ color: "#131419ff" }} />
              <Bar dataKey="value" fill="#1E3A8A" name="Vuelos" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de Pastel */}
        <div className="glass-card p-6 bg-gradient-to-r from-blue-950/60 to-blue-900/60 border border-white/20 shadow-lg backdrop-blur-md">
          <h3 className="text-lg font-semibold mb-3 text-center text-white">
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E3A8A",
                  border: "1px solid #3224fbff",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FlightStatsChart;
