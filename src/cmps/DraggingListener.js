import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import actions from '../store/actions';

function DraggingListener(device, pointerDiff, typeToMove) {

  const dispatch = useDispatch();
  const [newDevice, setNewDevice] = useState(device);
  const [isMove, setIsMove] = useState(false);
  const [update, setUpdate] = useState('');

  // ********************************** MOVE
  const moveToNewLocation = useCallback(({ clientX, clientY }) => {
    let copy = device;
    setUpdate({}); // FOR UPDATE - CHAECK WHY
    !isMove && setIsMove(true);
    // if(!typeToMove) console.log('typeToMovetypeToMovetypeToMove', typeToMove)
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
  }, [device, pointerDiff, typeToMove, isMove])

  const clientMove = useCallback((ev) => {
    if (device && device.isDraging && typeToMove) {
      // ev.stopPropagation();
      // ev.preventDefault();
      const touches = ev.changedTouches;
      (!touches) ? moveToNewLocation(ev)
        : moveToNewLocation({ clientX: touches[0].clientX, clientY: touches[0].clientY });
    }
  }, [moveToNewLocation, device, typeToMove])

  // ********************************** STOP
  const clientUp = useCallback((ev) => {
    if (device && device.isDraging) {
      // ev.stopPropagation();
      // ev.preventDefault();

      // var copy = {...newDevice};
      // console.log(newDevice)
      // console.log(copy)
      // copy.isDraging = false;
      // setNewDevice(copy);

      setNewDevice(prevState => ({ ...prevState, isDraging: false }));
      if (isMove) {
        setIsMove(false);
        // dispatch(actions.updateCurrDevice(copy));
        dispatch(actions.updateCurrDevice({ ...newDevice, isDraging: false }));
      }
    }
  }, [device, isMove, newDevice, dispatch])

  useEffect(() => {
    setNewDevice(device);
  }, [device]);

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