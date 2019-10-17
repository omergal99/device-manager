import React, { useState, useEffect } from 'react';


import DevicesMap from './DevicesMap';
import RoutersMap from './RoutersMap';
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
    ev.stopPropagation();
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
  }, [currDevice, device]);

  var newDevice = DraggingListener(device, pointerDiff, typeToMove);
  useEffect(() => {
    setDevice(newDevice);
  }, [setDevice, newDevice]);

  return (
    <div className="main-preview">

      <div className="device-catagory flex space-even wrap">
        <span>Details</span>
        <span>Connections</span>
        <span>History</span>
      </div>

      <div className="playground">
        {device &&
          <div>
            <DevicesMap device={device} clientDown={clientDown} />
            <RoutersMap routers={device.routers} clientDown={clientDown} />
          </div>
        }
      </div>

    </div>
  );
}

export default React.memo(MainPreview)