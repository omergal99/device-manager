import React, { useState, useEffect } from 'react';
import useRouteProps from "../useRouteProps";

import DeviceMap from './visualDisplay/DeviceMap';
import RelatedsMap from './visualDisplay/RelatedsMap';
import DrawLineList from './visualDisplay/DrawLineList';
import DeviceDetails from './DeviceDetails';
import DeviceHistory from './DeviceHistory';

import DraggingDevice from './eventListeners/DraggingDevice';

function ManageDevicePreview({ currDevice }) {

  const [match, location, history] = useRouteProps();
  const [device, setDevice] = useState(null);
  const [pointerDiff, setPointerDiff] = useState({ x: 1, y: 1 });
  const [capturedDeviceType, setCapturedDeviceType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('connections');

  useEffect(() => {
    const initUrlParams = `/manageDevice/connections`;
    (history.location.pathname !== initUrlParams) && history.push(initUrlParams);
    console.log(match);
    console.log(location);
    console.log(history);
    // const id = this.props.match.params.id;
  }, [match, location, history]);

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

  const onCatagoryClicked = (category) => {
    const newUrl = `/manageDevice/${category}`;
    (history.location.pathname !== newUrl) && history.push(newUrl);
    setSelectedCategory(category);
  }

  const categories = ['details', 'connections', 'history'].map(category => {
    return <span key={category} className={`category ${device && selectedCategory === category && 'selected'}`}
      onClick={() => onCatagoryClicked(category)}>{category}</span>
  })

  return (
    <div className="manage-device-preview">
      <div className="categories flex space-even wrap">
        {categories}
      </div>
      {selectedCategory === 'connections' && device &&
        <div className="visual-display">
          <DeviceMap device={device} onClientDown={clientDown} onCreateConnection={createConnection} />
          <RelatedsMap device={device} onClientDown={clientDown} onCreateConnection={createConnection} />
          <DrawLineList device={device} onRemoveConnection={removeConnection} />
        </div>
      }
      {selectedCategory === 'details' && device &&
        <DeviceDetails device={device} />
      }
      {selectedCategory === 'history' && device &&
        <DeviceHistory device={device} />
      }
    </div>
  );
}

export default React.memo(ManageDevicePreview)