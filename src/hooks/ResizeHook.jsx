import { useState, useEffect } from "react";

export function useResize(elRef) {
  const [size, setElSize] = useState({width: 100, height: 0});

  const setSize = () => {
    if (elRef.current == null) return;
    setElSize({width: elRef.current.clientWidth, height: elRef.current.clientHeight})
  };

  useEffect(()=>{
    setElSize({width: elRef.current.clientWidth, height: elRef.current.clientHeight})
  },[])

  useEffect(() => {
    window.onresize = () => 
      setElSize({width: elRef.current.clientWidth, height: elRef.current.clientHeight})
    

    return () => {document.onresize = undefined;};
  }, [elRef]);

  return [size, setSize];
}


