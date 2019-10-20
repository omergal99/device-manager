import React, { useState, useEffect } from 'react';

import DeviceMap from './DeviceMap';
import RoutersMap from './RoutersMap';
import DrawLineList from './DrawLineList';

import DraggingListener from './DraggingListener';

function MainPreview({ currDevice }) {

  const [device, setDevice] = useState(null);
  const [pointerDiff, setPointerDiff] = useState({ x: 1, y: 1 });
  const [typeToMove, setTypeToMove] = useState(null);

  // ********************************** START
  const calcPointerDiff = ({ clientX, clientY }, type) => {
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

    // var copy = {...device};
    // copy.isDraging = true;
    // setDevice(copy);
    setDevice(prevState => ({ ...prevState, isDraging: true }));

    // console.log(type)
    setTypeToMove(type);
    const touches = ev.changedTouches;
    (!touches) ? calcPointerDiff(ev, type)
      : calcPointerDiff({ clientX: touches[0].clientX, clientY: touches[0].clientY }, type);
  }

  // ***************************************************** useEffect
  useEffect(() => {
    if ((currDevice && !device) || (currDevice && device && currDevice._id !== device._id)) {
      setDevice(currDevice);
    }
  }, [device, currDevice]);

  const newDevice = DraggingListener(device, pointerDiff, typeToMove);
  useEffect(() => {
      setDevice(newDevice);
  }, [newDevice]);

  const createConnection = (originId, targetId) => {
    const isFound = device.connections
      .find(con => (con[0] === originId && con[1] === targetId) || (con[1] === originId && con[0] === targetId));
    if (!isFound) {
      let copy = { ...device };
      copy.connections.push([originId, targetId]);
      setDevice(copy);
    }
  }

  const removeConnection = (con1, con2) => {
    const idx = device.connections.findIndex(con => con[0] === con1 && con[1] === con2);
    let copy = { ...device };
    copy.connections.splice(idx, 1);
    setDevice(copy);
  }

  return (
    <div className="main-preview">

      <div className="device-catagory flex space-even wrap">
        <span>Details</span>
        <span>Connections</span>
        <span>History</span>
      </div>

      <div className="playground">
        {device && device.location &&
          <>
            <DeviceMap device={device} clientDown={clientDown} onCreateConnection={createConnection} />
            <RoutersMap deviceId={device._id} routers={device.routers} clientDown={clientDown} onCreateConnection={createConnection} />
            <DrawLineList lines={device.connections} routers={device.routers} onRemoveConnection={removeConnection}
              deviceLocationId={{ location: device.location, _id: device._id }}
            />
          </>
        }
      </div>

    </div>
  );
}

export default React.memo(MainPreview)