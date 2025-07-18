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
    <div className="relative border-2 border-gray-700 rounded-xl p-6 my-5 bg-gray-600 text-white">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-gray-100 m-0 text-2xl font-mono">
          📊 Dietrich's Real-Time Security Dashboard
        </h4>

        <div className="flex items-center gap-4">
          <div className="text-xs text-gray-300">
            Last Update: {lastUpdate.toLocaleTimeString()}
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`text-white border-0 rounded-md px-4 py-2 cursor-pointer text-sm font-bold transition-colors duration-200 ${
              isLive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isLive ? "⏸️ Stop Live" : "▶️ Go Live"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-gray-700 rounded-lg p-5 border border-gray-600"
          >
            <div className="text-sm text-gray-300 mb-2 font-bold">
              {metric.name}
            </div>

            <div className="text-3xl font-bold text-gray-100 mb-2.5 font-mono">
              {metric.current.toLocaleString()}
              {metric.unit}
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="text-xs text-gray-400">
                Target: {metric.target.toLocaleString()}
                {metric.unit}
              </div>
              <div
                className="text-xs"
                style={{
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
            <div className="w-full bg-gray-900 rounded h-1.5 overflow-hidden">
              <div
                className="h-full rounded transition-all duration-300 ease-in-out"
                style={{
                  width: `${Math.min(
                    (metric.current / metric.target) * 100,
                    100
                  )}%`,
                  backgroundColor: getStatusColor(
                    metric.current,
                    metric.target,
                    metric.trend
                  ),
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-700 rounded-md text-xs text-gray-300 text-center italic">
        💡 Dashboard Tip: Higher frustration metrics indicate optimal security
        posture. If employees are happy, we're doing something wrong. — Dietrich
      </div>

      {isLive && (
        <div className="absolute top-2.5 right-2.5 w-3 h-3 bg-red-600 rounded-full animate-pulse" />
      )}
    </div>
  );
};

export default SecurityMetricsDashboard;
