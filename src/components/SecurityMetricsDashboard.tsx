import React, { useEffect, useState } from "react";

interface Metric {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  trend: "up" | "down";
  getRandomValue: () => number;
}

const SecurityMetricsDashboard: React.FC = () => {
  const [isLive, setIsLive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const [metrics, setMetrics] = useState<Metric[]>([
    {
      id: "frustration",
      name: "User Frustration Index",
      current: 847,
      target: 800,
      unit: "%",
      trend: "up",
      getRandomValue: () => Math.floor(Math.random() * 200) + 750,
    },
    {
      id: "resets",
      name: "Password Reset Requests/Day",
      current: 1247,
      target: 1000,
      unit: "",
      trend: "up",
      getRandomValue: () => Math.floor(Math.random() * 500) + 1000,
    },
    {
      id: "productivity",
      name: "Productivity Reduction Factor",
      current: 340,
      target: 250,
      unit: "%",
      trend: "up",
      getRandomValue: () => Math.floor(Math.random() * 150) + 280,
    },
    {
      id: "timeouts",
      name: "Session Timeout Complaints",
      current: 2891,
      target: 2500,
      unit: "",
      trend: "up",
      getRandomValue: () => Math.floor(Math.random() * 1000) + 2500,
    },
    {
      id: "tickets",
      name: '"Why Can\'t I Just..." Tickets',
      current: 5623,
      target: 5000,
      unit: "",
      trend: "up",
      getRandomValue: () => Math.floor(Math.random() * 2000) + 4500,
    },
    {
      id: "sanity",
      name: "Employee Sanity Level",
      current: 23,
      target: 50,
      unit: "%",
      trend: "down",
      getRandomValue: () => Math.floor(Math.random() * 30) + 10,
    },
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isLive) {
      interval = setInterval(() => {
        setMetrics((prevMetrics) =>
          prevMetrics.map((metric) => ({
            ...metric,
            current: metric.getRandomValue(),
          }))
        );
        setLastUpdate(new Date());
      }, 2000); // Update every 2 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLive]);

  const getStatusColor = (
    current: number,
    target: number,
    trend: "up" | "down"
  ) => {
    const isGood = trend === "up" ? current >= target : current <= target;
    return isGood ? "#27ae60" : "#e74c3c";
  };

  const getStatusIcon = (
    current: number,
    target: number,
    trend: "up" | "down"
  ) => {
    const isGood = trend === "up" ? current >= target : current <= target;
    return isGood ? "🟢" : "🔴";
  };

  const getStatusText = (
    current: number,
    target: number,
    trend: "up" | "down"
  ) => {
    const isGood = trend === "up" ? current >= target : current <= target;
    const messages = {
      good: [
        "Exceeding Goals",
        "Over-performing",
        "Revolutionary Success",
        "Breaking Records",
        "Inspirational",
      ],
      bad: [
        "Needs Improvement",
        "Below Expectations",
        "Requires Attention",
        "Concerning",
        "Unacceptable",
      ],
    };
    const pool = isGood ? messages.good : messages.bad;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  return (
    <div
      style={{
        border: "2px solid #2c3e50",
        borderRadius: "12px",
        padding: "25px",
        margin: "20px 0",
        backgroundColor: "#34495e",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h4
          style={{
            color: "#ecf0f1",
            margin: 0,
            fontSize: "24px",
            fontFamily: "monospace",
          }}
        >
          📊 Dietrich's Real-Time Security Dashboard
        </h4>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div style={{ fontSize: "12px", color: "#bdc3c7" }}>
            Last Update: {lastUpdate.toLocaleTimeString()}
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            style={{
              backgroundColor: isLive ? "#e74c3c" : "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {isLive ? "⏸️ Stop Live" : "▶️ Go Live"}
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {metrics.map((metric) => (
          <div
            key={metric.id}
            style={{
              backgroundColor: "#2c3e50",
              borderRadius: "8px",
              padding: "20px",
              border: "1px solid #34495e",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                color: "#bdc3c7",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              {metric.name}
            </div>

            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#ecf0f1",
                marginBottom: "10px",
                fontFamily: "monospace",
              }}
            >
              {metric.current.toLocaleString()}
              {metric.unit}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <div style={{ fontSize: "12px", color: "#95a5a6" }}>
                Target: {metric.target.toLocaleString()}
                {metric.unit}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: getStatusColor(
                    metric.current,
                    metric.target,
                    metric.trend
                  ),
                }}
              >
                {getStatusIcon(metric.current, metric.target, metric.trend)}{" "}
                {getStatusText(metric.current, metric.target, metric.trend)}
              </div>
            </div>

            {/* Progress bar */}
            <div
              style={{
                width: "100%",
                backgroundColor: "#1a252f",
                borderRadius: "4px",
                height: "6px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${Math.min(
                    (metric.current / metric.target) * 100,
                    100
                  )}%`,
                  height: "100%",
                  backgroundColor: getStatusColor(
                    metric.current,
                    metric.target,
                    metric.trend
                  ),
                  borderRadius: "4px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "25px",
          padding: "15px",
          backgroundColor: "#2c3e50",
          borderRadius: "6px",
          fontSize: "12px",
          color: "#bdc3c7",
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        💡 Dashboard Tip: Higher frustration metrics indicate optimal security
        posture. If employees are happy, we're doing something wrong. — Dietrich
      </div>

      {isLive && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "12px",
            height: "12px",
            backgroundColor: "#e74c3c",
            borderRadius: "50%",
            animation: "pulse 1.5s infinite",
          }}
        />
      )}
    </div>
  );
};

export default SecurityMetricsDashboard;
