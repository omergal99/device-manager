import React, { useRef } from 'react';

function RoutersMap({ routers, clientDown }) {

  const line = useRef(null);
  const path = useRef(null);
  const svg = useRef(null);

  updateConnection();

  function updateConnection() {
    if (line && line.current) {
      // Top left coordinates
      // var divide = 6.5;
      var divide = 5;
      var x1 = parseFloat(routers[0].location.x) / divide;
      var y1 = parseFloat(routers[0].location.y) / divide;
      var x2 = parseFloat(routers[1].location.x) / divide;
      var y2 = parseFloat(routers[1].location.y) / divide;

      divide = 2;
      // Half widths and half heights
      var w1 = parseFloat(100) / divide;
      var h1 = parseFloat(100) / divide;
      var w2 = parseFloat(100) / divide;
      var h2 = parseFloat(100) / divide;

      // Center coordinates
      var cx1 = x1 + w1;
      var cy1 = y1 + h1;
      var cx2 = x2 + w2;
      var cy2 = y2 + h2;

      // Distance between centers
      var dx = cx2 - cx1;
      var dy = cy2 - cy1;

      var p1 = getIntersection(dx, dy, cx1, cy1, w1, h1);
      var p2 = getIntersection(-dx, -dy, cx2, cy2, w2, h2);

      var pos1 = [routers[0].location.x, routers[0].location.y];
      var pos2 = [routers[1].location.x, routers[1].location.y];
      var diff = 50;

      var maxX = Math.abs(routers[1].location.x - routers[0].location.x);
      var maxY = Math.abs(routers[1].location.y - routers[0].location.y);

      var absX = maxX + 50;
      var absY = maxY + 50;

      if ((routers[0].location.x === Math.min(routers[0].location.x, routers[1].location.x) &&
        routers[0].location.y === Math.min(routers[0].location.y, routers[1].location.y)) ||
        (routers[1].location.x === Math.min(routers[0].location.x, routers[1].location.x) &&
          routers[1].location.y === Math.min(routers[0].location.y, routers[1].location.y))) {
        // top left of bottom right
        line.current.setAttributeNS(null, 'y1', 50);
        line.current.setAttributeNS(null, 'y2', absY);
      } else {
        // top right of bottom left
        line.current.setAttributeNS(null, 'y1', absY);
        line.current.setAttributeNS(null, 'y2', 50);
      }

      line.current.setAttributeNS(null, 'x1', 50);
      line.current.setAttributeNS(null, 'x2', absX);
      // line.current.setAttributeNS(null, 'y1', 50);
      // line.current.setAttributeNS(null, 'y2', absY);

      // line.current.setAttributeNS(null, 'x1', p1[0]);
      // line.current.setAttributeNS(null, 'y1', p1[1]);
      // line.current.setAttributeNS(null, 'x2', p2[0]);
      // line.current.setAttributeNS(null, 'y2', p2[1]);

      // path.current.setAttributeNS(null, 'x1', p1[0]);
      // path.current.setAttributeNS(null, 'y1', p1[1]);
      // path.current.setAttributeNS(null, 'x2', p2[0]);
      // path.current.setAttributeNS(null, 'y2', p2[1]);
    }
  }

  function getIntersection(dx, dy, cx, cy, w, h) {
    if (Math.abs(dy / dx) < h / w) {
      // Hit vertical edge of box1
      return [cx + (dx > 0 ? w : -w), cy + dy * w / Math.abs(dx)];
    } else {
      // Hit horizontal edge of box1
      return [cx + dx * h / Math.abs(dy), cy + (dy > 0 ? h : -h)];
    }
  };

  const name = 'Router';
  const RouterList = routers.map((router, idx) => {
    return <div className="device-icon" key={router._id}
      style={{ top: `${router.location.y}px`, left: `${router.location.x}px`, zIndex: router.zIndex }}
      onMouseDown={ev => clientDown(ev, { name, idx })}
      onTouchStart={ev => clientDown(ev, { name, idx })}
    >
      <img draggable="false" src="assets/img/icons/router.png" alt={name} title={name} />
    </div>
  })

  return (
    <div>
      {RouterList}
      <svg ref={svg} style={{
        top: `${Math.min(routers[0].location.y, routers[1].location.y)}px`,
        left: `${Math.min(routers[0].location.x, routers[1].location.x)}px`,
        width: `${Math.abs(routers[1].location.x - routers[0].location.x) + 100}px`,
        height: `${Math.abs(routers[1].location.y - routers[0].location.y) + 100}px`
      }}>
        {/* <svg viewBox="0 0 100 100"> */}
        <line ref={line} id="connection" style={{
          // top: `${routers[0].location.y}px`, left: `${routers[0].location.x}px`,
          width: `${routers[1].location.x - routers[0].location.x + 100}px`,
          height: `${routers[1].location.y - routers[0].location.y + 100}px`
        }} />
        <path ref={path} style={{ d: 'M 177 118 C 91 69 91 69 5 0', transform: 'translate(0,0.5)' }}
          pointerEvents="visibleStroke" version="1.1" fill="none" stroke="#456">
        </path>
      </svg>
    </div>
  );
}

export default RoutersMap;