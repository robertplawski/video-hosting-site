import React, { useState, useRef, useEffect } from 'react';
import { IconPlayerPauseFilled, IconLoader2, IconPlayerPlayFilled, IconVolume, IconArrowsMaximize, IconSettings, IconDownload, IconRepeat, IconArrowsMinimize, IconRepeatOff} from '@tabler/icons-react';
import { SwitchButton } from "/src/components/Button.jsx";
import { Tooltip } from "/src/components/Tooltip.jsx"
import { VideoProgressBar } from "/src/components/VideoProgressBar.jsx" 
// TODO
// PLEASE ADD KEYBOARD CONTROL
// PLEASE CREATE CUSTOM HOOKS FOR VIDEO REFERENCE
// CREATE OTHER FILE FOR CONTEXT MENU

function useFullscreenStatus(elRef) {
  const [isFullscreen, setIsFullscreen] = useState(
    document[getBrowserFullscreenElementProp()] != null
  );

  const setFullscreen = () => {
    if (elRef.current == null) return;

    elRef.current
      .requestFullscreen()
      .then(() => {
        setIsFullscreen(document[getBrowserFullscreenElementProp()] != null);
      })
      .catch(() => {
        setIsFullscreen(false);
      });
  };

  React.useLayoutEffect(() => {
    document.onfullscreenchange = () =>
      setIsFullscreen(document[getBrowserFullscreenElementProp()] != null);

    return () => {document.onfullscreenchange = undefined};
  });

  return [isFullscreen, setFullscreen];
}

function getBrowserFullscreenElementProp() {
  if (typeof document.fullscreenElement !== "undefined") {
    return "fullscreenElement";
  } else if (typeof document.mozFullScreenElement !== "undefined") {
    return "mozFullScreenElement";
  } else if (typeof document.msFullscreenElement !== "undefined") {
    return "msFullscreenElement";
  } else if (typeof document.webkitFullscreenElement !== "undefined") {
    return "webkitFullscreenElement";
  } else {
    throw new Error("fullscreenElement is not supported by this browser");
  }
}

