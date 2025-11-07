import React from "react";
import { BarChart as MuiBarChart } from "@mui/x-charts/BarChart";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";
import GlassSurface from "./GlassSurface";
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
    <GlassSurface className="p-6">
      <div className="w-full">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
          <TrendingUp className="w-6 h-6 text-blue-300" />
          Estadísticas de Vuelos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-white/10">
            <p className="text-sm text-white/60">Total de Vuelos</p>
            <p className="text-3xl font-bold text-blue-400">
              {stats.totalFlights}
            </p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-white/10">
            <p className="text-sm text-white/60">Altitud Promedio</p>
            <p className="text-3xl font-bold text-green-400">
              {stats.avgAltitude.toLocaleString()} ft
            </p>
          </div>
          <div className="bg-purple-500/10 p-4 rounded-lg border border-white/10">
            <p className="text-sm text-white/60">Velocidad Promedio</p>
            <p className="text-3xl font-bold text-purple-400">
              {stats.avgVelocity} km/h
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Barras - Países */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white/90">
              Vuelos por País
            </h3>
            <div className="w-full">
              <MuiBarChart
                xAxis={[
                  {
                    id: "countries",
                    data: stats.countryData.map((d) => d.name),
                    scaleType: "band",
                    colorMap: {
                      type: "ordinal",
                      colors: ["#e5e7eb"],
                    },
                  },
                ]}
                series={[
                  {
                    label: "Vuelos",
                    data: stats.countryData.map((d) => d.value),
                    color: "#60A5FA",
                  },
                ]}
                height={300}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                sx={{
                  // Texto de ejes y etiquetas
                  "& .MuiChartsAxis-tickLabel": {
                    fill: "#e5e7eb !important",
                    fontSize: "12px",
                  },
                  "& .MuiChartsAxis-label": {
                    fill: "#e5e7eb !important",
                  },
                  // Líneas de ejes
                  "& .MuiChartsAxis-line": {
                    stroke: "rgba(184, 184, 184, 0.87) !important",
                  },
                  "& .MuiChartsAxis-tick": {
                    stroke: "rgba(255, 255, 255, 1) !important",
                  },
                  // Grid lines
                  "& .MuiChartsGrid-line": {
                    stroke: "rgba(255, 255, 255, 0.55) !important",
                  },
                  // Leyenda
                  "& .MuiChartsLegend-label": {
                    fill: "#e5e7eb !important",
                  },
                  // Tooltip
                  "& .MuiChartsTooltip-root": {
                    backgroundColor: "rgba(115, 116, 117, 0.95) !important",
                    border: "1px solid rgba(199, 199, 199, 0.77) !important",
                    borderRadius: "8px !important",
                  },
                  "& .MuiChartsTooltip-label, & .MuiChartsTooltip-value": {
                    color: "#e5e7eb !important",
                  },
                }}
                grid={{ vertical: true, horizontal: true }}
              />
            </div>
          </div>

          {/* Gráfico de Pastel - Distribución */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white/90">
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
                <Tooltip
                  contentStyle={{
                    background: "rgba(17,24,39,0.9)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 8,
                    color: "#e5e7eb",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </GlassSurface>
  );
};

export default FlightStatsChart;
