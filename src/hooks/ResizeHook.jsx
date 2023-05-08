import { useState, useLayoutEffect } from "react";

export function useResize(elRef) {
  const [size, setElSize] = useState({width: 0, height: 0});

  const setSize = () => {
    if (elRef.current == null) return;
    setElSize({width: elRef.current.clientWidth, height: elRef.current.clientHeight})
  };

  useLayoutEffect(() => {
    window.onresize = () => 
      setElSize({width: elRef.current.clientWidth, height: elRef.current.clientHeight})
    

    return () => {document.onresize = undefined;};
  });

  return [size, setSize];
}


