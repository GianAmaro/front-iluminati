import React from "react";
import { Plane } from "lucide-react";
import {
  formatAltitude,
  formatVelocity,
  formatCallsign,
} from "../utils/formatters";
import type { FlightData } from "../types";

interface FlightListProps {
  flights: FlightData[];
  loading: boolean;
  className?: string;
}

const FlightList: React.FC<FlightListProps> = ({
  flights,
  loading,
  className = "",
}) => {
  if (loading) {
    return (
      <div className={`flex flex-col h-full w-full ${className}`}>
        <div className="items-center !px-[13px] !py-[9px] self-stretch w-full bg-[#ffffffcc] rounded-[12px_12px_0px_0px] flex gap-1.5 overflow-hidden flex-shrink-0">
          <Plane className="w-[32px] h-[21px] text-black" />
          <p className="[font-family:'Inter-Regular',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[normal]">
            Cargando vuelos...
          </p>
        </div>
        <div className="flex-1 min-h-0 flex flex-col items-center gap-1.5 px-3 py-4 self-stretch w-full bg-[#ffffff80] rounded-[0px_0px_12px_12px] overflow-hidden">
          <div className="h-16 bg-white/40 rounded-xl w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col max-h-[350px] w-full overflow-auto ${className}`}>
      <div className="items-center !px-[13px] !py-[9px] self-stretch w-full bg-[#ffffffcc] rounded-[12px_12px_0px_0px] flex gap-1.5 overflow-hidden flex-shrink-0">
        <Plane className="w-[32px] h-[21px] text-black" />
        <p className="[font-family:'Inter-Regular',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[normal] whitespace-nowrap">
          Vuelos activos en Ciudad de México
        </p>
      </div>
      <div className="flex-1 min-h-0 flex flex-col gap-1.5 !px-3 !py-4 overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-white/40 scrollbar-track-white/10 hover:scrollbar-thumb-white/60 rounded-[0px_0px_12px_12px] self-stretch w-full bg-[#ffffff80]">
        {flights.length === 0 ? (
          <div className="flex w-full items-center justify-center p-8 bg-[#ffffff80] rounded-xl">
            <p className="[font-family:'Inter-Regular',Helvetica] font-normal text-black text-[15px]">
              No hay vuelos activos
            </p>
          </div>
        ) : (
          flights.map((flight) => (
            <div
              key={flight.icao24}
              className="flex w-full items-center justify-between !p-2 bg-[#ffffff80] rounded-xl"
            >
              <div className="inline-flex items-center gap-2">
                <Plane className="w-6 h-6 text-black" />
                <div className="flex flex-col items-start gap-[3px]">
                  <div className="[font-family:'Inter-SemiBold',Helvetica] font-semibold text-black text-[15px] tracking-[0] leading-[normal]">
                    {formatCallsign(flight.callsign)}
                  </div>
                  <div className="[font-family:'Inter-SemiBold',Helvetica] font-semibold text-black text-[15px] tracking-[0] leading-[normal]">
                    {flight.origin_country}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col items-start gap-[7px]">
                  <div className="[font-family:'Inter-Medium',Helvetica] font-medium text-black text-[15px] tracking-[0] leading-[normal]">
                    Altitud
                  </div>
                  <div className="[font-family:'Inter-Medium',Helvetica] font-medium text-black text-[15px] tracking-[0] leading-[normal]">
                    {formatAltitude(flight.geo_altitude)}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[7px]">
                  <div className="[font-family:'Inter-Medium',Helvetica] font-medium text-black text-[15px] tracking-[0] leading-[normal]">
                    Velocidad
                  </div>
                  <div className="[font-family:'Inter-Medium',Helvetica] font-medium text-black text-[15px] tracking-[0] leading-[normal]">
                    {formatVelocity(flight.velocity)}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FlightList;
