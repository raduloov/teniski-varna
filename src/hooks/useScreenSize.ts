import { useState, useEffect } from 'react';

export enum Breakpoint {
  small = 356,
  medium = 768,
  large = 1024
}

export enum ScreenSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getScreenSize = (width: number): ScreenSize => {
    switch (true) {
      case width >= Breakpoint.large:
        return ScreenSize.LARGE;
      case width >= Breakpoint.medium:
        return ScreenSize.MEDIUM;
      default:
        return ScreenSize.SMALL;
    }
  };

  return getScreenSize(screenSize.width);
};
