import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
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
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjOTM5Y2E1IiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxwYXRoIGQ9Ik0xMzIuNTg2LDI4Ny43MzdsMTE4LjMxOSwxNzUuMjA1YzIuNDM4LDMuNjEsNy43NTIsMy42MSwxMC4xODksMGwxMTguMzE5LTE3NS4yMDVjMy41NjctNS4yMDgsNi4wOTgtOS4wMjgsNi4wOTgtOS4wMjhsLTAuMDMzLDAuMDA2YzE1LjMwLTI0LjY3NywyMy43NjgtNTQuMDMzLDIyLjY5LTg1LjQ0NWMtMi42OTAtNzguNDQ2LTY1LjYyNC0xNDIuNjE3LTE0NC4wMS0xNDYuNzA2Yy04Ny43OTYtNC41ODEtMTYwLjQyLDY1LjI1Mi0xNjAuNDIsMTUyLjA0N2MwLDI5LjM5Niw4LjM1Myw1Ni44MzIsMjIuNzgyLDgwLjEwNEMxMjYuNTIxLDI3OC43MTUsMTI5LjM1OCwyODMuMDIxLDEzMi41ODYsMjg3LjczN3ogTTI1Niw5MS4wNDdjNTkuNDA1LDAsMTA3LjU2Myw0OC4xNTgsMTA3LjU2MywxMDcuNTYzYzAsNTkuNDA2LTQ4LjE1OCwxMDcuNTYzLTEwNy41NjMsMTA3LjU2M1MxNDguNDM3LDI1OC4wMTcsMTQ4LjQzNywxOTguNjEwQzE0OC40MzcsMTM5LjIwNSwxOTYuNTk1LDkxLjA0NywyNTYsOTEuMDQ3eiIvPjxwYXRoIGQ9Ik0xODcuNTA2LDE2Mi42MzhjMC41ODksMC45NTcsMS4zODMsMS43ODMsMi4yOTQsMi40NDFsMzYuMDU0LDI2LjA0OWwxMC4zMyw2MS4zMDNjMC40MTIsMi40NDIsMS42NTgsNC42NjYsMy41MjUsNi4yOTJsNi40MTgsNS41ODZjMS43MywxLjUwNiw0LjQzMiwwLjI4OSw0LjQ0OS0yLjAwNWwwLjQyNy01My4wMDZsMzUuOTQ0LDI1Ljk3YzguMjA0LDUuOTI3LDE5LjIxMSw2LjE4OCwyNy42ODcsMC42NTVsMTMuODQ2LTkuMDM5YzEuNTczLTEuMDI2LDEuODY0LTMuMjEyLDAuNjE1LTQuNjE0bC0xLjUyNC0xLjcxMmMtMi43OTktMy4xNDMtNy4wNDItNC41ODMtMTEuMTc2LTMuNzk1bC0xNS44MjksMy4wMjFsLTczLjM1OS02Mi4zMTVjLTcuMTQ3LTYuMDcyLTE2LjIwNi05LjYzMi0yNS41ODQtOS40OTljLTIuOTgyLDAuMDQzLTYuMTA2LDAuNDM4LTkuMjA4LDEuMzg0Yy01LjU4NCwxLjcwMi04LjAzMiw4LjA0Ny01LjA0MywxMy4wNjJjMC4wOTIsMC4xNDMsMC4xNDcsMC4yOTMsMC4yMDMsMC40NDh6Ii8+PHBhdGggZD0iTTI3Mi44MDksMTgxLjQ4YzIuMjA2LDEuOTY1LDUuMDk1LDIuOTg4LDguMDQ2LDIuODVsMzguNDY5LTEuODA5YzEuODY2LTAuNDE5LDIuMzgyLTIuODM0LDAuODUtMy45NzlsLTUuNjgzLTQuMjQ2Yy0xLjY1NC0xLjIzNi0zLjY4Ni0xLjg1OS01Ljc0OC0xLjc2NWwtNDYuMzgzLTUuMDg2Yy0xLjg4My0wLjIwNy0yLjkyLDIuMTI2LTEuNTA2LDMuMzg2TDI3Mi44MDksMTgxLjQ4eiIvPjwvc3ZnPg==",
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
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 h-full flex flex-col">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Vuelos en CDMX</h3>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div
          className="rounded-full overflow-hidden shadow-lg mb-4"
          style={{ width: "280px", height: "280px" }}
        >
          {mapReady && (
            <MapContainer
              center={CDMX_CENTER}
              zoom={9}
              style={{ height: "100%", width: "100%" }}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
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

        <button className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors">
          Ver más
        </button>
      </div>
    </div>
  );
};

export default FlightMap;
