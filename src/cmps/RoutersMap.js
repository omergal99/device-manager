import React from 'react';

import RouterMap from './RouterMap';

function RoutersMap({ routers, clientDown, onCreateConnection, deviceId }) {

  const RouterList = routers.map((router, idx) => {
    return <RouterMap key={`${deviceId}${router._id}`} router={router} idx={idx} clientDown={clientDown}
      onCreateConnection={onCreateConnection} />
  })

  return (
    <>
      {RouterList}
    </>
  );
}

export default RoutersMap;