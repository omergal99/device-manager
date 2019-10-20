import React from 'react';

import DeviceMap from './DeviceMap';

function RelatedsMap({ device, onClientDown, onCreateConnection }) {

  const relatedList = device.relatedDevices.map(related => {
    return <DeviceMap key={`${device._id}${related._id}`} device={related}
      onClientDown={onClientDown} onCreateConnection={onCreateConnection} />
  })

  return (
    <>
      {relatedList}
    </>
  );
}

export default React.memo(RelatedsMap);
