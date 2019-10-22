import { useState, useEffect } from 'react';
import * as MediaService from '../../services/MediaService';

function IsWinWidth() {

  // const initIsDesk = (window.orientation === undefined && navigator.userAgent.indexOf('Mobile') === -1);
  const [isDesktop, setIsDesktop] = useState(MediaService.sDesktop <= window.innerWidth);

  useEffect(() => {
    let windowWidth = window.innerWidth;
    const updateIsDesktop = (ev) => {
      if (windowWidth !== ev.currentTarget.innerWidth) {
        windowWidth = ev.currentTarget.innerWidth;
        setIsDesktop(MediaService.sDesktop <= windowWidth);
      }
    };
    window.addEventListener('resize', updateIsDesktop);
    return () => {
      window.removeEventListener('resize', updateIsDesktop);
    }
  });

  return isDesktop;
}

export default IsWinWidth;