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
      <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Plane className="w-6 h-6 text-blue-600" />
          Vuelos Activos ({filteredFlights.length})
        </h2>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por código de vuelo, país o ICAO24..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="max-h-[600px] overflow-y-auto space-y-2">
        {filteredFlights.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Plane className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No se encontraron vuelos</p>
          </div>
        ) : (
          filteredFlights.map((flight) => (
            <div
              key={flight.icao24}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div
                className="p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
                onClick={() =>
                  setExpandedFlight(
                    expandedFlight === flight.icao24 ? null : flight.icao24
                  )
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Plane
                        className={`w-5 h-5 ${
                          flight.on_ground ? "text-gray-400" : "text-blue-600"
                        }`}
                      />
                      <div>
                        <p className="font-bold text-lg">
                          {formatCallsign(flight.callsign)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {flight.origin_country}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Altitud</p>
                      <p className="font-semibold">
                        {formatAltitude(flight.altitude)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Velocidad</p>
                      <p className="font-semibold">
                        {formatVelocity(flight.velocity)}
                      </p>
                    </div>
                    {expandedFlight === flight.icao24 ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {expandedFlight === flight.icao24 && (
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">ICAO24</p>
                      <p className="font-medium">{flight.icao24}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Rumbo</p>
                      <p className="font-medium">
                        {formatHeading(flight.heading)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Estado</p>
                      <p className="font-medium">
                        {flight.on_ground ? (
                          <span className="text-gray-600">⬤ En Tierra</span>
                        ) : (
                          <span className="text-green-600">⬤ En Vuelo</span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Latitud</p>
                      <p className="font-medium">
                        {flight.latitude?.toFixed(4) || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Longitud</p>
                      <p className="font-medium">
                        {flight.longitude?.toFixed(4) || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Último Contacto</p>
                      <p className="font-medium text-sm">
                        {formatTimeAgo(flight.last_contact)}
                      </p>
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
