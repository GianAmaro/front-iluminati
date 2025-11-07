import React, { useEffect, useMemo } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import type { FlightData } from "../types";
import GlassSurface from "./GlassSurface";
import { X } from "lucide-react";

interface DestinosChartsModalProps {
  flights: FlightData[];
  onClose: () => void;
}

const DestinosChartsModal: React.FC<DestinosChartsModalProps> = ({
  flights,
  onClose,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Aggregate by origin_country (used here as destino placeholder)
  const countryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    flights.forEach((f) => {
      map[f.origin_country] = (map[f.origin_country] || 0) + 1;
    });
    return Object.entries(map).map(([country, count]) => ({ country, count }));
  }, [flights]);

  const pieData = countryCounts.map((c, idx) => ({
    id: idx,
    value: c.count,
    label: c.country,
  }));

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="destinos-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <GlassSurface
        className="relative w-full max-w-6xl !p-6 md:!p-8 !bg-white/25 max-h-[90vh] overflow-y-auto"
        borderRadius={24}
        backgroundOpacity={0.15}
      >
        <div className="relative mb-6">
          <button
            onClick={onClose}
            className="!absolute !right-0 !top-0 inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/35 hover:bg-white/55 text-black shadow-sm transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {countryCounts.length === 0 ? (
          <p className="text-sm text-white/80">
            No hay datos de destinos disponibles.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl bg-white/35 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
              <h3 className="text-sm font-medium mb-3">
                Vuelos por país (Barras)
              </h3>
              <div className="h-[320px]">
                <BarChart
                  series={[
                    {
                      data: countryCounts.map((c) => c.count),
                      label: "Vuelos",
                    },
                  ]}
                  xAxis={[
                    {
                      data: countryCounts.map((c) => c.country),
                      scaleType: "band",
                    },
                  ]}
                  height={280}
                  margin={{ top: 10, right: 20, bottom: 40, left: 30 }}
                />
              </div>
            </div>
            <div className="rounded-xl bg-white/35 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
              <h3 className="text-sm font-medium mb-3">
                Distribución (Pastel)
              </h3>
              <div className="h-[320px]">
                <PieChart
                  series={[
                    {
                      data: pieData,
                      innerRadius: 30,
                      outerRadius: 120,
                      paddingAngle: 2,
                      cornerRadius: 4,
                    },
                  ]}
                  height={280}
                />
              </div>
            </div>
          </div>
        )}
      </GlassSurface>
    </div>
  );
};

export default DestinosChartsModal;
