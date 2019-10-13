import React from 'react';

function DevicesMap({ device, MouseDown }) {
  return (
    <div className="playground">
      <h3>{device.name ? device.name : 'Choose Device'}</h3>
      <div className="device-icon"
        style={{
          top: `${device.location.y}px`, left: `${device.location.x}px`,
          zIndex: device.zIndex
        }}
        onMouseDown={MouseDown}
        onTouchStart={MouseDown}
      >
        <img src="assets/img/icons/phone.png" alt="Device" />
      </div>
    </div>
  );
}

export default DevicesMap;