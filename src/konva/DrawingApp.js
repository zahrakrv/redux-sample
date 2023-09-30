import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Circle, Line, Text, Image } from 'react-konva';

function DrawingApp() {
  const [mode, setMode] = useState('brush');
  const [lines, setLines] = useState([]);
  const [rectangles, setRectangles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [squares, setSquares] = useState([]);
  const [texts, setTexts] = useState([]);
  const [image, setImage] = useState(null);
  const stageRef = useRef(null);
  const isDrawing = useRef(false);
  const textPosition = useRef(null);

  useEffect(() => {
    const img = new window.Image();
    // img.src = '/1.png';

    img.onload = () => {
      setImage(img);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (mode === 'brush' || mode === 'line') {
      isDrawing.current = true;
      setLines([
        ...lines,
        { tool: 'pen', points: [e.evt.layerX, e.evt.layerY] },
      ]);
    } else if (mode === 'rectangle' || mode === 'circle' || mode === 'square') {
      isDrawing.current = true;
      const startPoint = { x: e.evt.layerX, y: e.evt.layerY };
      const newShape = { mode, startPoint };
      switch (mode) {
        case 'rectangle':
          setRectangles([...rectangles, newShape]);
          break;
        case 'circle':
          setCircles([...circles, newShape]);
          break;
        case 'square':
          setSquares([...squares, newShape]);
          break;
        default:
          break;
      }
    } else if (mode === 'text') {
      const textX = e.evt.layerX;
      const textY = e.evt.layerY;
      const newText = prompt('Enter text:');
      if (newText) {
        setTexts([...texts, { x: textX, y: textY, content: newText }]);
      }
    } else if (mode === 'circle') {
      isDrawing.current = true;
      const startPoint = { x: e.evt.layerX, y: e.evt.layerY };
      const newCircle = { startPoint };
      setCircles([...circles, newCircle]);
    }
  };

  const handleMouseMove = (e) => {
    if (mode === 'brush' && isDrawing.current) {
      const lastLine = lines[lines.length - 1];
      const newPoints = lastLine.points.concat([e.evt.layerX, e.evt.layerY]);
      const updatedLines = [
        ...lines.slice(0, -1),
        { ...lastLine, points: newPoints },
      ];
      setLines(updatedLines);
    } else if (mode === 'rectangle' && isDrawing.current) {
      const updatedRectangles = rectangles.slice();
      const lastIndex = updatedRectangles.length - 1;
      updatedRectangles[lastIndex].width =
        e.evt.layerX - updatedRectangles[lastIndex].startPoint.x;
      updatedRectangles[lastIndex].height =
        e.evt.layerY - updatedRectangles[lastIndex].startPoint.y;
      setRectangles(updatedRectangles);
    } else if (mode === 'circle' && isDrawing.current) {
      const updatedCircles = circles.slice();
      const lastIndex = updatedCircles.length - 1;
      const radiusX = Math.abs(
        e.evt.layerX - updatedCircles[lastIndex].startPoint.x
      );
      const radiusY = Math.abs(
        e.evt.layerY - updatedCircles[lastIndex].startPoint.y
      );
      updatedCircles[lastIndex].radius = Math.max(radiusX, radiusY);
      setRectangles(updatedCircles);
    } else if (mode === 'square' && isDrawing.current) {
      const updatedSquares = squares.slice();
      const lastIndex = updatedSquares.length - 1;
      const side = Math.abs(
        e.evt.layerX - updatedSquares[lastIndex].startPoint.x
      );
      updatedSquares[lastIndex].side = side;
      setSquares(updatedSquares);
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    isDrawing.current = false;
  };

  const handleTextClick = (e) => {
    if (mode === 'text') {
      textPosition.current = { x: e.evt.layerX, y: e.evt.layerY };
      setTexts(texts);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => handleModeChange('brush')}>Draw</button>
        <button onClick={() => handleModeChange('rectangle')}>Rectangle</button>
        <button onClick={() => handleModeChange('circle')}>Circle</button>
        <button onClick={() => handleModeChange('square')}>Square</button>
        <button onClick={() => handleModeChange('line')}>Line</button>
        <button onClick={() => handleTextClick('text')}>Text</button>
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="black"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              // globalCompositeOperation={
              //   line.tool === 'eraser' ? 'destination-out' : 'source-over'
              // }
            />
          ))}
          {rectangles.map((rect, i) => (
            <Rect
              key={i}
              x={rect.startPoint.x}
              y={rect.startPoint.y}
              width={rect.width}
              height={rect.height}
              stroke="black"
              strokeWidth={5}
            />
          ))}
          {circles.map((circle, i) => (
            <Circle
              key={i}
              x={circle.startPoint.x}
              y={circle.startPoint.y}
              radius={circle.radius}
              stroke="black"
              strokeWidth={5}
            />
          ))}
          {squares.map((square, i) => (
            <Rect
              key={i}
              x={square.startPoint.x}
              y={square.startPoint.y}
              width={square.side}
              height={square.side}
              stroke="black"
              strokeWidth={5}
            />
          ))}
          {texts.map((text, i) => (
            <Text
              key={i}
              x={text.x}
              y={text.y}
              text={text.content}
              fontSize={20}
              fill="black"
            />
          ))}
          {image && (
            <Image
              image={image}
              width={window.innerWidth}
              height={window.innerHeight}
            />
          )}
          {/* <div>
            <input
              type="text"
              value={texts}
              onChange={(e) => setTexts(e.target.value)}
              placeholder="Enter text"
            />
            <button onClick={handleTextClick}>Place Text</button>
          </div> */}
        </Layer>
      </Stage>
    </div>
  );
}

export default DrawingApp;
