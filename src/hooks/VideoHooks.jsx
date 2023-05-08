import { document } from "postcss";
import { useState, useLayoutEffect } from "react";

export function useVideoCanPlayThrough(elRef){
  const [canPlayThrough, setVidCanPlayThrough] = useState(false);

  const setCanPlayThrough = () => {
    if (elRef.current == null) return;
    setVidCanPlayThrough(true);
  };

  useLayoutEffect(() => {
    elRef.current.oncanplaythrough = () =>
      setVidCanPlayThrough(true);
    elRef.current.onwaiting = () =>
      setVidCanPlayThrough(false);

    return () => {document.oncanplaythrough = undefined;};
  });

  return [canPlayThrough, setCanPlayThrough];
}


export function useVideoTimestamp(elRef) {
  const [timestamp, setVidTimestamp] = useState();

  const setTimestamp = (val) => {
    if (elRef.current === null) return;
    elRef.current.currentTime = val;
    setVidTimestamp(val);
  };

  useLayoutEffect(() => {
    elRef.current.ontimeupdate = () =>
      setVidTimestamp(elRef.current.currentTime);

    return () => {document.ontimeupdate = undefined};
  });

  return [timestamp, setTimestamp];
}

export function useVideoLoaded(elRef) {
  const [isLoaded, setIsLoaded] = useState(false);

  const setLoaded = () => {
    if (elRef.current == null) return;
    setIsLoaded(true);
  };

  useLayoutEffect(() => {
    elRef.current.onwaiting = () =>
      setIsLoaded(false);
    elRef.current.oncanplay= () =>
      setIsLoaded(true);
    elRef.current.onstalled = () =>
      setIsLoaded(false);

    return () => {document.onloadeddata = undefined;};
  });

  return [isLoaded, setIsLoaded];
}
export function useVideoEnded(elRef) {
  const [isEnded, setIsEnded] = useState(false);

  const setEnded = (value) => {
    if (elRef.current == null) return;
    setIsEnded(value);
    if(value === true){
      elRef.current.pause();
    }else{
      elRef.current.play();
    }
  };

  useLayoutEffect(() => {
    elRef.current.onended = () =>
      setIsEnded(true);
    elRef.current.onplay = () =>
      setIsEnded(false);

    return () => {document.onended =undefined; document.onplay = undefined;};
  });

  return [isEnded, setEnded];
}


export function useVideoPause(elRef) {
  const [isPaused, setIsPaused] = useState();

  const setPaused = (value) => {
    if (elRef.current == null) return;
    setIsPaused(value);
    if(value === true){
      elRef.current.pause();
    }else{
      elRef.current.play();
    }
  };

  useLayoutEffect(() => {
    elRef.current.onloadstart = () =>
      setIsPaused(true);
    elRef.current.onpause = () =>
      setIsPaused(true);
    elRef.current.onplay = () =>
      setIsPaused(false);


    return () => {document.onpause = undefined; document.onloadstart = undefined; document.onplay = undefined;};
  });

  return [isPaused, setPaused];
}

export function useVideoDuration(elRef) {
  const [duration, setVidDuration] = useState(0);

  const setDuration = () => {
    if (elRef.current == null) return;
    setVidDuration(elRef.current.duration);

  };

  useLayoutEffect(() => {
    elRef.current.ondurationchange = () => 
      setVidDuration(elRef.current.duration);

    return () => {document.onpause = undefined};
  });

  return [duration, setDuration];
}
