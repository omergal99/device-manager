import React, { useState, useEffect, useRef } from 'react';

function DrawLine({point1, point2}) {

  const line = useRef(null);
  const path = useRef(null);
  const svg = useRef(null);
  const [boxSize] = useState(100);

  useEffect(() => {
    updateConnection();
  });

  const updateConnection = () => {
    const halfBoxSize = boxSize / 2;

    var maxX = Math.abs(point2.x - point1.x);
    var maxY = Math.abs(point2.y - point1.y);

    var absX = maxX + halfBoxSize;
    var absY = maxY + halfBoxSize;

    if ((point1.x === Math.min(point1.x, point2.x) &&
      point1.y === Math.min(point1.y, point2.y)) ||
      (point2.x === Math.min(point1.x, point2.x) &&
        point2.y === Math.min(point1.y, point2.y))) {
      // TOP LEFT & BOTTOM RIGHT
      line.current.setAttributeNS(null, 'y1', halfBoxSize);
      line.current.setAttributeNS(null, 'y2', absY);
    } else {
      // TOP RIGHT of BOTTOM RIGHT
      line.current.setAttributeNS(null, 'y1', absY);
      line.current.setAttributeNS(null, 'y2', halfBoxSize);
    }
    line.current.setAttributeNS(null, 'x1', halfBoxSize);
    line.current.setAttributeNS(null, 'x2', absX);
  }

  return (
    <svg ref={svg} style={{
      top: `${Math.min(point1.y, point2.y)}px`,
      left: `${Math.min(point1.x, point2.x)}px`,
      width: `${Math.abs(point2.x - point1.x) + boxSize}px`,
      height: `${Math.abs(point2.y - point1.y) + boxSize}px`
    }}>
      <line ref={line} className="line-connection" style={{
        width: `${point2.x - point1.x + boxSize}px`,
        height: `${point2.y - point1.y + boxSize}px`
      }} />
      <path ref={path} style={{ d: 'M 177 118 C 91 69 91 69 5 0', transform: 'translate(0,0.5)' }}
        pointerEvents="visibleStroke" version="1.1" fill="none" stroke="#456">
      </path>
    </svg>
  );
}

export default DrawLine;