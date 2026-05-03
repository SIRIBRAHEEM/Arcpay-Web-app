"use client";

import { cn } from "@/lib/utils";

type ArcNetworkAnimationProps = {
  className?: string;
};

export function ArcNetworkAnimation({ className }: ArcNetworkAnimationProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035]",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(32,213,159,0.22),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.18),transparent_30%)]" />

      <svg
        viewBox="0 0 720 360"
        className="relative h-full min-h-64 w-full"
        role="img"
        aria-label="Animated ARC network"
      >
        <defs>
          <linearGradient id="arcLine" x1="0" x2="1">
            <stop offset="0%" stopColor="#20D59F" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>

          <filter id="arcGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M80 235 C190 95 310 95 420 210 S610 300 675 135"
          fill="none"
          stroke="url(#arcLine)"
          strokeWidth="2"
          strokeDasharray="10 14"
          className="animate-[dash_12s_linear_infinite]"
          filter="url(#arcGlow)"
        />

        <path
          d="M55 155 C180 270 310 270 430 145 S590 55 680 210"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.5"
          strokeDasharray="6 14"
          className="animate-[dashReverse_15s_linear_infinite]"
        />

        {[
          [90, 235],
          [205, 112],
          [360, 160],
          [492, 245],
          [655, 145],
          [125, 155],
          [300, 265],
          [530, 92]
        ].map(([x, y], index) => (
          <g key={`${x}-${y}`}>
            <circle
              cx={x}
              cy={y}
              r="14"
              fill="rgba(32,213,159,0.12)"
              className="animate-pulse"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
            <circle cx={x} cy={y} r="4.5" fill={index % 2 ? "#22D3EE" : "#20D59F"} />
          </g>
        ))}

        <g className="animate-[float_7s_ease-in-out_infinite]">
          <rect x="260" y="118" width="200" height="124" rx="28" fill="rgba(5,9,20,0.82)" stroke="rgba(255,255,255,0.14)" />
          <text x="360" y="160" textAnchor="middle" fill="white" fontSize="24" fontWeight="800">
            ArcPay
          </text>
          <text x="360" y="190" textAnchor="middle" fill="#94A3B8" fontSize="13">
            Stablecoin payment rail
          </text>
          <rect x="309" y="207" width="102" height="26" rx="13" fill="rgba(32,213,159,0.16)" />
          <text x="360" y="225" textAnchor="middle" fill="#20D59F" fontSize="12" fontWeight="700">
            ARC TESTNET
          </text>
        </g>
      </svg>

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -240;
          }
        }

        @keyframes dashReverse {
          to {
            stroke-dashoffset: 240;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
