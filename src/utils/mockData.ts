// Mock data para desarrollo y pruebas locales
import type { FlightData, SystemStatus, ZabbixAlert } from "../types";

export const mockFlights: FlightData[] = [
  {
    icao24: "a12345",
    callsign: "AM123",
    origin_country: "Mexico",
    latitude: 19.4326,
    longitude: -99.1332,
    geo_altitude: 10000,
    velocity: 250,
    heading: 45,
    on_ground: false,
    last_contact: new Date(Date.now() - 60000),
  },
  {
    icao24: "b67890",
    callsign: "VB456",
    origin_country: "United States",
    latitude: 19.5,
    longitude: -99.2,
    geo_altitude: 8500,
    velocity: 220,
    heading: 180,
    on_ground: false,
    last_contact: new Date(Date.now() - 120000),
  },
  {
    icao24: "c11111",
    callsign: "IB789",
    origin_country: "Spain",
    latitude: 19.35,
    longitude: -99.15,
    geo_altitude: 12000,
    velocity: 280,
    heading: 270,
    on_ground: false,
    last_contact: new Date(Date.now() - 30000),
  },
  {
    icao24: "d22222",
    callsign: "AA321",
    origin_country: "United States",
    latitude: 19.48,
    longitude: -99.08,
    geo_altitude: 9500,
    velocity: 245,
    heading: 90,
    on_ground: false,
    last_contact: new Date(Date.now() - 90000),
  },
  {
    icao24: "e33333",
    callsign: "DL654",
    origin_country: "United States",
    latitude: 19.4,
    longitude: -99.1,
    geo_altitude: 11000,
    velocity: 265,
    heading: 135,
    on_ground: false,
    last_contact: new Date(Date.now() - 45000),
  },
];

export const mockSystemStatus: SystemStatus = {
  api_status: "online",
  database_status: "online",
  zabbix_status: "online",
  last_update: new Date(),
  total_records: 1523,
};

export const mockAlerts: ZabbixAlert[] = [
  {
    id: "1",
    type: "info",
    message: "Nuevo vuelo detectado: AM123",
    timestamp: new Date(Date.now() - 300000),
    action: "Registro automático en base de datos",
  },
  {
    id: "2",
    type: "success",
    message: "API de OpenSky respondiendo correctamente",
    timestamp: new Date(Date.now() - 600000),
  },
  {
    id: "3",
    type: "warning",
    message: "Alto tráfico aéreo detectado: 15 vuelos simultáneos",
    timestamp: new Date(Date.now() - 900000),
    action: "Alerta enviada al dashboard",
  },
];
