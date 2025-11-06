import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import {
  formatCallsign,
  formatAltitude,
  formatVelocity,
} from "../utils/formatters";
import type { FlightData } from "../types";

// Coordenadas de la Ciudad de México
const CDMX_CENTER: [number, number] = [19.4326, -99.1332];

// Icono personalizado para los aviones (Bootstrap Icons airplane-fill)
const planeIcon = new Icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0iIzNCODJGNiIgY2xhc3M9ImJpIGJpLWFpcnBsYW5lLWZpbGwiIHZpZXdCb3g9IjAgMCAxNiAxNiI+CiAgPHBhdGggZD0iTTYuNDI4IDEuMTUxQzYuNzA4LjU5MSA3LjIxMyAwIDggMHMxLjI5Mi41OTIgMS41NzIgMS4xNTFDOS44NjEgMS43MyAxMCAyLjQzMSAxMCAzdjMuNjkxbDUuMTcgMi41ODVhMS41IDEuNSAwIDAgMSAuODMgMS4zNDJWMTJhLjUuNSAwIDAgMS0uNTgyLjQ5M2wtNS41MDctLjkxOC0uMzc1IDIuMjUzIDEuMzE4IDEuMzE4QS41LjUgMCAwIDEgMTAuNSAxNmgtNWEuNS41IDAgMCAxLS4zNTQtLjg1NGwxLjMxOS0xLjMxOC0uMzc2LTIuMjUzLTUuNTA3LjkxOEEuNS41IDAgMCAxIDAgMTJ2LTEuMzgyYTEuNSAxLjUgMCAwIDEgLjgzLTEuMzQyTDYgNi42OTFWM2MwLS41NjguMTQtMS4yNzEuNDI4LTEuODQ5Ii8+Cjwvc3ZnPg==",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

interface FlightMapProps {
  flights: FlightData[];
}

const MapController: React.FC<{ flights: FlightData[] }> = ({ flights }) => {
  const map = useMap();

  useEffect(() => {
    if (flights.length > 0) {
      const validFlights = flights.filter((f) => f.latitude && f.longitude);
      if (validFlights.length > 0) {
        const bounds = validFlights.map(
          (f) => [f.latitude!, f.longitude!] as [number, number]
        );
        if (bounds.length > 1) {
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      }
    }
  }, [flights, map]);

  return null;
};

const FlightMap: React.FC<FlightMapProps> = ({ flights }) => {
  const [mapReady, setMapReady] = useState(false);

  const validFlights = flights.filter(
    (flight) => flight.latitude && flight.longitude && !flight.on_ground
  );

  useEffect(() => {
    setMapReady(true);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <MapPin className="w-6 h-6 text-blue-600" />
        Mapa de Vuelos sobre CDMX
      </h2>

      <div className="rounded-lg overflow-hidden" style={{ height: "600px" }}>
        {mapReady && (
          <MapContainer
            center={CDMX_CENTER}
            zoom={9}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapController flights={validFlights} />

            {validFlights.map((flight) => (
              <Marker
                key={flight.icao24}
                position={[flight.latitude!, flight.longitude!]}
                icon={planeIcon}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-lg mb-2">
                      {formatCallsign(flight.callsign)}
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>País:</strong> {flight.origin_country}
                      </p>
                      <p>
                        <strong>ICAO24:</strong> {flight.icao24}
                      </p>
                      <p>
                        <strong>Altitud:</strong>{" "}
                        {formatAltitude(flight.altitude)}
                      </p>
                      <p>
                        <strong>Velocidad:</strong>{" "}
                        {formatVelocity(flight.velocity)}
                      </p>
                      <p>
                        <strong>Coordenadas:</strong>{" "}
                        {flight.latitude.toFixed(4)},{" "}
                        {flight.longitude.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>
          Mostrando {validFlights.length} vuelos activos sobre la Ciudad de
          México
        </p>
      </div>
    </div>
  );
};

export default FlightMap;
