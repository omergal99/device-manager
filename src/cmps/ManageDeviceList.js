import React from 'react';
import { useDispatch } from 'react-redux';
import actions from '../store/actions';

function ManageDeviceList({ devices, isMobile, currDevice }) {
  const dispatch = useDispatch();

  const selectDevice = (id) => {
    dispatch(actions.changeCurrDeviceById(id));
  }

  return (
    <div className={`manage-device-list ${isMobile ? 'mobile' : 'desktop'}`}>
      {devices.map(dev =>
        <div className={`item ${currDevice && currDevice._id === dev._id && 'selected'}`}
          onClick={() => selectDevice(dev._id)} key={dev._id}>
          {dev.name}
        </div>
      )}
    </div>
  );
}

export default React.memo(ManageDeviceList)