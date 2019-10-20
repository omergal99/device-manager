import React, { useState } from 'react';

function RouterMap({ router, idx, clientDown, onCreateConnection }) {

  const name = 'Router';
  const [toggleOptions, setToggleOptions] = useState(false);

  const newConnection = () => {
    window.addEventListener('click', chackForConnection, false);
  }
  const chackForConnection = (ev) => {
    if (ev.target.getAttribute('src') !== 'assets/img/icons/make new connection.png') {
      if (ev.target.getAttribute('data-id') && ev.target.getAttribute('data-id') !== router._id) {
        onCreateConnection(router._id, ev.target.getAttribute('data-id'));
      }
      window.removeEventListener('click', chackForConnection, false);
      setToggleOptions(false);
    }
  }

  return (
    <div className="wrap-device"
      style={{ top: `${router.location.y}px`, left: `${router.location.x}px`, zIndex: router.zIndex }}>
      <div className="device-icon"
        onMouseDown={ev => clientDown(ev, { name, idx })}
        onTouchStart={ev => clientDown(ev, { name, idx })}
      >
        <img draggable="false" src="assets/img/icons/router.png" data-id={router._id} alt={`Router ${router._id}`} title={`Router ${router._id}`} />
      </div>
      <div className="title-device">
        <span title={`Router ${router._id}`}>Router {router._id}</span>
      </div>
      <button className="device-btn-options" onClick={() => setToggleOptions(!toggleOptions)}>
        <img src="assets/img/icons/mehr3.png" alt="Options" />
      </button>
      {toggleOptions &&
        <div className="device-options">
          <img src="assets/img/icons/details.png" alt="" />
          <img src="assets/img/icons/make new connection.png" alt="" onClick={() => newConnection(router._id)} />
          <img src="assets/img/icons/history.png" alt="" />
        </div>
      }
    </div>
  );
}

export default RouterMap;