import { useEffect, useRef } from 'react';

export const useOnClickOutside = (handler: () => void) => {
  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // @ts-ignore
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
  return ref;
};
