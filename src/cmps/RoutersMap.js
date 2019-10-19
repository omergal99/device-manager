import React from 'react';

import RouterMap from './RouterMap';

function RoutersMap({ routers, clientDown, onCreateConnection }) {

  const RouterList = routers.map((router, idx) => {
    return <RouterMap key={router._id} router={router} idx={idx} clientDown={clientDown} onCreateConnection={onCreateConnection}/>
  })

  return (
    <>
      {RouterList}
    </>
  );
}

export default RoutersMap;