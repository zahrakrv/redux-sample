import React, { useState, useRef } from 'react';
import {
  Stage,
  Layer,
  Line,
  Circle,
  Rect,
  Arrow,
  Image,
  Text,
  Ellipse,
} from 'react-konva';

function PaintApp() {
  const [mode, setMode] = useState('pen');
  const [lines, setLines] = useState([]);
  const [circles, setCircles] = useState([]);
  const [rectangles, setRectangles] = useState([]);
  const [ovals, setOvals] = useState([]);
  const [currentOval, setCurrentOval] = useState(null);
  const [arrows, setArrows] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState([]);
  const [currentCircle, setCurrentCircle] = useState(null);
  const [currentRectangle, setCurrentRectangle] = useState(null);
  const [currentArrow, setCurrentArrow] = useState(null);
  const [image, setImage] = useState(null);
  const [lineSize, setLineSize] = useState(2);
  const [color, setColor] = useState('#000000');
  const imageRef = useRef(null);
  const [text, setText] = useState(null);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    const { offsetX, offsetY } = event.evt;
    setDrawing(true);

    if (mode === 'pen' || mode === 'eraser') {
      setCurrentLine([
        { x: offsetX, y: offsetY, color: mode === 'pen' ? color : '#FFFFFF' },
      ]);
    } else if (mode === 'circle') {
      setCurrentCircle({ x: offsetX, y: offsetY, radius: 0, color });
    } else if (mode === 'rectangle') {
      setCurrentRectangle({
        x: offsetX,
        y: offsetY,
        width: 0,
        height: 0,
        color,
      });
    } else if (mode === 'arrow') {
      setCurrentArrow({
        x: offsetX,
        y: offsetY,
        points: [offsetX, offsetY],
        color,
      });
    } else if (mode === 'text') {
      setTextPosition({ x: offsetX, y: offsetY });
      const content = prompt('Enter text:');
      setText(content);
    } else if (mode === 'oval') {
      setCurrentOval({ x: offsetX, y: offsetY, width: 0, height: 0, color });
    }
  };

  const handleEraseAll = () => {
    setArrows([]);
    setLines([]);
    setCircles([]);
    setRectangles([]);
    setOvals([]);
  };

  const handleMouseMove = (event) => {
    try {
      if (!drawing) return;

      const { offsetX, offsetY } = event.evt;

      if (mode === 'pen') {
        setCurrentLine((prevLine) => [
          ...prevLine,
          { x: offsetX, y: offsetY, color },
        ]);
      } else if (mode === 'circle') {
        setCurrentCircle((prevCircle) => ({
          ...prevCircle,
          radius: Math.sqrt(
            Math.pow(offsetX - prevCircle.x, 2) +
              Math.pow(offsetY - prevCircle.y, 2)
          ),
        }));
      } else if (mode === 'rectangle') {
        setCurrentRectangle((prevRectangle) => ({
          ...prevRectangle,
          width: offsetX - prevRectangle.x,
          height: offsetY - prevRectangle.y,
        }));
      } else if (mode === 'arrow') {
        setCurrentArrow((prevArrow) => ({
          ...prevArrow,
          points: [prevArrow.x, prevArrow.y, offsetX, offsetY],
        }));
      } else if (mode === 'oval') {
        setCurrentOval((prevOval) => ({
          ...prevOval,
          width: offsetX - prevOval.x,
          height: offsetY - prevOval.y,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMouseUp = () => {
    setDrawing(false);

    if (mode === 'pen') {
      setLines((prevLines) => [...prevLines, currentLine]);
      setCurrentLine([]);
    } else if (mode === 'circle') {
      setCircles((prevCircles) => [...prevCircles, currentCircle]);
      setCurrentCircle(null);
    } else if (mode === 'rectangle') {
      setRectangles((prevRectangles) => [...prevRectangles, currentRectangle]);
      setCurrentRectangle(null);
    } else if (mode === 'arrow') {
      setArrows((prevArrows) => [...prevArrows, currentArrow]);
      setCurrentArrow(null);
    } else if (mode === 'oval') {
      setOvals((prevOvals) => [...prevOvals, currentOval]);
      setCurrentOval(null);
    }
  };
  const handleShapeClick = (shapeIndex, shapeType) => {
    if (mode === 'eraser') {
      if (shapeType === 'line') {
        setLines((prevLines) =>
          prevLines.filter((_, index) => index !== shapeIndex)
        );
      } else if (shapeType === 'circle') {
        setCircles((prevCircles) =>
          prevCircles.filter((_, index) => index !== shapeIndex)
        );
      } else if (shapeType === 'rectangle') {
        setRectangles((prevRectangles) =>
          prevRectangles.filter((_, index) => index !== shapeIndex)
        );
      } else if (shapeType === 'arrow') {
        setArrows((prevArrows) =>
          prevArrows.filter((_, index) => index !== shapeIndex)
        );
      } else if (shapeType === 'oval') {
        setOvals((prevOvals) =>
          prevOvals.filter((_, index) => index !== shapeIndex)
        );
      }
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        console.log(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageLoad = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setMode('pen')}>Pen</button>
        <button onClick={() => setMode('circle')}>Circle</button>
        <button onClick={() => setMode('oval')}>Oval</button>
        <button onClick={() => setMode('rectangle')}>Rectangle</button>
        <button onClick={() => setMode('arrow')}>Arrow</button>
        <button onClick={() => setMode('text')}>Text</button>
        <button onClick={() => setMode('eraser')}>Eraser</button>
        <button onClick={handleEraseAll}>Erase All</button>
      </div>
      <div>
        <label htmlFor="size">Size:</label>
        <input
          type="number"
          id="size"
          min="1"
          max="10"
          value={lineSize}
          onChange={(e) => setLineSize(e.target.value)}
        />
      </div>
      <div>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div>
        <input type="file" accept="image/*" onChange={handleImageLoad} />
      </div>
      {image && (
        <Image
          src={image}
          alt="Background"
          style={{ display: 'none' }}
          ref={imageRef}
        />
      )}
      <Stage
        width={window.innerWidth}
        height={window.innerHeight - 100}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {currentOval && (
            <Ellipse
              x={currentOval.x}
              y={currentOval.y}
              radiusX={currentOval.width / 2}
              radiusY={currentOval.height / 2}
              fill={currentOval.color}
            />
          )}
          {ovals.map((oval, index) => (
            <Ellipse
              key={index}
              x={oval.x}
              y={oval.y}
              radiusX={oval.width / 2}
              radiusY={oval.height / 2}
              fill={oval.color}
              draggable
              onDragEnd={(e) => {
                const newOvals = [...ovals];
                newOvals[index].x = e.target.x();
                newOvals[index].y = e.target.y();
                setOvals(newOvals);
              }}
              onTransformEnd={(e) => {
                const newOvals = [...ovals];
                const node = e.target;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();

                newOvals[index].width *= scaleX;
                newOvals[index].height *= scaleY;

                node.scaleX(1);
                node.scaleY(1);

                setOvals(newOvals);
              }}
              onClick={() => handleShapeClick(index, 'oval')}
            />
          ))}
          {text && (
            <Text
              x={textPosition.x}
              y={textPosition.y}
              text={text}
              fontSize={16}
              fill={color}
              draggable
              onDragEnd={(e) =>
                setTextPosition({ x: e.target.x(), y: e.target.y() })
              }
            />
          )}
          {lines.map((line, index) => (
            <Line
              key={index}
              points={line.flatMap((point) => [point.x, point.y])}
              stroke={line[0].color}
              strokeWidth={lineSize}
              onClick={() => handleShapeClick(index, 'line')}
            />
          ))}
          {circles.map((circle, index) => (
            <Circle
              key={index}
              x={circle.x}
              y={circle.y}
              radius={circle.radius}
              stroke={circle.color}
              strokeWidth={lineSize}
              fill="transparent"
              onClick={() => handleShapeClick(index, 'circle')}
            />
          ))}
          {rectangles.map((rectangle, index) => (
            <Rect
              key={index}
              x={rectangle.x}
              y={rectangle.y}
              width={rectangle.width}
              height={rectangle.height}
              stroke={rectangle.color}
              strokeWidth={lineSize}
              fill="transparent"
              onClick={() => handleShapeClick(index, 'rectangle')}
            />
          ))}
          {arrows.map((arrow, index) => (
            <Arrow
              key={index}
              points={arrow.points}
              stroke={arrow.color}
              strokeWidth={lineSize}
              fill="transparent"
              onClick={() => handleShapeClick(index, 'arrow')}
            />
          ))}
          {currentLine.length > 0 && (
            <Line
              points={currentLine.flatMap((point) => [point.x, point.y])}
              stroke={currentLine[0].color}
              strokeWidth={lineSize}
            />
          )}
          {currentCircle && (
            <Circle
              x={currentCircle.x}
              y={currentCircle.y}
              radius={currentCircle.radius}
              stroke={currentCircle.color}
              strokeWidth={lineSize}
              fill="transparent"
            />
          )}
          {currentRectangle && (
            <Rect
              x={currentRectangle.x}
              y={currentRectangle.y}
              width={currentRectangle.width}
              height={currentRectangle.height}
              stroke={currentRectangle.color}
              strokeWidth={lineSize}
              fill="transparent"
            />
          )}
          {currentArrow && (
            <Arrow
              points={currentArrow.points}
              stroke={currentArrow.color}
              strokeWidth={lineSize}
              fill="transparent"
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}

export default PaintApp;
