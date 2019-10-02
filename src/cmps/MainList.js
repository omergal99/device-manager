import React from 'react';
import { useDispatch } from 'react-redux';
import actions from '../store/actions';

function MainList({ devices }) {
  const dispatch = useDispatch();
  
  const selectDevice = (id) =>{
    dispatch(actions.changeCurrDeviceById(id));
  }

  return (
    <div className="main-list">
      {devices.map(dev => {
        return <div onClick={()=> selectDevice(dev._id)} key={dev._id}>{dev.name} >></div>
      })}
    </div>
  );
}

export default React.memo(MainList)