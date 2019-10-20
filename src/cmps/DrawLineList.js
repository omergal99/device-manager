import React from 'react';

import DrawLine from './DrawLine';

function DrawLineList({ lines, onRemoveConnection, deviceLocationId, routers }) {

  const locationById = (id) => {
    if (id.charAt(0) === 'R') {
      const router = routers.find(router => router._id === id);
      return router.location;
    }
    if (id.charAt(0) === 'P') {
      return deviceLocationId.location;
    }
  }

  const linesBetweenDevices = lines.map((lineIds) => {
    const point1 = locationById(lineIds[0]);
    const point2 = locationById(lineIds[1]);
    return <DrawLine point1={point1} point2={point2}
      onRemoveConnection={() => onRemoveConnection(lineIds[0], lineIds[1])} key={`${deviceLocationId._id}${lineIds[0]}${lineIds[1]}`} />
  })

  return (
    <>
      {linesBetweenDevices}
    </>
  );
}

export default DrawLineList;