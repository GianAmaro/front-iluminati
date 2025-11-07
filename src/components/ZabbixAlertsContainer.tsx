import React from "react";
import ZabbixAlerts from "./ZabbixAlerts";
import { useZabbixAlerts } from "../hooks/useZabbixAlerts";

const ZabbixAlertsContainer: React.FC = () => {
  const { alerts, clearAlerts, removeAlert } = useZabbixAlerts();

  return (
    <ZabbixAlerts
      alerts={alerts}
      onClearAll={clearAlerts}
      onRemoveAlert={removeAlert}
    />
  );
};

export default ZabbixAlertsContainer;
