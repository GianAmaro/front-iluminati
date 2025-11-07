import React, { useState } from "react";
import { Plane, ChevronDown, ChevronUp } from "lucide-react";
import {
  formatAltitude,
  formatVelocity,
  formatHeading,
  formatCallsign,
  formatTimeAgo,
} from "../utils/formatters";
import type { FlightData } from "../types";

interface FlightListProps {
  flights: FlightData[];
  loading: boolean;
}

const FlightList: React.FC<FlightListProps> = ({ flights, loading }) => {
  const [expandedFlight, setExpandedFlight] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFlights = flights.filter(
    (flight) =>
      formatCallsign(flight.callsign)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      flight.origin_country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.icao24.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-[#17178A] to-[#4A4AE3] rounded-xl shadow-md p-4 animate-pulse">
        <div className="h-5 bg-blue-700 rounded w-1/3 mb-3"></div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-blue-800 rounded-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#0C4B97] to-[#4A9FD9] text-white rounded-xl shadow-md p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Plane className="w-5 h-5 text-white" />
          Vuelos Activos ({filteredFlights.length})
        </h2>
      </div>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar por código de vuelo, país o ICAO24..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="max-h-[600px] overflow-y-auto space-y-2">
        {filteredFlights.length === 0 ? (
          <div className="text-center py-6 text-white/70">
            <Plane className="w-10 h-10 mx-auto mb-1 opacity-50" />
            <p>No se encontraron vuelos</p>
          </div>
        ) : (
          filteredFlights.map((flight) => (
            <div
              key={flight.icao24}
              className="relative rounded-3xl overflow-hidden transition-shadow
                         border-[3px] border-white/20
                         bg-white/10 hover:bg-white/20
                         shadow-[0_0_15px_rgba(74,74,227,0.5)]"
            >
              <div
                className="p-3 cursor-pointer"
                onClick={() =>
                  setExpandedFlight(
                    expandedFlight === flight.icao24 ? null : flight.icao24
                  )
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Plane
                        className={`w-5 h-5 ${
                          flight.on_ground ? "text-white" : "text-blue-200"
                        }`}
                      />
                      <div>
                        <p className="font-bold text-base">
                          {formatCallsign(flight.callsign)}
                        </p>
                        <p className="text-sm text-white/80">
                          {flight.origin_country}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm text-white/80">Altitud</p>
                      <p className="font-semibold">{formatAltitude(flight.altitude)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/80">Velocidad</p>
                      <p className="font-semibold">{formatVelocity(flight.velocity)}</p>
                    </div>
                    {expandedFlight === flight.icao24 ? (
                      <ChevronUp className="w-5 h-5 text-white/80" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/80" />
                    )}
                  </div>
                </div>
              </div>

              {expandedFlight === flight.icao24 && (
                <div className="p-3 border-t border-white/20 rounded-b-3xl">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-white/80">
                    <div>
                      <p className="text-sm">ICAO24</p>
                      <p className="font-medium">{flight.icao24}</p>
                    </div>
                    <div>
                      <p className="text-sm">Rumbo</p>
                      <p className="font-medium">{formatHeading(flight.heading)}</p>
                    </div>
                    <div>
                      <p className="text-sm">Estado</p>
                      <p className="font-medium">
                        {flight.on_ground ? "⬤ En Tierra" : "⬤ En Vuelo"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm">Latitud</p>
                      <p className="font-medium">{flight.latitude?.toFixed(4) || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm">Longitud</p>
                      <p className="font-medium">{flight.longitude?.toFixed(4) || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm">Último Contacto</p>
                      <p className="font-medium text-sm">{formatTimeAgo(flight.last_contact)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FlightList;
