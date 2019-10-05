import React from 'react';

function MainPreview({ device }) {

  return (
    <div className="main-preview">
      <div className="device-catagory flex space-even wrap">
        <span>Connections</span>
        <span>Method</span>
        <span>History</span>
      </div>
      <h3>{device.name ? device.name : 'Choose Device'}</h3>
    </div>
  );
}

export default React.memo(MainPreview)