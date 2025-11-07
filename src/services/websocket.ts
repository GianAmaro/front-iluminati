import { io, Socket } from "socket.io-client";
import type { FlightData, ZabbixAlert, SystemStatus } from "../types";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

class WebSocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, Set<Function>> = new Map();

  connect() {
    if (this.socket?.connected) {
      return;
    }

    this.socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on("connect", () => {
      console.log("WebSocket connected");
    });

    this.socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });

    this.socket.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    // Eventos del sistema
    this.socket.on("flight_update", (data: FlightData) => {
      this.emit("flight_update", data);
    });

    this.socket.on("flights_batch", (data: FlightData[]) => {
      this.emit("flights_batch", data);
    });

    this.socket.on("zabbix_alert", (alert: ZabbixAlert) => {
      this.emit("zabbix_alert", alert);
    });

    this.socket.on("system_status", (status: SystemStatus) => {
      this.emit("system_status", status);
    });

    this.socket.on("flight_count_update", (count: number) => {
      this.emit("flight_count_update", count);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(callback);
  }

  off(event: string, callback: Function) {
    this.listeners.get(event)?.delete(callback);
  }

  private emit(event: string, data: any) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => callback(data));
    }
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export const wsService = new WebSocketService();
export default wsService;
