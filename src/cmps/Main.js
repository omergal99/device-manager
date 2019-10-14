import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../store/actions';
// import * as MediaService from '../services/MediaService';

import MainList from './MainList';
import MainPreview from './MainPreview';

import IsWinWidthDesk from './IsWinWidthDesk';

function Main() {

  const dispatch = useDispatch();
  const deviceStore = useSelector(state => state.deviceStore);
  const [isListOpen, setIsListOpen] = useState(false);

  const isDesktop = IsWinWidthDesk();

  useEffect(() => {
    dispatch(actions.loadDeviceData());
  }, [dispatch]);

  const toggleDeviceMenu = () => {
    setIsListOpen(!isListOpen);
  }

  return (
    <div className="main">

      <div className="bar-device">
        {deviceStore && deviceStore.currDevice &&
          <h2>{deviceStore.currDevice.name}</h2>
        }
        {!isDesktop &&
          <div className="only-mobile">
            <div className="mask-layer" style={{ display: isListOpen ? '' : 'none' }} onClick={toggleDeviceMenu}></div>
            <button onClick={toggleDeviceMenu}>Devices</button>
            {isListOpen &&
              <MainList devices={deviceStore.list} isMobile={true} currDevice={deviceStore.currDevice} />
            }
          </div>
        }
      </div>

      {deviceStore && <div className="preview-device flex">
        {isDesktop &&
          <MainList devices={deviceStore.list} isMobile={false} currDevice={deviceStore.currDevice} />
        }
        <MainPreview currDevice={deviceStore.currDevice} />
      </div>}
    </div>
  );
}

export default React.memo(Main)