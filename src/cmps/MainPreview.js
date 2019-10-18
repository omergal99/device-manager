import React, { useState, useEffect } from 'react';


import DevicesMap from './DevicesMap';
import RoutersMap from './RoutersMap';
import DrawLine from './DrawLine';

import DraggingListener from './DraggingListener';

function MainPreview({ currDevice }) {

  const [device, setDevice] = useState(null);
  const [pointerDiff, setPointerDiff] = useState({ x: 1, y: 1 });
  const [typeToMove, setTypeToMove] = useState(null);

  // ********************************** START
  const calcPointerDiff = ({ clientX, clientY }, type) => {
    setDevice(prevState => ({ ...prevState, isDraging: true }));
    setTypeToMove(type);
    let temp = { x: 1, y: 1 };
    temp = (type.name === 'Device') ?
      { x: clientX - device.location.x, y: clientY - device.location.y } : temp;
    temp = (type.name === 'Router') ?
      { x: clientX - device.routers[type.idx].location.x, y: clientY - device.routers[type.idx].location.y } : temp;
    setPointerDiff(temp);
  }
  const clientDown = (ev, type) => {
    // ev.stopPropagation();
    // ev.preventDefault();
    // ev.persist()
    // console.log(ev)
    const touches = ev.changedTouches;
    (!touches) ? calcPointerDiff(ev, type)
      : calcPointerDiff({ clientX: touches[0].clientX, clientY: touches[0].clientY }, type);
  }

  // ***************************************************** useEffect
  useEffect(() => {
    if ((currDevice && !device) || (currDevice && device && currDevice._id !== device._id)) {
      setDevice(currDevice);
    }
  }, [setDevice, device, currDevice]);

  const newDevice = DraggingListener(device, pointerDiff, typeToMove);
  useEffect(() => {
    setDevice(newDevice);
  }, [setDevice, newDevice]);

  const locationById = (id) => {
    if (id.charAt(0) === 'R') {
      const router = device.routers.find(router => router._id === id);
      return router.location;
    }
    if (id.charAt(0) === 'P') {
      return device.location;
    }
  }

  const linesBetweenDevices = device && device.connections.map((connected, idx) => {
    const point1 = locationById(connected[0]);
    const point2 = locationById(connected[1]);
    return <DrawLine point1={point1} point2={point2} key={idx} />
  })

  return (
    <div className="main-preview">

      <div className="device-catagory flex space-even wrap">
        <span>Details</span>
        <span>Connections</span>
        <span>History</span>
      </div>

      <div className="playground">
        {device && device.location &&
          <div>
            <DevicesMap device={device} clientDown={clientDown} />
            <RoutersMap routers={device.routers} clientDown={clientDown} />
            {linesBetweenDevices}
          </div>
        }
      </div>

    </div>
  );
}

export default React.memo(MainPreview)