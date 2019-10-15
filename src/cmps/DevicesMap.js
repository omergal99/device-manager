import React from 'react';

function DevicesMap({ device, clientDown }) {

  const name = 'Device';

  return (
    <div className="device-icon"
      style={{
        top: `${device.location.y}px`, left: `${device.location.x}px`,
        zIndex: device.zIndex
      }}
      onMouseDown={ev => clientDown(ev, { name, idx: 0 })}
      onTouchStart={ev => clientDown(ev, { name, idx: 0 })}
    >
      <img draggable="false" src="assets/img/icons/phone.png" alt={name} title={name} />
    </div>
  );
}

export default DevicesMap;