import React from 'react';

function MainPreview({ device }) {

  return (
    <div className="main-preview">
      <h3>{device.name}</h3>
    </div>
  );
}

export default React.memo(MainPreview)