import React from "react";

export interface EstadoProps {
  statusLabel?: string;
  title?: string;
  subtitle?: string;
  /** CSS color strings for the pill gradient (e.g. 'rgba(17,209,46,0.5)') */
  pillFromColor?: string;
  pillToColor?: string;
  /** Optional click handler to make the card interactive */
  onClick?: () => void;
}

export const Estado: React.FC<EstadoProps> = ({
  statusLabel = "En línea",
  title = "OpenSky",
  subtitle = "29/10/25 10:20:13",
  pillFromColor = "rgba(17,209,46,0.5)",
  pillToColor = "rgba(9,107,23,0.5)",
  onClick,
}) => {
  const pillStyle: React.CSSProperties = {
    background: `linear-gradient(103deg, ${pillFromColor} 0%, ${pillToColor} 100%)`,
  };

  // Detectar si es un estado de conexión (debe mostrar pill con gradiente)
  const isStatusPill =
    statusLabel.toLowerCase().includes("línea") ||
    statusLabel.toLowerCase().includes("conexión") ||
    statusLabel.toLowerCase().includes("online") ||
    statusLabel.toLowerCase().includes("offline");

  const interactiveProps = onClick
    ? {
        role: "button" as const,
        tabIndex: 0,
        onClick,
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        },
      }
    : {};

  return (
    <div
      className={`flex flex-col flex-1 h-[109px] items-start justify-between relative ${
        onClick
          ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40 rounded-[12px]"
          : ""
      }`}
      {...interactiveProps}
    >
      <div className="flex flex-col items-center justify-center gap-2.5 px-[19px] py-3.5 flex-1 self-stretch w-full grow bg-[#ffffff80] rounded-[12px_12px_0px_0px] relative overflow-hidden">
        {isStatusPill ? (
          <div
            className="inline-flex items-center justify-center gap-2.5 !px-2 !py-1.5 flex-[0_0_auto] rounded-[50px] relative overflow-hidden"
            style={pillStyle}
          >
            <div className="relative w-fit !mt-[-1.00px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[21px] tracking-[0] leading-[normal]">
              {statusLabel}
            </div>
          </div>
        ) : (
          <div className="relative w-fit [font-family:'Inter-Bold',Helvetica] font-bold text-black text-[21px] tracking-[0] leading-[normal]">
            {statusLabel}
          </div>
        )}
      </div>

      <div className="flex flex-col items-start gap-1.5 !px-[11px] !py-[9px] flex-1 self-stretch w-full grow bg-[#ffffffcf] rounded-[0px_0px_12px_12px] relative overflow-hidden">
        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[normal] whitespace-nowrap">
          {title}
        </div>

        <div className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-[#828282] text-[12px] tracking-[0] leading-[normal]">
          {subtitle}
        </div>
      </div>
    </div>
  );
};

export default Estado;
