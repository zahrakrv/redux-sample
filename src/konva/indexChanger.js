import React, { useEffect, useState } from 'react';
import Konva from 'konva';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Circle } from 'react-konva';

const ZindexChanger = () => {
  const generateItems = () => {
    const items = [];
    for (let i = 0; i < 10; i++) {
      items.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        id: 'node-' + i,
        color: Konva.Util.getRandomColor(),
      });
    }
    return items;
  };

  const [items, setItems] = useState(generateItems());

  const handleDragStart = (e) => {
    const id = e.target.name();
    const updatedItems = items.slice();
    const item = updatedItems.find((i) => i.id === id);
    const index = updatedItems.indexOf(item);
    // remove from the list:
    updatedItems.splice(index, 1);
    // add to the top
    updatedItems.push(item);
    setItems(updatedItems);
  };

  const handleDragEnd = (e) => {
    const id = e.target.name();
    const updatedItems = items.slice();
    const item = updatedItems.find((i) => i.id === id);
    const index = updatedItems.indexOf(item);
    // update item position
    updatedItems[index] = {
      ...item,
      x: e.target.x(),
      y: e.target.y(),
    };
    setItems(updatedItems);
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {items.map((item) => (
          <Circle
            key={item.id}
            name={item.id}
            draggable
            x={item.x}
            y={item.y}
            fill={item.color}
            radius={50}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default ZindexChanger;
