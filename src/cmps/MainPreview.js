import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import actions from '../store/actions';

import DevicesMap from './DevicesMap';
import RoutersMap from './RoutersMap';

function MainPreview({ currDevice }) {

  const dispatch = useDispatch();
  const [pointerDiff, setPointerDiff] = useState({ x: 1, y: 1 });
  const [update, setToUpdate] = useState('');
  const [device, setDevice] = useState(null);
  const [typeToMove, setTypeToMove] = useState(null);

  // ********************************** START

  const calcForPointerDiff = ({ clientX, clientY }, type) => {
    if (type.name === 'Device') {
      const temp = { x: clientX - device.location.x, y: clientY - device.location.y }
      setPointerDiff(temp);
    }
    if (type.name === 'Router') {
      const temp = { x: clientX - device.routers[type.idx].location.x, y: clientY - device.routers[type.idx].location.y }
      setPointerDiff(temp);
    }
  }

  const mouseDown = ({ clientX, clientY }, type) => {
    if (device && device._id) {
      setDevice(prevState => ({ ...prevState, isDraging: true }));
      setTypeToMove(type);
      calcForPointerDiff({ clientX, clientY }, type);
    }
  }

  const touchstart = (ev, type) => {
    if (device && device._id) {
      setDevice(prevState => ({ ...prevState, isDraging: true }));
      setTypeToMove(type);
      const clientX = ev.changedTouches[0].clientX;
      const clientY = ev.changedTouches[0].clientY;
      calcForPointerDiff({ clientX, clientY }, type);
    }
  }

  // ********************************** MOVE

  const moveToNewLocation = useCallback(({ clientX, clientY }) => {
    if (device && device.isDraging) {
      let copy = device;
      setToUpdate({}); // FOR UPDATE - CHAECK WHY
      switch (typeToMove.name) {
        case 'Device':
          copy.location = { x: (clientX - pointerDiff.x), y: (clientY - pointerDiff.y) };
          break;
        case 'Router':
          copy.routers[typeToMove.idx].location = { x: (clientX - pointerDiff.x), y: (clientY - pointerDiff.y) };
          break;
        default: break;
      }
      setDevice(copy);
    }
  }, [device, pointerDiff, typeToMove])

  const handleMouseMove = useCallback(({ clientX, clientY }) => {
    moveToNewLocation({ clientX, clientY });
  }, [moveToNewLocation])

  const handleTouchMove = useCallback((ev) => {
    const clientX = ev.changedTouches[0].clientX;
    const clientY = ev.changedTouches[0].clientY;
    moveToNewLocation({ clientX, clientY });
  }, [moveToNewLocation])

  // ********************************** STOP

  const handleMouseUp = useCallback(() => {
    if (device && device.isDraging) {
      setDevice(prevState => ({ ...prevState, isDraging: false }));
      dispatch(actions.updateCurrDevice({ ...device, isDraging: false }));
    }
  }, [device, dispatch])

  // ***************************************************** useEffect

  useEffect(() => {
    if ((currDevice && !device) || (currDevice && device && currDevice._id !== device._id)) {
      setDevice(currDevice);
    }
  }, [currDevice, device]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, false);
    window.addEventListener('touchmove', handleTouchMove, false);
    window.addEventListener('mouseup', handleMouseUp, false);
    window.addEventListener('touchend', handleMouseUp, false);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove, false);
      window.removeEventListener('touchmove', handleTouchMove, false);
      window.removeEventListener('mouseup', handleMouseUp, false);
      window.removeEventListener('touchend', handleMouseUp, false);
    }
  }, [handleMouseMove, handleMouseUp, handleTouchMove]);

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
            <DevicesMap device={device} MouseDown={mouseDown} Touchstart={touchstart} />
            <RoutersMap routers={device.routers} MouseDown={mouseDown} Touchstart={touchstart} />
          </div>
        }
      </div>

    </div>
  );
}

export default React.memo(MainPreview)