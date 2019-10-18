import React from 'react';

function DevicesMap({ device, clientDown }) {

  const name = 'Device';

  return (
    <div className="wrap-device" title={`${device.name}`} style={{
      top: `${device.location.y}px`, left: `${device.location.x}px`, zIndex: device.zIndex
    }}>
      <div className="device-icon"
        onMouseDown={ev => clientDown(ev, { name, idx: 0 })}
        onTouchStart={ev => clientDown(ev, { name, idx: 0 })}
      >
        <img draggable="false" src="assets/img/icons/phone.png" alt={`${device.name}`}  />
      </div>
      <div className="title-device">
        <span>{device.name}</span>
      </div>
    </div>
  );
}

export default DevicesMap;