import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../store/actions';

import MainList from './MainList'
import MainPreview from './MainPreview'

function Main() {

  const dispatch = useDispatch();
  const deviceStore = useSelector(state => state.deviceStore);
  const [isOpenDeviceList, setIsOpenDeviceList] = useState(false);
  const isDesktop = (window.orientation === undefined && navigator.userAgent.indexOf('Mobile') === -1);

  useEffect(() => {
    dispatch(actions.loadDeviceData());
  }, [dispatch]);

  const toggleDeviceMenu = () => {
    setIsOpenDeviceList(!isOpenDeviceList);
  }

  return (
    <div className="main">

      <div className="bar-device">
        {deviceStore &&
          <h2>{deviceStore.currDevice.name}</h2>
        }
        {!isDesktop &&
          <div>
            <button onClick={toggleDeviceMenu}>Devices</button>
            {isOpenDeviceList && <div className="menu-list-mobile">
              <MainList devices={deviceStore.list} />
            </div>}
          </div>
        }
      </div>

      {deviceStore && <div className="preview-device flex">
        {isDesktop && <MainList devices={deviceStore.list} />}
        <MainPreview device={deviceStore.currDevice} />
      </div>}
    </div>
  );
}

export default React.memo(Main)