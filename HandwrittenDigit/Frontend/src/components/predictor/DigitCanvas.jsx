import { useRef, useEffect, useState } from 'react';
import './DigitCanvas.css';
import { Edit2 } from 'lucide-react';

export default function DigitCanvas({
  brushSize = 22,
  isEraser = false,
  onCanvasChange,
  canvasRef: externalRef
}) {
  const localRef = useRef(null);
  const canvasRef = externalRef || localRef;
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasStrokes, setHasStrokes] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [canvasRef]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches && e.touches[0]) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    setHasStrokes(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = isEraser ? '#000000' : '#FFFFFF';

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.lineWidth = brushSize;
    ctx.strokeStyle = isEraser ? '#000000' : '#FFFFFF';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      if (onCanvasChange) {
        onCanvasChange();
      }
    }
  };

  return (
    <div className="digit-canvas-container">
      <div
        className={`canvas-wrapper ${isDrawing ? 'is-drawing' : ''} ${
          hasStrokes ? 'has-strokes' : ''
        }`}
      >
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          className="digit-canvas-element"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {!hasStrokes && (
          <div className="canvas-overlay-hint">
            <Edit2 size={16} /> Draw a digit (0-9) here
          </div>
        )}
      </div>
    </div>
  );
}
