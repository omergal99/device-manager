import React, { useState } from 'react';
import useRouteProps from "../../useRouteProps";

function DeviceMap({ device: { type, connections = null, _id: id, name, location: deviceLocation, zIndex },
  onClientDown, onCreateConnection }) {

  const [, , history] = useRouteProps();

  // const [match, location, history] = useRouteProps();

  const [toggleOptions, setToggleOptions] = useState('');
  const imgName = type.toLowerCase();

  // const match2 = match;
  // const location2 = location;
  // if (match2 && !location2) {
  //   console.log('dddd')
  // }

  const goTo = (value) => {
    // console.log(match)
    // console.log(location)
    // console.log(history)
    const NewUrl = `/manageDevice/${value}`;
    (history.location.pathname !== NewUrl) && history.push(NewUrl);
  }

  const newConnection = () => {
    window.addEventListener('click', chackForConnection, false);
  }

  const chackForConnection = ev => {
    if (ev.target.getAttribute('src') !== 'assets/img/icons/make new connection.png') {
      const dataId = ev.target.getAttribute('data-id');
      (dataId && dataId !== id) && onCreateConnection(id, dataId);
      window.removeEventListener('click', chackForConnection, false);
      setToggleOptions('');
    }
  }

  const sendClientDown = ev => {
    const relation = connections ? 'Own' : 'Related';
    onClientDown(ev, { value: relation, id });
  };

  const toggle = () => { toggleOptions === id ? setToggleOptions('') : setToggleOptions(id) }

  return (
    <div className="device"
      style={{ top: `${deviceLocation.y}px`, left: `${deviceLocation.x}px`, zIndex: zIndex }}>
      <div className="icon" onMouseDown={sendClientDown} onTouchStart={sendClientDown}>
        <img draggable="false" src={`assets/img/icons/${imgName}.png`} data-id={id} alt={`${name}`} title={`${name}`} />
      </div>
      <div className="title">
        <span title={`${name}`}>{name}</span>
      </div>
      <button className="device-btn-options" onClick={toggle}>
        <img src="assets/img/icons/mehr3.png" alt="Options" />
      </button>
      {toggleOptions === id &&
        <div className="options">
          <img src="assets/img/icons/details.png" alt="" onClick={() => goTo('details')} />
          <img src="assets/img/icons/make new connection.png" alt="" onClick={newConnection} />
          <img src="assets/img/icons/history.png" alt="" onClick={() => goTo('history')} />
        </div>
      }
    </div>
  );
}

export default React.memo(DeviceMap);