function VideoPlayer(props) {
  const {source, className} = props;
  // GET RID OF IT AND REPLACE IT WITH VIDEOREF.PLAYING
  const [isPaused, setPaused] = useState(true);
  // SAME HERE IDK WHY I WENT THIS ROUTE
  const [duration, setDuration] = useState(0);
  const [currentTimestamp, setCurrentTimeStamp] = useState(0);

  const [isContextMenuShowing, setContextMenuShowing] = useState(false);
  const [mousePos, setMousePos] = useState({x:0,y:0});
  const [loaded, setLoaded] = useState(false);

  const videoRef = useRef();
  const selfRef = useRef();
  const [isFullscreen, setFullscreen] = useFullscreenStatus(selfRef);
  const [isLooping, setLooping] = useState(false);

  useEffect(()=>{
     setInterval(()=>{
      if(videoRef.current === null){
        setLoaded(false);
        return;
      }
      if(videoRef.current.readyState >= 2){
        setLoaded(true);
      }
      else{
        setLoaded(false)
      }

      setDuration(videoRef.current.duration);
      setCurrentTimeStamp(videoRef.current.currentTime);
    
    },100);
  }, [duration, currentTimestamp, loaded]);

  const parseTime = (seconds) => {
    if(isNaN(seconds)){
      seconds = 0;
    }
    let result = new Date(seconds * 1000).toISOString().substring(14,22)
    return result;
  }

  const playPause = () => {
    setPaused(!isPaused);
    if(!isPaused){
      videoRef.current.pause();
    }
    else{
      videoRef.current.play();
    }
  }
  const showContextMenu = (e) => {
    if(!isContextMenuShowing){
      e.preventDefault();
    }
    setContextMenuShowing(!isContextMenuShowing);
  }
    
  const closeContextMenu = () => {
    setContextMenuShowing(false);
  }

  const toggleFullscreen = () => {
    setFullscreen(!isFullscreen);
  }
  const toggleLoop = () => {
    setLooping(!isLooping);
    videoRef.current.loop = !isLooping;
  }
  const mouseMove = (e) => {
    if(!isContextMenuShowing) setMousePos({x: e.clientX, y: e.clientY})
  }
  const changeVolume = (e) => {
    videoRef.current.volume = e.target.value/100;
  }
  // SHOW CONTEXT MENU ON RIGHT CLICK AND WHEN CONTEXT MENU IS SHOWN DO NOT PREVENT DEFAULT AND HIDE COINTEXT MENU
  // ON CLICK CLOSE CONTEXT MENU
  return (
    <>
    { isContextMenuShowing ? 
        <div className={`absolute bg-black rounded-xl text-white z-50 bg-opacity-80 p-2 py-4 pointer-events-none flex-col flex gap-2`} style={{left:`${mousePos.x}px`, top: `${mousePos.y}px`}}>
          <p className="font-bold">Some hidden options</p>
          <a href={source} download className="flex gap-4 pointer-events-auto"><IconDownload/> Download video</a>
        </div> 
      : <></> 
    }
    <div ref={selfRef} className={`relative aspect-ratio-video min-w-max bg-black overflow-hidden rounded-xl ${className}`} onClick={closeContextMenu} onContextMenu={showContextMenu} onMouseMove={mouseMove}>
      <video ref={videoRef} className="w-full" preload>
        <source src={source} type="video/mp4"/>
      </video>
      <div onClick={playPause} className={`peer absolute top-0 w-full ${isContextMenuShowing ? "pointer-events-none" : "pointer-events-auto"} h-full flex items-center justify-center text-white bg-black ${!isPaused ? "bg-opacity-0" : "bg-opacity-50"} transition duration-150`}>
        
        {
          !loaded ? <IconLoader2 className="animate-spin"/> 
          : isPaused ? <IconPlayerPauseFilled/>
          : <div className=""></div>
        }
      </div>

      <div className={`hover:opacity-100 peer-hover:${!isFullscreen ? 'opacity-100' : ''} ${isPaused ? 'opacity-100' : 'opacity-0'} transition gap-2 absolute bottom-0 w-full flex items-center justify-end flex-col px-4 py-2 bg-gradient-to-t from-black`}>
        <VideoProgressBar currentTimestamp={currentTimestamp}  duration={duration} videoRef = {videoRef} />
        <div className="text-white w-full gap-4 px-4 py-2 flex items-center text-sm">
          <Tooltip caption="Play">
            <SwitchButton className="bg-blue-500 p-1 rounded-2xl" onClick={playPause} statement={isPaused} enabledIcon = {<IconPlayerPlayFilled/>} disabledIcon = {<IconPlayerPauseFilled/>} />
          </Tooltip>
          <div className="group/volume flex gap-2 flex justify-center items-center">
            <Tooltip caption="Volume">
              <IconVolume/>         
            </Tooltip>
            <input type="range" onChange={changeVolume} step={1}  min={0} max={100} className="group-hover/volume:w-16 group-hover/volume:flex group-hover/volume:visible invisible transition-all duration-100 w-0"/>
          </div>

          <p className="whitespace-nowrap flex justify-center items-center">{parseTime(currentTimestamp)} / {parseTime(duration)}</p>

          <div className="flex flex-1"/>

          <Tooltip caption="Loop">
            <SwitchButton onClick={toggleLoop} statement={isLooping} enabledIcon = {<IconRepeat/>} disabledIcon = {<IconRepeatOff/>} />
          </Tooltip>
          <Tooltip caption="Fullscreen">
            <SwitchButton onClick={toggleFullscreen} statement={isFullscreen} enabledIcon = {<IconArrowsMinimize/>} disabledIcon = {<IconArrowsMaximize/>}/>
          </Tooltip>
        </div>
      </div>
    </div>
    </>
  )
}

export default VideoPlayer
