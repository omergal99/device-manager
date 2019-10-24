import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../store/actions';

import RouterContext from "../RouterContext";

import ManageDeviceList from '../cmps/ManageDeviceList';
import ManageDevicePreview from '../cmps/ManageDevicePreview';

import IsWinWidthDesk from '../cmps/eventListeners/IsWinWidthDesk';

function ManageDevice(props) {
  const routeProps = {
    match: props.match,
    history: props.history,
    location: props.location
  };

  const dispatch = useDispatch();
  const mobileStore = useSelector(state => state.mobileStore);
  const [isListOpen, setIsListOpen] = useState(false);

  const isDesktop = IsWinWidthDesk();

  useEffect(() => {
    dispatch(actions.loadDeviceData());
    // console.log(props)
  }, [dispatch]);

  const toggleDeviceMenu = () => {
    setIsListOpen(!isListOpen);
  }

  return (
    <RouterContext.Provider value={routeProps}>

    <div className="manage-device">

      <div className="bar">
        {mobileStore && mobileStore.currDevice &&
          <h2>{mobileStore.currDevice.name}</h2>
        }
        {isDesktop ||
          <div className="only-mobile">
            <div className="mask-layer" style={{ display: isListOpen || 'none' }} onClick={toggleDeviceMenu}></div>
            <button onClick={toggleDeviceMenu}>Devices</button>
            {isListOpen &&
              <ManageDeviceList devices={mobileStore.list} isMobile={true} currDevice={mobileStore.currDevice}
              toggleDeviceMenu={toggleDeviceMenu} />
            }
          </div>
        }
      </div>

      {mobileStore && <div className="content flex">
        {isDesktop &&
          <ManageDeviceList devices={mobileStore.list} isMobile={false} currDevice={mobileStore.currDevice} />
        }
        <ManageDevicePreview currDevice={mobileStore.currDevice} />
      </div>}
    </div>
    </RouterContext.Provider>

  );
}

export default React.memo(ManageDevice)