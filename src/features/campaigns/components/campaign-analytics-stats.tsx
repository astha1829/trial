import React from "react";
import {
  ShieldCheck,
  Users,
  Send,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";

export function CampaignAnalyticsStats() {
  const stats = [
    {
      id: "delivery-success",
      iconBg: "#DCFCE7",
      iconColor: "#22C55E",
      icon: ShieldCheck,
      title: "Delivery Success",
      customContent: true,
    },
    {
      id: "total-recipients",
      iconBg: "#F3F0FF",
      iconColor: "#6D4AFF",
      valueColor: "#FFFFFF",
      icon: Users,
      title: "Total Recipients",
      value: "3",
      footer: "Total People",
      filePath: "E:\\trial\\campaigns\\hello_world.xlsx",
    },
    {
      id: "messages-sent",
      iconBg: "#E0F2FE",
      iconColor: "#3B82F6",
      valueColor: "#00E5A8",
      icon: Send,
      title: "Messages Sent",
      value: "3",
      footer: "Total Messages",
    },
    {
      id: "delivered",
      iconBg: "#DCFCE7",
      iconColor: "#22C55E",
      valueColor: "#22C55E",
      icon: CheckCircle,
      title: "Delivered",
      value: "3",
      footer: "Successfully Delivered",
    },
    {
      id: "failed-deliveries",
      iconBg: "#FEF2F2",
      iconColor: "#FB7185",
      valueColor: "#FB7185",
      icon: AlertTriangle,
      title: "Failed Deliveries",
      value: "0",
      footer: "Delivery Failed",
    },
    {
      id: "pending-transit",
      iconBg: "#FFF7ED",
      iconColor: "#F59E0B",
      valueColor: "#FACC15",
      icon: Clock,
      title: "Pending / Transit",
      value: "0",
      footer: "Pending Delivery",
    },
  ];

  return (
    <div
      className="w-full font-sans"
      style={{
        fontFamily: "'Inter', sans-serif",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
      }}
    >
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={stat.id}
            className="group relative flex flex-col transition-transform duration-300 hover:-translate-y-[2px]"
            style={{
              backgroundColor: "#111827",
              border: "1px solid #1E293B",
              borderRadius: "20px",
              padding: "24px",
              minHeight: "190px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {/* Top Area */}
            <div className="flex items-center gap-[16px]">
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  backgroundColor: stat.iconBg,
                }}
              >
                <IconComponent
                  size={24}
                  style={{ color: stat.iconColor }}
                  strokeWidth={2}
                />
              </div>
              <h3
                className="m-0"
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                  color: "#94A3B8",
                  textTransform: "uppercase",
                }}
              >
                {stat.title}
              </h3>
            </div>

            {/* Custom Content for Card 1 */}
            {stat.customContent ? (
              <div className="flex flex-col flex-1 justify-end">
                <div style={{ marginTop: "20px" }}>
                  <div
                    className="relative flex items-center justify-center"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        fill="none"
                        stroke="#1E293B"
                        strokeWidth="8"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        fill="none"
                        stroke="#22C55E"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="226.19"
                        strokeDashoffset="0"
                      />
                    </svg>
                    <span
                      className="relative z-10"
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#FFFFFF",
                      }}
                    >
                      100%
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#94A3B8",
                      marginTop: "14px",
                    }}
                  >
                    3 of 3 Delivered
                  </div>
                </div>
              </div>
            ) : (
              /* Content for other cards */
              <div className="flex flex-col flex-1 justify-end">
                <div
                  style={{
                    fontSize: "56px",
                    fontWeight: 800,
                    lineHeight: 1,
                    marginTop: "20px",
                    color: stat.valueColor,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#94A3B8",
                    marginTop: "14px",
                  }}
                >
                  {stat.footer}
                </div>
              </div>
            )}

            {/* File Path Display */}
            {stat.filePath && (
              <div
                title={stat.filePath}
                style={{
                  fontFamily: "monospace",
                  fontSize: "12px",
                  color: "#94A3B8",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginTop: "8px",
                }}
              >
                {stat.filePath}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
