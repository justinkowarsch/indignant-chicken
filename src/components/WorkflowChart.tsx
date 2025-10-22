import React, { useState, useEffect } from 'react';

interface WorkflowNode {
  id: string;
  label: string;
  type: 'start' | 'process' | 'decision' | 'end' | 'stuck' | 'loop';
  position: { x: number; y: number };
  status: 'pending' | 'failed' | 'stuck' | 'bypassed';
  description: string;
  failureReason?: string;
  processingTime?: string;
  ideasStuck?: number;
}

interface WorkflowConnection {
  from: string;
  to: string;
  label: string;
  type: 'success' | 'failure' | 'bypass';
}

const workflowNodes: WorkflowNode[] = [
  {
    id: 'start',
    label: 'Your Bright Idea',
    type: 'start',
    position: { x: 50, y: 50 },
    status: 'pending',
    description: 'Fresh optimism enters the system',
    processingTime: '0.01 seconds'
  },
  {
    id: 'enthusiasm',
    label: 'Enthusiasm Filter',
    type: 'decision',
    position: { x: 50, y: 150 },
    status: 'failed',
    description: 'Detects dangerous levels of employee excitement',
    failureReason: 'Exceeds acceptable enthusiasm threshold (>12%)',
    processingTime: '3.2 seconds',
    ideasStuck: 1247
  },
  {
    id: 'feasibility',
    label: 'Feasibility Check',
    type: 'process',
    position: { x: 50, y: 250 },
    status: 'failed',
    description: 'Evaluates if idea is too practical',
    failureReason: 'Too feasible, likely already thought of by management',
    processingTime: '47 minutes',
    ideasStuck: 892
  },
  {
    id: 'budget',
    label: 'Budget Analysis',
    type: 'decision',
    position: { x: 50, y: 350 },
    status: 'failed',
    description: 'Checks if idea threatens existing budget allocations',
    failureReason: 'Would save money, creating budget uncertainty',
    processingTime: '2.7 hours',
    ideasStuck: 2156
  },
  {
    id: 'innovation',
    label: 'Innovation Score',
    type: 'process',
    position: { x: 50, y: 450 },
    status: 'failed',
    description: 'Measures innovation against current innovation framework',
    failureReason: 'Too innovative for current innovation framework v3.2',
    processingTime: '4 days',
    ideasStuck: 673
  },
  {
    id: 'management',
    label: 'Management Review',
    type: 'decision',
    position: { x: 350, y: 200 },
    status: 'stuck',
    description: 'Waits for management availability',
    processingTime: '∞ months',
    ideasStuck: 15847
  },
  {
    id: 'committee1',
    label: 'Committee 1 of 17',
    type: 'process',
    position: { x: 350, y: 300 },
    status: 'stuck',
    description: 'First of many committee reviews',
    processingTime: '73 days average',
    ideasStuck: 234
  },
  {
    id: 'legal',
    label: 'Legal Review',
    type: 'decision',
    position: { x: 350, y: 400 },
    status: 'failed',
    description: 'Legal compliance verification',
    failureReason: 'Potential keyboard liability risk identified',
    processingTime: '6 months',
    ideasStuck: 1089
  },
  {
    id: 'security',
    label: 'IT Security Check',
    type: 'process',
    position: { x: 350, y: 500 },
    status: 'failed',
    description: 'Cybersecurity threat assessment',
    failureReason: 'Idea contains the word "change" (security risk)',
    processingTime: '8 weeks',
    ideasStuck: 445
  },
  {
    id: 'final',
    label: 'Final Approval',
    type: 'decision',
    position: { x: 650, y: 350 },
    status: 'failed',
    description: 'Ultimate decision point',
    failureReason: 'Redirects to Enthusiasm Filter (infinite loop detected)',
    processingTime: 'N/A'
  },
  {
    id: 'archive',
    label: 'Permanent Storage',
    type: 'end',
    position: { x: 650, y: 550 },
    status: 'pending',
    description: 'Where ideas go to rest eternally',
    processingTime: 'Forever'
  },
  {
    id: 'bypass',
    label: "Bob's Nephew's Idea",
    type: 'bypass',
    position: { x: 200, y: 50 },
    status: 'bypassed',
    description: 'Special fast-track process',
    processingTime: '0.3 seconds'
  },
  {
    id: 'implemented',
    label: 'Implementation',
    type: 'end',
    position: { x: 400, y: 50 },
    status: 'bypassed',
    description: 'Rare successful outcome',
    processingTime: 'Instant'
  }
];

