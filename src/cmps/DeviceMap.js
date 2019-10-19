import React, { useState } from 'react';

function DeviceMap({ device, clientDown, onCreateConnection }) {

  const name = 'Device';
  const [toggleOptions, setToggleOptions] = useState(false);

  const newConnection = () => {
    window.addEventListener('click', chackForConnection, false);
  }
  const chackForConnection = (ev) => {
    if (ev.target.getAttribute('src') !== 'assets/img/icons/make new connection.png') {
      if (ev.target.getAttribute('data-id') && ev.target.getAttribute('data-id') !== device._id) {
        onCreateConnection(device._id, ev.target.getAttribute('data-id'));
      }
      window.removeEventListener('click', chackForConnection, false);
      setToggleOptions(false);
    }
  }

  return (
    <div className="wrap-device" style={{
      top: `${device.location.y}px`, left: `${device.location.x}px`, zIndex: device.zIndex
    }}>
      <div className="device-icon"
        onMouseDown={ev => clientDown(ev, { name, idx: 0 })}
        onTouchStart={ev => clientDown(ev, { name, idx: 0 })}
      >
        <img draggable="false" src="assets/img/icons/phone.png" data-id={device._id} alt={`${device.name}`} title={`${device.name}`} />
      </div>
      <div className="title-device">
        <span title={`${device.name}`}>{device.name}</span>
      </div>
      {/* TO CHACK WHAT MORE EFECTIVE BUTTON OR DIV */}
      <button className="device-btn-options" onClick={() => setToggleOptions(!toggleOptions)}>
        <img src="assets/img/icons/mehr3.png" alt="Options" />
      </button>
      {toggleOptions &&
        <div className="device-options">
          <img src="assets/img/icons/details.png" alt="" />
          <img src="assets/img/icons/make new connection.png" alt="" onClick={newConnection} />
          <img src="assets/img/icons/history.png" alt="" />
        </div>
      }
    </div>
  );
}

export default DeviceMap;