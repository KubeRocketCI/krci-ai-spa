"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export const AuroraBackground = ({
  className,
  children,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "transition-bg relative flex flex-col items-center justify-center bg-black text-slate-200",
        className,
      )}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={
          {
            "--aurora":
              "repeating-linear-gradient(100deg,#06b6d4_10%,#10b981_15%,#3b82f6_20%,#06b6d4_25%,#10b981_30%)",
            "--dark-gradient":
              "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
            "--white-gradient":
              "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",
            "--cyan-400": "#06b6d4",
            "--green-400": "#10b981",
            "--blue-400": "#3b82f6",
            "--black": "#000",
            "--white": "#fff",
            "--transparent": "transparent",
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            `pointer-events-none absolute -inset-[100px] [background-image:var(--dark-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-40 blur-[20px] filter [--aurora:repeating-linear-gradient(100deg,var(--cyan-400)_10%,var(--green-400)_15%,var(--blue-400)_20%,var(--cyan-400)_25%,var(--green-400)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--dark-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] [background-image:var(--dark-gradient),var(--aurora)] after:[background-image:var(--dark-gradient),var(--aurora)]`,
            `[mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.05)_8%,rgba(0,0,0,0.2)_15%,rgba(0,0,0,0.4)_20%,rgba(0,0,0,0.6)_25%,black_40%,black_60%,rgba(0,0,0,0.6)_75%,rgba(0,0,0,0.4)_80%,rgba(0,0,0,0.2)_85%,rgba(0,0,0,0.05)_92%,transparent_100%)]`,
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};
