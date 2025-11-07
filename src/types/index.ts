// Tipos de datos para la aplicación

export interface Flight {
  icao24: string;
  callsign: string | null;
  origin_country: string;
  time_position: number | null;
  last_contact: number;
  longitude: number | null;
  latitude: number | null;
  baro_altitude: number | null;
  on_ground: boolean;
  velocity: number | null;
  true_track: number | null;
  vertical_rate: number | null;
  sensors: number[] | null;
  geo_altitude: number | null;
  squawk: string | null;
  spi: boolean;
  position_source: number;
}

export interface FlightData {
  icao24: string;
  callsign: string;
  origin_country: string;
  latitude: number;
  longitude: number;
  geo_altitude: number;
  velocity: number;
  heading: number;
  on_ground: boolean;
  last_contact: Date;
}

export interface FlightStats {
  total_vuelos: number;
  en_vuelo: number;
  en_tierra: number;
  promedio_velocidad: number;
  promedio_altitud: number;
}


export interface SystemStatus {
  api_status: "online" | "offline" | "error";
  database_status: "online" | "offline" | "error";
  last_update: Date;
  total_records: number;
  zabbix_status: "online" | "offline" | "error";
}

export interface ZabbixAlert {
  id: string;
  type: "info" | "warning" | "error" | "success";
  message: string;
  timestamp: Date;
  action?: string;
}

export interface TrafficData {
  timestamp: Date;
  count: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
