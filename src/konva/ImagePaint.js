import { Stage, Layer, Rect, Text } from 'react-konva';
import React, { useState } from 'react';
const ImagePaint = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    setPosition({ x: e.target.x(), y: e.target.y() });
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text
          text="Draggable Text"
          x={position.x}
          y={position.y}
          draggable
          fill={isDragging ? 'green' : 'black'}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
        <Rect
          x={20}
          y={50}
          draggable
          width={100}
          height={100}
          fill="red"
          shadowBlur={5}
        />
      </Layer>
    </Stage>
  );
};
export default ImagePaint;
