import React from 'react';

function RoutersMap({ routers, MouseDown, Touchstart }) {

  const name = 'Router';

  const RouterList = routers.map((router, idx) => {
    return <div className="device-icon" key={router._id}
      style={{ top: `${router.location.y}px`, left: `${router.location.x}px`, zIndex: router.zIndex }}
      onMouseDown={ev => MouseDown(ev, { name, idx })}
      onTouchStart={ev => Touchstart(ev, { name, idx })}
    >
      <img draggable="false" src="assets/img/icons/router.png" alt={name} title={name} />
    </div>
  })
  return (
    <div>
      {RouterList}
    </div>
  );
}

export default RoutersMap;