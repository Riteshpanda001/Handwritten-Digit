import { useState, useCallback, useRef, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './MLPipeline.css';

import PipelineNode from './PipelineNode';
import PipelineControls from './PipelineControls';
import PipelineLegend from './PipelineLegend';
import PipelineInfoPanel from './PipelineInfoPanel';
import { INITIAL_NODES, INITIAL_EDGES } from '../../data/pipelineData';

const nodeTypes = {
  pipelineNode: PipelineNode
};

function PipelineCanvas({ modelInfo }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const reactFlowInstance = useReactFlow();
  const canvasRef = useRef(null);

  // Synchronize live modelInfo metrics if available
  useEffect(() => {
    if (modelInfo) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === 'node-4') {
            return {
              ...node,
              data: {
                ...node.data,
                fields: node.data.fields.map((f) =>
                  f.label === 'Accuracy'
                    ? { ...f, value: `${(modelInfo.test_accuracy || 99.2).toFixed(2)}%` }
                    : f
                )
              }
            };
          }
          return node;
        })
      );
    }
  }, [modelInfo, setNodes]);

  // Handle node selection & highlight connected edges
  const handleNodeClick = useCallback(
    (_, node) => {
      setSelectedNode(node);
      setEdges((eds) =>
        eds.map((edge) => {
          const isConnected = edge.source === node.id || edge.target === node.id;
          return {
            ...edge,
            animated: isConnected,
            style: {
              ...edge.style,
              stroke: isConnected ? '#22D3EE' : (edge.style?.stroke || '#1E293B'),
              strokeWidth: isConnected ? 3 : 2
            }
          };
        })
      );
    },
    [setEdges]
  );

  // Clear selection on background click
  const handlePaneClick = useCallback(() => {
    setSelectedNode(null);
    setEdges(INITIAL_EDGES);
  }, [setEdges]);

  // Canvas Control Handlers
  const handleZoomIn = () => reactFlowInstance.zoomIn();
  const handleZoomOut = () => reactFlowInstance.zoomOut();
  const handleFitView = () => reactFlowInstance.fitView({ padding: 0.2, duration: 400 });
  const handleResetView = () => {
    setNodes(INITIAL_NODES);
    setEdges(INITIAL_EDGES);
    setSelectedNode(null);
    reactFlowInstance.fitView({ padding: 0.1, duration: 400 });
  };

  const handleAutoLayout = () => {
    setNodes(INITIAL_NODES);
    setEdges(INITIAL_EDGES);
    reactFlowInstance.fitView({ padding: 0.15, duration: 500 });
  };

  const handleToggleFullscreen = () => {
    if (!canvasRef.current) return;
    if (!document.fullscreenElement) {
      canvasRef.current.requestFullscreen().catch((err) => {
        console.error('Error enabling fullscreen:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.error('Error exiting fullscreen:', err);
      });
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <div
      ref={canvasRef}
      className={`ml-pipeline-canvas-wrapper ${isFullscreen ? 'is-fullscreen' : ''}`}
    >
      {/* Canvas Top Toolbar Controls */}
      <PipelineControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFitView={handleFitView}
        onResetView={handleResetView}
        onAutoLayout={handleAutoLayout}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Main React Flow Graph Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.2}
        maxZoom={2.0}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.5}
          color="#1E293B"
          style={{ backgroundColor: '#070B14' }}
        />

        <MiniMap
          nodeStrokeColor={(n) => (n.data?.category ? '#22D3EE' : '#3B82F6')}
          nodeColor={() => '#0F172A'}
          nodeBorderRadius={8}
          maskColor="rgba(7, 11, 20, 0.75)"
          className="pipeline-minimap"
        />
      </ReactFlow>

      {/* Node Category Color Legend Overlay */}
      <PipelineLegend />

      {/* Selected Node Details Slide-Over Panel */}
      {selectedNode && (
        <PipelineInfoPanel
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          modelInfo={modelInfo}
        />
      )}
    </div>
  );
}

export default function MLPipeline({ modelInfo }) {
  return (
    <section className="ml-pipeline-section" aria-label="End-to-End ML Pipeline Visualization">
      <div className="ml-pipeline-header">
        <h2 className="ml-pipeline-title">
          End-to-End <span className="text-gradient">ML Pipeline</span>
        </h2>
        <p className="ml-pipeline-subtitle">
          Interactive visualization of the complete handwritten digit recognition workflow
        </p>
      </div>

      <ReactFlowProvider>
        <PipelineCanvas modelInfo={modelInfo} />
      </ReactFlowProvider>
    </section>
  );
}
