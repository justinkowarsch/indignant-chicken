import React, { useState, useEffect } from 'react';

interface StatItem {
  id: string;
  label: string;
  value: number | string;
  trend?: 'up' | 'down' | 'flat';
  unit?: string;
  isFlickering?: boolean;
  flickerValues?: Array<number | string>;
  color: 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'gray';
  description?: string;
}

const statisticsData: StatItem[] = [
  {
    id: 'submitted',
    label: 'Ideas Submitted Today',
    value: 47,
    trend: 'up',
    color: 'blue',
    description: 'Fresh optimism entering the system'
  },
  {
    id: 'reviewing',
    label: 'Ideas Under Review',
    value: 3749,
    trend: 'up',
    color: 'yellow',
    description: 'Currently trapped in the bureaucratic maze'
  },
  {
    id: 'implemented',
    label: 'Ideas Successfully Implemented',
    value: 0,
    isFlickering: true,
    flickerValues: [0, 1, 0, 1, 0],
    color: 'green',
    description: 'The holy grail of corporate innovation'
  },
  {
    id: 'response',
    label: 'Average Response Time',
    value: '6-∞ months',
    trend: 'up',
    color: 'red',
    description: 'Time until you hear something back'
  },
  {
    id: 'satisfaction',
    label: 'Employee Satisfaction',
    value: 147,
    unit: '%',
    trend: 'up',
    color: 'green',
    description: 'Clearly accurate and not manipulated'
  },
  {
    id: 'committees',
    label: 'Active Review Committees',
    value: 73,
    trend: 'up',
    color: 'purple',
    description: 'More committees = better processes, obviously'
  },
  {
    id: 'policies',
    label: 'Governing Policies',
    value: 847,
    trend: 'up',
    color: 'gray',
    description: 'Each idea must comply with ALL of these'
  },
  {
    id: 'efficiency',
    label: 'Process Efficiency Score',
    value: '∞',
    color: 'blue',
    description: 'Mathematically perfect (according to consultants)'
  }
];

const testimonials = [
  '"I submitted 62 ideas! Still waiting to hear back!" - Jennifer, 2019',
  '"They said my idea was \'interesting\'!" - Dave, Accounting',
  '"The form only crashed twice this time!" - Anonymous',
  '"I got a response!" - [REDACTED], Former Employee',
  '"Best idea management system ever!" - CEO (mandatory testimonial)',
  '"I love how thorough the process is!" - Bob\'s Nephew (idea implemented)',
  '"The 47-page rejection letter was very detailed!" - Sarah, Engineering'
];

interface FakeStatisticsProps {
  showTestimonials?: boolean;
}

export default function FakeStatistics({ showTestimonials = true }: FakeStatisticsProps) {
  const [stats, setStats] = useState<StatItem[]>(statisticsData);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats =>
        prevStats.map(stat => {
          if (stat.isFlickering && stat.flickerValues) {
            const currentIndex = stat.flickerValues.indexOf(stat.value);
            const nextIndex = (currentIndex + 1) % stat.flickerValues.length;
            return { ...stat, value: stat.flickerValues[nextIndex] };
          }

          // Randomly increment some values
          if (Math.random() < 0.3) {
            switch (stat.id) {
              case 'submitted':
                return { ...stat, value: Math.floor(Math.random() * 10) + 45 };
              case 'reviewing':
                return { ...stat, value: (stat.value as number) + Math.floor(Math.random() * 3) };
              case 'committees':
                return { ...stat, value: Math.floor(Math.random() * 20) + 70 };
              case 'satisfaction':
                return { ...stat, value: Math.floor(Math.random() * 30) + 130 };
              default:
                return stat;
            }
          }
          return stat;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showTestimonials) {
      const testimonialInterval = setInterval(() => {
        setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
      }, 4000);

      return () => clearInterval(testimonialInterval);
    }
  }, [showTestimonials]);

  const getColorClasses = (color: string) => {
    const colorMap = {
      red: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-300 dark:border-red-600',
      green: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-300 dark:border-green-600',
      blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600',
      yellow: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-600',
      purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-600',
      gray: 'bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return <span className="text-green-500">↗️</span>;
      case 'down': return <span className="text-red-500">↘️</span>;
      case 'flat': return <span className="text-gray-500">→</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Statistics Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-300 dark:border-gray-600">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Live Innovation Metrics Dashboard™
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Real-time tracking of your workplace innovation ecosystem
          </p>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Last Updated: {new Date().toLocaleTimeString()} | Auto-refresh: ON
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${getColorClasses(stat.color)} ${
                stat.isFlickering ? 'animate-pulse' : ''
              }`}
            >
              <div className="text-center">
                <div className="text-2xl font-bold flex items-center justify-center space-x-1">
                  <span>
                    {stat.value}
                    {stat.unit}
                  </span>
                  {getTrendIcon(stat.trend)}
                </div>
                <div className="text-sm font-medium mt-1">{stat.label}</div>
                {stat.description && (
                  <div className="text-xs opacity-75 mt-2">{stat.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Special Callout for Implemented Ideas */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 border border-green-300 dark:border-green-600 rounded-lg p-4 mb-4">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              🎉 Success Story Spotlight
            </div>
            <div className="text-lg font-bold text-green-700 dark:text-green-300">
              Implemented Idea Archive
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <strong>2003:</strong> "Adding a second microwave to the break room"
              <br />
              <em>Status: Successfully implemented after 18-month review process</em>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              *This remains our most recent successful implementation
            </div>
          </div>
        </div>

        {/* Process Health Indicators */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/10 rounded border border-red-200 dark:border-red-700">
            <div className="text-red-600 dark:text-red-400 font-bold">🔴</div>
            <div className="text-xs text-red-700 dark:text-red-300">System Status</div>
            <div className="text-xs text-red-600 dark:text-red-400">Functioning as Designed</div>
          </div>

          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded border border-yellow-200 dark:border-yellow-700">
            <div className="text-yellow-600 dark:text-yellow-400 font-bold">⚠️</div>
            <div className="text-xs text-yellow-700 dark:text-yellow-300">Innovation Backlog</div>
            <div className="text-xs text-yellow-600 dark:text-yellow-400">Within Normal Parameters</div>
          </div>

          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/10 rounded border border-blue-200 dark:border-blue-700">
            <div className="text-blue-600 dark:text-blue-400 font-bold">ℹ️</div>
            <div className="text-xs text-blue-700 dark:text-blue-300">Process Efficiency</div>
            <div className="text-xs text-blue-600 dark:text-blue-400">Exceeding Expectations</div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      {showTestimonials && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-lg p-6 border border-blue-300 dark:border-blue-600">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-4">
            Employee Testimonials
          </h3>
          <div className="text-center">
            <div className="min-h-16 flex items-center justify-center">
              <blockquote className="text-gray-700 dark:text-gray-300 italic text-sm transition-opacity duration-500">
                {testimonials[currentTestimonial]}
              </blockquote>
            </div>
            <div className="flex justify-center space-x-1 mt-3">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial
                      ? 'bg-blue-600 dark:bg-blue-400'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="text-center mt-4">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              * Testimonials are real and definitely not fabricated for marketing purposes
            </div>
          </div>
        </div>
      )}

      {/* Fine Print */}
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center space-y-1">
        <div>† Statistics generated by proprietary Corporate Excellence Analytics™ platform</div>
        <div>‡ All metrics are preliminary and subject to retroactive adjustment</div>
        <div>§ Individual results may vary. Past performance does not guarantee future non-performance.</div>
      </div>
    </div>
  );
}