import React, { useState, useEffect, useRef } from 'react';

function DrawLine({ point1, point2, onRemoveConnection }) {

  const line = useRef(null);
  const [boxSize] = useState(100);
  const [optionsSize] = useState(40);
  const [toggleOptions, setToggleOptions] = useState(false);

  const minX = Math.min(point1.x, point2.x);
  const minY = Math.min(point1.y, point2.y);
  const absX = Math.abs(point1.x - point2.x);
  const absY = Math.abs(point1.y - point2.y);

  useEffect(() => {
    updateConnection();
  });

  const updateConnection = () => {
    const halfBoxSize = boxSize / 2;

    const destX = absX + halfBoxSize;
    const destY = absY + halfBoxSize;

    if ((point1.x === minX && point1.y === minY) ||
      (point2.x === minX && point2.y === minY)) {
      // TOP LEFT & BOTTOM RIGHT
      line.current.setAttributeNS(null, 'y1', halfBoxSize);
      line.current.setAttributeNS(null, 'y2', destY);
    } else {
      // TOP RIGHT of BOTTOM RIGHT
      line.current.setAttributeNS(null, 'y1', destY);
      line.current.setAttributeNS(null, 'y2', halfBoxSize);
    }
    line.current.setAttributeNS(null, 'x1', halfBoxSize);
    line.current.setAttributeNS(null, 'x2', destX);
  }

  const styles = {
    svg: {
      top: `${minY}px`,
      left: `${minX}px`,
      height: `${absY + boxSize}px`,
      width: `${absX + boxSize}px`
    },
    options: {
      height: `${optionsSize}px`,
      top: `${(absY + boxSize) / 2 + minY - (optionsSize / 2)}px`,
      left: `${(absX + boxSize) / 2 + minX - (optionsSize / 2)}px`
    }
  }

  return (
    <>
      <div className="svg-btn-options" style={styles.options} >
        <img className="btn" src="assets/img/icons/menu4.png" alt="Options"
          onClick={() => setToggleOptions(!toggleOptions)} />
        {toggleOptions &&
          <img className="options" src="assets/img/icons/remove.png" alt="Remove"
            onClick={onRemoveConnection} />
        }
      </div>
      <svg style={styles.svg} className="svg-line">
        <line ref={line} />
        {/* <path ref={path} style={{ d: 'M 177 118 C 91 69 91 69 5 0', transform: 'translate(0,0.5)' }}
        pointerEvents="visibleStroke" version="1.1" fill="none" stroke="#456">
      </path> */}
      </svg>
    </>
  );
}

export default React.memo(DrawLine);
