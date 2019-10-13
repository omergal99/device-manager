import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import actions from '../store/actions';

import DevicesMap from './DevicesMap';

function MainPreview({ device }) {

  const dispatch = useDispatch();
  const [pointerDiff, setPointerDiff] = useState({ x: 1, y: 1 });
  const [update, setToUpdate] = useState('');
  const [copyDevice, setCopyDevice] = useState(null);
  const mainDiv = useRef(null);

  const moveToNewLocation = useCallback(({ clientX, clientY }) => {
    if (copyDevice && copyDevice.isDraging) {
      let copy = copyDevice;
      setToUpdate({});
      const topGap = window.innerHeight - mainDiv.current.offsetHeight + 36;
      const leftGap = window.innerWidth - mainDiv.current.offsetWidth;
      copy.location = { x: (clientX - leftGap - pointerDiff.x), y: (clientY - topGap - pointerDiff.y) };
      setCopyDevice(copy);
    }
  }, [copyDevice, pointerDiff])

  const calcForPointerDiff = ({ clientX, clientY }) => {
    const topGap = window.innerHeight - mainDiv.current.offsetHeight + 36;
    const leftGap = window.innerWidth - mainDiv.current.offsetWidth;
    const diffX = clientX - copyDevice.location.x - leftGap;
    const diffY = clientY - copyDevice.location.y - topGap;
    setPointerDiff({ x: diffX, y: diffY });
  }

  const mouseDown = ({ clientX, clientY }) => {
    if (copyDevice && copyDevice._id) {
      setCopyDevice(prevState => ({ ...prevState, isDraging: true }));
      calcForPointerDiff({ clientX, clientY });
    }
  }

  const touchstart = (ev) => {
    if (copyDevice && copyDevice._id) {
      setCopyDevice(prevState => ({ ...prevState, isDraging: true }));
      const clientX = ev.changedTouches[0].clientX;
      const clientY = ev.changedTouches[0].clientY;
      calcForPointerDiff({ clientX, clientY });
    }
  }

  const handleMouseUp = useCallback(() => {
    if (copyDevice && copyDevice.isDraging) {
      setCopyDevice(prevState => ({ ...prevState, isDraging: false }));
      dispatch(actions.updateCurrDevice({ ...copyDevice, isDraging: false }));
    }
  }, [copyDevice, dispatch])

  const handleMouseMove = useCallback(({ clientX, clientY }) => {
    moveToNewLocation({ clientX, clientY });
  }, [moveToNewLocation])

  const handleTouchMove = useCallback((ev) => {
    const clientX = ev.changedTouches[0].clientX;
    const clientY = ev.changedTouches[0].clientY;
    moveToNewLocation({ clientX, clientY });
  }, [moveToNewLocation])

  useEffect(() => {
    if ((device && !copyDevice) || (device && copyDevice && device._id !== copyDevice._id)) {
      setCopyDevice(device);
      // for dispatch in handleMouseMove:
      // setCopyDevice({...device, isDraging:false});
    }
  }, [device, copyDevice]);

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
    <div className="main-preview" ref={mainDiv}>
      <div className="device-catagory flex space-even wrap">
        <span>Details</span>
        <span>Connections</span>
        <span>History</span>
      </div>

      {copyDevice && <DevicesMap device={copyDevice} MouseDown={mouseDown} Touchstart={touchstart} />}
      {/* {copyDevice && <div className="playground">
        <h3>{copyDevice.name ? copyDevice.name : 'Choose Device'}</h3>
        <div className="device-icon"
          style={{
            top: `${copyDevice.location.y}px`, left: `${copyDevice.location.x}px`,
            zIndex: copyDevice.zIndex
          }}
          onMouseDown={mouseDown}
        >
          <img src="assets/img/icons/phone.png" alt="Device" />
        </div>
      </div>} */}
    </div>
  );
}

export default React.memo(MainPreview)