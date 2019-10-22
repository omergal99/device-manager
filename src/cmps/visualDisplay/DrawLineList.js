import React from 'react';

import DrawLine from './DrawLine';

function DrawLineList({ device, onRemoveConnection }) {

  const locationById = id => {
    if (id.charAt(0) === 'P' || id.charAt(0) === 'C') {
      return device.location;
    } else {
      const related = device.relatedDevices.find(rel => rel._id === id);
      return related.location;
    }
  }

  const linesBetweenDevices = device.connections.map((lineIds) => {
    const point1 = locationById(lineIds[0]);
    const point2 = locationById(lineIds[1]);
    return <DrawLine point1={point1} point2={point2} key={`${device._id}${lineIds[0]}${lineIds[1]}`}
      onRemoveConnection={() => onRemoveConnection(lineIds[0], lineIds[1])} />
  })

  return (
    <>
      {linesBetweenDevices}
    </>
  );
}

export default React.memo(DrawLineList);
