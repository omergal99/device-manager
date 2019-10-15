import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import actions from '../store/actions';

function DraggingListener(device, pointerDiff, typeToMove) {

  const dispatch = useDispatch();
  const [newDevice, setNewDevice] = useState(device);
  const [update, setToUpdate] = useState('');

  // ********************************** MOVE
  const moveToNewLocation = useCallback(({ clientX, clientY }) => {
    let copy = device;
    setToUpdate({}); // FOR UPDATE - CHAECK WHY
    switch (typeToMove.name) {
      case 'Device':
        copy.location = { x: (clientX - pointerDiff.x), y: (clientY - pointerDiff.y) };
        break;
      case 'Router':
        copy.routers[typeToMove.idx].location = { x: (clientX - pointerDiff.x), y: (clientY - pointerDiff.y) };
        break;
      default: break;
    }
    setNewDevice(copy);
  }, [device, pointerDiff, typeToMove])

  const clientMove = useCallback((ev) => {
    if (device && device.isDraging) {
      const touches = ev.changedTouches;
      (!touches) ? moveToNewLocation(ev)
        : moveToNewLocation({ clientX: touches[0].clientX, clientY: touches[0].clientY });
    }
  }, [moveToNewLocation, device])

  // ********************************** STOP
  const clientUp = useCallback(() => {
    if (device && device.isDraging) {
      setNewDevice(prevState => ({ ...prevState, isDraging: false }));
      dispatch(actions.updateCurrDevice({ ...newDevice, isDraging: false }));
    }
  }, [device, newDevice, dispatch])

  useEffect(() => {
    window.addEventListener('mousemove', clientMove, false);
    window.addEventListener('touchmove', clientMove, false);
    window.addEventListener('mouseup', clientUp, false);
    window.addEventListener('touchend', clientUp, false);
    return () => {
      window.removeEventListener('mousemove', clientMove, false);
      window.removeEventListener('touchmove', clientMove, false);
      window.removeEventListener('mouseup', clientUp, false);
      window.removeEventListener('touchend', clientUp, false);
    }
  }, [clientMove, clientUp]);

  return newDevice;

}

export default DraggingListener;