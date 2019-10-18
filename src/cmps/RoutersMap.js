import React from 'react';

function RoutersMap({ routers, clientDown }) {

  const name = 'Router';
  const RouterList = routers.map((router, idx) => {
    return <div className="wrap-device" key={router._id} title={`Router ${router._id}`}
      style={{ top: `${router.location.y}px`, left: `${router.location.x}px`, zIndex: router.zIndex }}>
      <div className="device-icon"
        onMouseDown={ev => clientDown(ev, { name, idx })}
        onTouchStart={ev => clientDown(ev, { name, idx })}
      >
        <img draggable="false" src="assets/img/icons/router.png" alt={`Router ${router._id}`} />
      </div>
      <div className="title-device">
        <span>Router {router._id}</span>
      </div>
    </div>
  })

  return (
    <div>
      {RouterList}
    </div>
  );
}

export default RoutersMap;