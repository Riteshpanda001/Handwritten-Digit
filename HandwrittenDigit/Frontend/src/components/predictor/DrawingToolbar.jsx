import './DrawingToolbar.css';
import { RotateCcw, Eraser, Edit3, Sliders } from 'lucide-react';

export default function DrawingToolbar({
  brushSize,
  setBrushSize,
  isEraser,
  setIsEraser,
  onClear
}) {
  return (
    <div className="drawing-toolbar">
      <div className="toolbar-row">
        <div className="tool-group">
          <button
            className={`tool-btn ${!isEraser ? 'active' : ''}`}
            onClick={() => setIsEraser(false)}
            title="Draw Brush"
          >
            <Edit3 size={15} /> Brush
          </button>
          <button
            className={`tool-btn ${isEraser ? 'active' : ''}`}
            onClick={() => setIsEraser(true)}
            title="Eraser Mode"
          >
            <Eraser size={15} /> Eraser
          </button>
          <button className="tool-btn" onClick={onClear} title="Clear Canvas">
            <RotateCcw size={15} /> Clear
          </button>
        </div>

        <div className="brush-size-picker">
          <Sliders size={14} />
          <span>Size: {brushSize}px</span>
          <input
            type="range"
            min="10"
            max="36"
            step="2"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="brush-slider"
          />
        </div>
      </div>
    </div>
  );
}
