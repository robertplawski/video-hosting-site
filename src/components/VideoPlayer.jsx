import React, { useState, useRef, useEffect } from 'react';
import { IconPlayerPauseFilled, IconLoader2, IconPlayerPlayFilled, IconVolume, IconArrowsMaximize, IconSettings, IconThumbUp, IconReload, IconDownload, IconRepeat, IconArrowsMinimize, IconRepeatOff} from '@tabler/icons-react';
import { SwitchButton } from "/src/components/Button.jsx";
import { Tooltip } from "/src/components/Tooltip.jsx"
import { VideoProgressBar } from "/src/components/VideoProgressBar.jsx"
import useFullscreenStatus  from "/src/hooks/FullscreenHook.jsx";
import { useVideoPause, useVideoDuration, useVideoTimestamp, useVideoLoaded, useVideoCanPlayThrough, useVideoEnded} from "/src/hooks/VideoHooks.jsx"
import {parseTime} from "/src/utils/timestampUtils.jsx"
import {Slider} from "/src/components/Slider.jsx";


// TODO
// PLEASE ADD KEYBOARD CONTROL
// PLEASE CREATE CUSTOM HOOKS FOR VIDEO REFERENCE
// CREATE OTHER FILE FOR CONTEXT MENU

function VideoPlayer(props) {
  const {source, className} = props;

  const videoRef = useRef();
  const selfRef = useRef();

  // GET RID OF IT AND REPLACE IT WITH VIDEOREF.PLAYING
  const [isPaused, setPaused] = useVideoPause(videoRef);
  // SAME HERE IDK WHY I WENT THIS ROUTE
  const [duration, setDuration] = useVideoDuration(videoRef);
  const [currentTimestamp, setCurrentTimeStamp] = useVideoTimestamp(videoRef);

  const [isContextMenuShowing, setContextMenuShowing] = useState(false);
  const [mousePos, setMousePos] = useState({x:0,y:0});
  const [isLoaded, setLoaded] = useVideoLoaded(videoRef);
  const [canPlayThrough, setCanPlayThrough] = useVideoCanPlayThrough(videoRef);

  const [isFullscreen, setFullscreen] = useFullscreenStatus(selfRef);
  const [isLooping, setLooping] = useState(false);
  const [videoEnded, setVideoEnded] = useVideoEnded(videoRef);




  const playPause = () => {
    if(videoEnded){
      videoRef.current.currentTime = 0;
      setPaused(false);
      return;
    }
    setPaused(!isPaused);

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
    if (isFullscreen) {
      document.exitFullscreen();
      setFullscreen(false);
    } else {
      setFullscreen(true);
    }
  }
  const toggleLoop = () => {
    setLooping(!isLooping);
    videoRef.current.loop = !isLooping;
  }
  const mouseMove = (e) => {
    if(!isContextMenuShowing) setMousePos({x: e.clientX, y: e.clientY})
  }
  const changeVolume = (val) => {
    videoRef.current.volume = val/100;
  }
  const getVolume = () => {
    if (!videoRef.current) return;
    return videoRef.current.volume;
  }
  // SHOW CONTEXT MENU ON RIGHT CLICK AND WHEN CONTEXT MENU IS SHOWN DO NOT PREVENT DEFAULT AND HIDE COINTEXT MENU
  // ON CLICK CLOSE CONTEXT MENU
  // ADD ACCESIBLE ELEMENT THAT ALLOWS FOR KEYBOARD CONTROL
  return (
    <>
      { isContextMenuShowing ? 
          <div className={`absolute bg-black rounded-xl text-white z-50 bg-opacity-80 p-2 py-4 pointer-events-none flex-col flex gap-2`} style={{left:`${mousePos.x}px`, top: `${mousePos.y}px`}}>
            <p className="font-bold">Some hidden options</p>
            <a href={source} download className="flex gap-4 pointer-events-auto"><IconDownload/> Download video</a>
          </div> 
        : <></> 
      }
      <div  ref={selfRef}  className={`relative  aspect-ratio-video min-w-max bg-black overflow-hidden ${!isFullscreen ? "rounded-2xl" : ""} ${className}`} onClick={closeContextMenu} onContextMenu={showContextMenu} onMouseMove={mouseMove}>
        <video ref={videoRef} className="w-full" preload>
          <source src={source} type="video/mp4"/>
        </video>
        <div onClick={playPause} className={`peer absolute top-0 w-full ${isContextMenuShowing ? "pointer-events-none" : "pointer-events-auto"} h-full flex flex-col items-center justify-center text-white bg-black ${!isPaused ? "bg-opacity-0" : "bg-opacity-50"} transition duration-150`}>
          
          {
            videoEnded ? <IconReload/>
            : !isLoaded ? <IconLoader2 className="animate-spin"/> 
            : isPaused ? <IconPlayerPauseFilled/>
            : <div className=""></div>
          }

        </div>

        <div className={`hover:opacity-100 peer-hover:${!isFullscreen ? 'opacity-100' : ''} ${isPaused ? 'opacity-100' : 'opacity-0'} transition gap-0 absolute bottom-0 w-full flex items-center justify-end flex-col p-4 bg-gradient-to-t from-black`}>
          <VideoProgressBar currentTimestamp={currentTimestamp} duration={duration} videoRef = {videoRef} setCurrentTimestamp = {setCurrentTimeStamp}/>
          <div className="text-white w-full gap-2 px-4 py-0 flex items-center text-sm">
            <Tooltip caption="Play">
              <SwitchButton className="bg-blue-500 p-1 rounded-2xl" onClick={playPause} statement={isPaused} enabledIcon = {<IconPlayerPlayFilled/>} disabledIcon = {<IconPlayerPauseFilled/>} />
            </Tooltip>
            <div className="group/volume flex gap-2 flex justify-center items-center">
              <Tooltip caption={getVolume()}>
                <SwitchButton className="group/volume" statement={true} enabledIcon = {<IconVolume/>}/>
              </Tooltip>
              <Slider onChange={(e)=> alert(e.details.value)} className=" group-hover/volume:w-16 focus/volume:w-16 focus/volume:opacity-100 group-hover/volume:opacity-100 opacity-0 transition-all duration-100 w-0 rounded-2xl"/>
            </div>

            <div className="whitespace-nowrap flex justify-center items-center">{parseTime(currentTimestamp)} / {parseTime(duration)}</div>

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
