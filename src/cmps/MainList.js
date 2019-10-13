import React from 'react';
import { useDispatch } from 'react-redux';
import actions from '../store/actions';

function MainList({ devices, isMobile, currDevice }) {
  const dispatch = useDispatch();

  const selectDevice = (id) => {
    dispatch(actions.changeCurrDeviceById(id));
  }

  return (
    <div className={`device-list ${isMobile ? 'mobile' : 'desktop'}`}>
      {devices.map(dev =>
        <div className={`single-device ${currDevice && currDevice._id === dev._id ? 'selected' : ''} `} key={dev._id}
          onClick={() => selectDevice(dev._id)}>
          {dev.name}
        </div>
      )}
    </div>
  );
}

export default React.memo(MainList)