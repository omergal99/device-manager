import React, { useState, useEffect } from 'react';

import DeviceMap from './visualDisplay/DeviceMap';
import RelatedsMap from './visualDisplay/RelatedsMap';
import DrawLineList from './visualDisplay/DrawLineList';
import DeviceDetails from './DeviceDetails';

import DraggingDevice from './eventListeners/DraggingDevice';

function ManageDevicePreview({ currDevice }) {

  const [device, setDevice] = useState(null);
  const [pointerDiff, setPointerDiff] = useState({ x: 1, y: 1 });
  const [capturedDeviceType, setCapturedDeviceType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Connections');

  useEffect(() => {
    if ((currDevice && !device) || (currDevice && device && currDevice._id !== device._id)) {
      setDevice(currDevice);
    }
  }, [device, currDevice]);

  const newDevice = DraggingDevice(device, pointerDiff, capturedDeviceType);
  useEffect(() => {
    setDevice(newDevice);
  }, [newDevice]);

  const calcPointerDiff = ({ clientX, clientY }, type) => {
    let temp = { x: 1, y: 1 };
    temp = (type.value === 'Own') && { x: clientX - device.location.x, y: clientY - device.location.y };
    if (type.value === 'Related') {
      const idx = device.relatedDevices.findIndex(rel => rel._id === type.id);
      temp = { x: clientX - device.relatedDevices[idx].location.x, y: clientY - device.relatedDevices[idx].location.y };
    }
    setPointerDiff(temp);
  }

  const clientDown = (ev, type) => {
    setDevice(prevState => ({ ...prevState, isDraging: true }));
    setCapturedDeviceType(type);
    const touches = ev.changedTouches;
    (!touches) ? calcPointerDiff(ev, type)
      : calcPointerDiff({ clientX: touches[0].clientX, clientY: touches[0].clientY }, type);
  }

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
    <div className="manage-device-preview">

      <div className="categories flex space-even wrap">
        <span onClick={() => setSelectedCategory('Details')}>Details</span>
        <span onClick={() => setSelectedCategory('Connections')}>Connections</span>
        <span onClick={() => setSelectedCategory('History')}>History</span>
      </div>

      {selectedCategory === 'Connections' && device && device.location &&
        <div className="visual-display">
          <DeviceMap device={device} onClientDown={clientDown} onCreateConnection={createConnection} />
          <RelatedsMap device={device} onClientDown={clientDown} onCreateConnection={createConnection} />
          <DrawLineList device={device} onRemoveConnection={removeConnection} />
        </div>
      }

      {selectedCategory === 'Details' && device &&
        <DeviceDetails device={device} />
      }
      {selectedCategory === 'History' &&
        <h2>No History Yet</h2>
      }

    </div>
  );
}

export default React.memo(ManageDevicePreview)