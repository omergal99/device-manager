import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../store/actions';

import MainList from './MainList'
import MainPreview from './MainPreview'

function Main() {

  const dispatch = useDispatch();
  const deviceStore = useSelector(state => state.deviceStore);

  useEffect(() => {
    dispatch(actions.loadDeviceData());
  },[dispatch]);

  return (
    <div className="main">
      <h2>Lalalalala</h2>
      {deviceStore && <div>
        <MainList devices={deviceStore.list} />
        <MainPreview device={deviceStore.currDevice} />
      </div>}
    </div>
  );
}

export default React.memo(Main)