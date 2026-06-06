import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ArcPay - Private Stablecoin Payments on ARC Testnet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #05142b 0%, #07101f 48%, #05070d 100%)",
          position: "relative",
          overflow: "hidden",
          color: "white",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Background accents matching app theme */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 15% 20%, rgba(11, 99, 229, 0.25) 0%, transparent 45%), radial-gradient(circle at 85% 75%, rgba(249, 115, 22, 0.18) 0%, transparent 50%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 1,
            padding: "40px",
            textAlign: "center",
          }}
        >
          {/* Logo / Brand */}
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: "-4px",
              lineHeight: 1,
              background: "linear-gradient(90deg, #3b82f6 0%, #f97316 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 16,
            }}
          >
            ArcPay
          </div>

          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#e2e8f0",
              marginBottom: 12,
            }}
          >
            Private Stablecoin Payments
          </div>

          <div
            style={{
              fontSize: 22,
              color: "#94a3b8",
              marginBottom: 48,
            }}
          >
            on Arc Testnet
          </div>

          <div
            style={{
              display: "flex",
              gap: 16,
              fontSize: 18,
              color: "#64748b",
              fontWeight: 500,
            }}
          >
            <div>Deposit</div>
            <div style={{ color: "#475569" }}>•</div>
            <div>Bridge</div>
            <div style={{ color: "#475569" }}>•</div>
            <div>Pay</div>
            <div style={{ color: "#475569" }}>•</div>
            <div>Swap</div>
          </div>
        </div>

        {/* Subtle footer */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 14,
            color: "#475569",
            letterSpacing: "1px",
          }}
        >
          NON-CUSTODIAL • TESTNET
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    }
  );
}
