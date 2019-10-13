import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import actions from '../store/actions';

import DevicesMap from './DevicesMap';

function MainPreview({ device }) {

  const dispatch = useDispatch();
  const [pointerDiff, setPointerDiff] = useState('');
  const [a, setA] = useState('');
  const [copyDevice, setCopyDevice] = useState(null);

  const mainDiv = useRef(null);

  const handleMouseUp = useCallback(() => {
    if (copyDevice && copyDevice.isDraging) {
      let copy = copyDevice;
      copy.isDraging = false;
      setCopyDevice(copy);
      dispatch(actions.updateCurrDevice(copy));
    }
  }, [copyDevice, dispatch])

  const handleMouseMove = useCallback(({ clientX, clientY }) => {
    if (copyDevice && copyDevice.isDraging) {
      let copy = copyDevice;

      // setPointerDiff({});
      setA({});
      const topGap = window.innerHeight - mainDiv.current.offsetHeight + 36;
      const leftGap = window.innerWidth - mainDiv.current.offsetWidth;

      copy.location = { x: clientX - leftGap, y: clientY - topGap };
      setCopyDevice(copy);
    }
  }, [copyDevice])


  const handleTouch = useCallback((ev) => {
    console.log(ev)
    const clientX = ev.changedTouches[0].clientX;
    const clientY = ev.changedTouches[0].clientY;
    // console.log('clientX', clientX,'clientY', clientY)
    console.log(copyDevice)
    // console.log(copyDevice.isDraging)
    if (copyDevice && copyDevice.isDraging) {
      console.log('okkkkkk')
      
    }
  }, [])

  useEffect(() => {
    if ((device && !copyDevice) || (device && copyDevice && device._id !== copyDevice._id)) {

      setCopyDevice(device);
      // for dispatch in handleMouseMove:
      // setCopyDevice({...device, isDraging:false});
    }
  }, [device, copyDevice]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, false);
    window.addEventListener('touchmove', handleTouch, false);
    window.addEventListener("mouseup", handleMouseUp, false);
    window.addEventListener('touchend', handleMouseUp, false);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove, false);
      window.removeEventListener('touchmove', handleTouch, false);
      window.removeEventListener("mouseup", handleMouseUp, false);
      window.removeEventListener('touchend', handleMouseUp, false);
    }
  }, [handleMouseMove, handleMouseUp]);

  const mouseDown = () => {
    if(copyDevice && copyDevice._id){
      let copy = copyDevice;
      copy.isDraging = true;
      setCopyDevice(copy);
    }
  }

  return (
    <div className="main-preview" ref={mainDiv}>
      <div className="device-catagory flex space-even wrap">
        <span>Details</span>
        <span>Connections</span>
        <span>History</span>
      </div>

      {copyDevice && <DevicesMap device={copyDevice} MouseDown={mouseDown} />}
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