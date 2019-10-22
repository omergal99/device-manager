import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import actions from '../../store/actions';

function DraggingDevice(device, pointerDiff, capturedDeviceType) {

  const dispatch = useDispatch();
  const [newDevice, setNewDevice] = useState(device);
  const [isMove, setIsMove] = useState(false);
  const [, setUpdate] = useState('');

  const updateLocation = useCallback(({ clientX, clientY }) => {
    let copy = device;
    setUpdate({});
    !isMove && setIsMove(true);
    switch (capturedDeviceType.value) {
      case 'Own':
        copy.location = { x: (clientX - pointerDiff.x), y: (clientY - pointerDiff.y) };
        break;
      case 'Related':
        const idx = copy.relatedDevices.findIndex(router => router._id === capturedDeviceType.id);
        copy.relatedDevices[idx].location = { x: (clientX - pointerDiff.x), y: (clientY - pointerDiff.y) };
        break;
      default: break;
    }
    setNewDevice(copy);
  }, [device, pointerDiff, capturedDeviceType, isMove])

  const clientMove = useCallback(ev => {
    if (device && device.isDraging && capturedDeviceType) {
      const touches = ev.changedTouches;
      (!touches) ? updateLocation(ev)
        : updateLocation({ clientX: touches[0].clientX, clientY: touches[0].clientY });
    }
  }, [updateLocation, device, capturedDeviceType])

  const clientUp = useCallback(() => {
    if (device && device.isDraging) {
      setNewDevice(prevState => ({ ...prevState, isDraging: false }));
      if (isMove) {
        setIsMove(false);
        dispatch(actions.updateCurrDevice({ ...newDevice, isDraging: false }));
      }
    }
  }, [device, isMove, newDevice, dispatch])

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

export default DraggingDevice;