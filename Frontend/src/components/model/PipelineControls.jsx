import React from 'react';
import { ZoomIn, ZoomOut, Maximize2, RotateCcw, LayoutGrid, Minimize2 } from 'lucide-react';

export default function PipelineControls({
  onZoomIn,
  onZoomOut,
  onFitView,
  onResetView,
  onAutoLayout,
  isFullscreen,
  onToggleFullscreen
}) {
  return (
    <div className="pipeline-controls-toolbar" aria-label="Pipeline Editor Controls">
      <button
        className="ctrl-btn"
        onClick={onZoomOut}
        title="Zoom Out (−)"
        aria-label="Zoom Out"
      >
        <ZoomOut size={16} />
      </button>

      <button
        className="ctrl-btn"
        onClick={onZoomIn}
        title="Zoom In (+)"
        aria-label="Zoom In"
      >
        <ZoomIn size={16} />
      </button>

      <div className="ctrl-divider" />

      <button
        className="ctrl-btn"
        onClick={onFitView}
        title="Fit to Canvas Screen"
        aria-label="Fit View"
      >
        <Maximize2 size={16} />
        <span className="ctrl-btn-label">Fit</span>
      </button>

      <button
        className="ctrl-btn"
        onClick={onResetView}
        title="Reset Layout & Zoom"
        aria-label="Reset View"
      >
        <RotateCcw size={16} />
        <span className="ctrl-btn-label">Reset</span>
      </button>

      <button
        className="ctrl-btn btn-highlight"
        onClick={onAutoLayout}
        title="Auto Arrange Pipeline Nodes"
        aria-label="Auto Layout"
      >
        <LayoutGrid size={16} />
        <span className="ctrl-btn-label">Auto Layout</span>
      </button>

      <div className="ctrl-divider" />

      <button
        className="ctrl-btn"
        onClick={onToggleFullscreen}
        title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        aria-label="Toggle Fullscreen"
      >
        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        <span className="ctrl-btn-label">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
      </button>
    </div>
  );
}
