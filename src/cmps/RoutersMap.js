import React, { useState, useEffect, useRef } from 'react';

function RoutersMap({ routers, clientDown }) {

  const line = useRef(null);
  const path = useRef(null);
  const svg = useRef(null);
  const [boxSize, setBoxSize] = useState(100);

  useEffect(() => {
    updateConnection();
  });

  const updateConnection = () => {
    const halfBoxSize = boxSize / 2;

    var maxX = Math.abs(routers[1].location.x - routers[0].location.x);
    var maxY = Math.abs(routers[1].location.y - routers[0].location.y);

    var absX = maxX + halfBoxSize;
    var absY = maxY + halfBoxSize;

    if ((routers[0].location.x === Math.min(routers[0].location.x, routers[1].location.x) &&
      routers[0].location.y === Math.min(routers[0].location.y, routers[1].location.y)) ||
      (routers[1].location.x === Math.min(routers[0].location.x, routers[1].location.x) &&
        routers[1].location.y === Math.min(routers[0].location.y, routers[1].location.y))) {
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

  const name = 'Router';
  const RouterList = routers.map((router, idx) => {
    return <div className="wrap-device" key={router._id}
      style={{ top: `${router.location.y}px`, left: `${router.location.x}px`, zIndex: router.zIndex }}>
      <div className="device-icon"
        onMouseDown={ev => clientDown(ev, { name, idx })}
        onTouchStart={ev => clientDown(ev, { name, idx })}
      >
        <img draggable="false" src="assets/img/icons/router.png" alt={name} title={name} />
      </div>
      <span>Router {router._id}</span>
    </div>
  })

  return (
    <div>
      {RouterList}
      <svg ref={svg} style={{
        top: `${Math.min(routers[0].location.y, routers[1].location.y)}px`,
        left: `${Math.min(routers[0].location.x, routers[1].location.x)}px`,
        width: `${Math.abs(routers[1].location.x - routers[0].location.x) + boxSize}px`,
        height: `${Math.abs(routers[1].location.y - routers[0].location.y) + boxSize}px`
      }}>
        <line ref={line} id="connection" style={{
          width: `${routers[1].location.x - routers[0].location.x + boxSize}px`,
          height: `${routers[1].location.y - routers[0].location.y + boxSize}px`
        }} />
        <path ref={path} style={{ d: 'M 177 118 C 91 69 91 69 5 0', transform: 'translate(0,0.5)' }}
          pointerEvents="visibleStroke" version="1.1" fill="none" stroke="#456">
        </path>
      </svg>
    </div>
  );
}

export default RoutersMap;