const connections: WorkflowConnection[] = [
  { from: 'start', to: 'enthusiasm', label: 'Submit', type: 'success' },
  { from: 'enthusiasm', to: 'feasibility', label: 'FAIL', type: 'failure' },
  { from: 'feasibility', to: 'budget', label: 'FAIL', type: 'failure' },
  { from: 'budget', to: 'innovation', label: 'FAIL', type: 'failure' },
  { from: 'innovation', to: 'management', label: 'FAIL', type: 'failure' },
  { from: 'management', to: 'committee1', label: 'PENDING', type: 'failure' },
  { from: 'committee1', to: 'legal', label: 'Forward', type: 'success' },
  { from: 'legal', to: 'security', label: 'FAIL', type: 'failure' },
  { from: 'security', to: 'final', label: 'FAIL', type: 'failure' },
  { from: 'final', to: 'enthusiasm', label: 'Loop Back', type: 'failure' },
  { from: 'final', to: 'archive', label: 'Archive', type: 'failure' },
  { from: 'start', to: 'bypass', label: 'Nepotism', type: 'bypass' },
  { from: 'bypass', to: 'implemented', label: 'Fast Track', type: 'bypass' }
];

interface WorkflowChartProps {
  highlightUserPath?: boolean;
}

export default function WorkflowChart({ highlightUserPath = false }: WorkflowChartProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [userPosition, setUserPosition] = useState<string>('committee1');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const getNodeColor = (node: WorkflowNode) => {
    if (node.id === 'bypass' && showEasterEgg) return 'bg-green-300 border-green-600 shadow-green-200';
    if (node.id === userPosition && highlightUserPath) return 'bg-red-200 border-red-600 shadow-red-200 animate-pulse';

    switch (node.status) {
      case 'failed': return 'bg-red-100 border-red-500 dark:bg-red-900/20 dark:border-red-400';
      case 'stuck': return 'bg-yellow-100 border-yellow-500 dark:bg-yellow-900/20 dark:border-yellow-400';
      case 'bypassed': return 'bg-green-100 border-green-500 dark:bg-green-900/20 dark:border-green-400';
      default: return 'bg-blue-100 border-blue-500 dark:bg-blue-900/20 dark:border-blue-400';
    }
  };

  const getConnectionColor = (connection: WorkflowConnection) => {
    switch (connection.type) {
      case 'failure': return 'stroke-red-500';
      case 'bypass': return showEasterEgg ? 'stroke-green-500 stroke-2' : 'stroke-gray-300 stroke-dasharray-5';
      default: return 'stroke-blue-500';
    }
  };

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
    setClickCount(prev => prev + 1);

    if (clickCount >= 9 && nodeId === 'final') {
      setShowEasterEgg(true);
    }
  };

  const selectedNodeData = workflowNodes.find(node => node.id === selectedNode);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Bright Ideas Workflow Management System™
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Interactive Process Flow | Version 47.2.1b | {showEasterEgg ? 'Easter Egg Unlocked!' : 'Click nodes for details'}
        </p>
      </div>

      {/* Workflow Diagram */}
      <div className="relative bg-gray-50 dark:bg-gray-900 rounded-lg p-8 mb-6" style={{ height: '700px' }}>
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {connections.map((connection, index) => {
            const fromNode = workflowNodes.find(n => n.id === connection.from);
            const toNode = workflowNodes.find(n => n.id === connection.to);
            if (!fromNode || !toNode) return null;

            const fromX = (fromNode.position.x / 100) * 100 + 50;
            const fromY = (fromNode.position.y / 100) * 100 + 20;
            const toX = (toNode.position.x / 100) * 100 + 50;
            const toY = (toNode.position.y / 100) * 100 + 20;

            const midX = (fromX + toX) / 2;
            const midY = (fromY + toY) / 2;

            return (
              <g key={index}>
                <line
                  x1={fromX}
                  y1={fromY}
                  x2={toX}
                  y2={toY}
                  className={getConnectionColor(connection)}
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                <text
                  x={midX}
                  y={midY - 5}
                  className="text-xs fill-gray-600 dark:fill-gray-400"
                  textAnchor="middle"
                >
                  {connection.label}
                </text>
              </g>
            );
          })}

          {/* Arrow marker definition */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                className="fill-gray-600 dark:fill-gray-400"
              />
            </marker>
          </defs>
        </svg>

        {/* Workflow Nodes */}
        {workflowNodes.map((node) => (
          <div
            key={node.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-105 ${getNodeColor(node)} border-2 rounded-lg p-3 shadow-lg min-w-32 text-center z-10`}
            style={{
              left: `${(node.position.x / 100) * 100}px`,
              top: `${(node.position.y / 100) * 100}px`,
            }}
            onClick={() => handleNodeClick(node.id)}
          >
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {node.label}
            </div>
            {node.id === userPosition && highlightUserPath && (
              <div className="text-xs text-red-600 dark:text-red-400 font-bold mt-1">
                ← YOUR IDEA IS HERE
              </div>
            )}
            {node.ideasStuck && (
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {node.ideasStuck} ideas stuck
              </div>
            )}
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded border shadow-lg">
          <h4 className="font-semibold text-sm mb-2">Legend</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-100 border border-red-500 rounded"></div>
              <span>Failed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-100 border border-yellow-500 rounded"></div>
              <span>Stuck</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 border border-green-500 rounded"></div>
              <span>Bypassed</span>
            </div>
          </div>
          {showEasterEgg && (
            <div className="mt-2 p-2 bg-green-100 dark:bg-green-900/20 rounded text-xs">
              🎉 Secret path revealed!<br/>
              Nepotism fast-track activated
            </div>
          )}
        </div>
      </div>

      {/* Node Details Panel */}
      {selectedNodeData && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-300 dark:border-gray-600 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {selectedNodeData.label}
            </h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
            >
              ×
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{selectedNodeData.description}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Processing Time</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{selectedNodeData.processingTime}</p>
            </div>

            {selectedNodeData.failureReason && (
              <div className="md:col-span-2">
                <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Failure Reason</h4>
                <p className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded">
                  {selectedNodeData.failureReason}
                </p>
              </div>
            )}

            {selectedNodeData.ideasStuck && (
              <div className="md:col-span-2">
                <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Current Backlog</h4>
                <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                  {selectedNodeData.ideasStuck.toLocaleString()} ideas currently stuck at this stage
                </p>
              </div>
            )}
          </div>

          {selectedNodeData.id === 'final' && !showEasterEgg && (
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 italic">
              💡 Tip: Click this node 10 times to reveal a hidden feature...
            </div>
          )}
        </div>
      )}

      {/* Statistics Bar */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">23,891</div>
          <div className="text-xs text-red-700 dark:text-red-300">Ideas Rejected</div>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded text-center">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">∞</div>
          <div className="text-xs text-yellow-700 dark:text-yellow-300">Average Wait Time</div>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">47</div>
          <div className="text-xs text-blue-700 dark:text-blue-300">Process Steps</div>
        </div>
        <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {showEasterEgg ? '1' : '0'}
          </div>
          <div className="text-xs text-green-700 dark:text-green-300">Ideas Implemented</div>
        </div>
      </div>
    </div>
  );
}