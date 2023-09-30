import React, { useRef, useEffect, useState } from 'react';

const PaintApp = () => {
  const canvasRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);
  const [size, setSize] = useState(5);
  const [color, setColor] = useState('#000000');
  const [circle, setCircle] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    // Set the line cap property for the canvas

    // Attach event listeners to the canvas element
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', finishDrawing);

    // Cleanup the event listeners when component unmounts
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', finishDrawing);
    };
  }, []);

  const startDrawing = (e) => {
    setIsPainting(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setCircle({
      x: offsetX,
      y: offsetY,
      radius: 0,
    });
    // Start drawing the circle at the current mouse position
  };

  const draw = (e) => {
    if (!isPainting) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const radius = Math.sqrt(
      Math.pow(offsetX - circle.x, 2) + Math.pow(offsetY - circle.y, 2)
    );
    setCircle((prevCircle) => ({
      ...prevCircle,
      radius: radius,
    }));
    // Update the radius of the circle based on the distance from the initial mouse position
  };

  const finishDrawing = () => {
    setIsPainting(false);
    setCircle(null);
    // Finish drawing the circle and reset the circle state
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid #000000' }}
      />
      <div>
        <input
          type="number"
          min={1}
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      {circle && (
        <div>
          Position: {circle.x}, {circle.y} | Radius: {Math.round(circle.radius)}
        </div>
      )}
    </div>
  );
};

export default PaintApp;
