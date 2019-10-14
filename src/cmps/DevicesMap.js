import React from 'react';

function DevicesMap({ device, MouseDown, Touchstart }) {
  return (
    <div className="device-icon"
      style={{
        top: `${device.location.y}px`, left: `${device.location.x}px`,
        zIndex: device.zIndex
      }}
      onMouseDown={ev => MouseDown(ev, { name: 'Device', idx: 0 })}
      onTouchStart={ev => Touchstart(ev, { name: 'Device', idx: 0 })}
    >
      <img draggable="false" src="assets/img/icons/phone.png" alt="Device" title="Device" />
    </div>
  );
}

export default DevicesMap;