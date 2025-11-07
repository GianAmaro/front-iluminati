import React, { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { wsService } from "../services/websocket";

const ConnectionStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnection = () => {
      setIsConnected(wsService.isConnected());
    };

    checkConnection();
    const interval = setInterval(checkConnection, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
        isConnected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      <Activity className={`w-4 h-4 ${isConnected ? "animate-pulse" : ""}`} />
      <span>{isConnected ? "Conectado" : "Desconectado"}</span>
    </div>
  );
};

export default ConnectionStatus;
