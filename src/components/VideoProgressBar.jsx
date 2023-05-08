import {useState, useEffect, useRef} from "react";
import {parseTime} from "/src/utils/timestampUtils.jsx"

export function VideoProgressBar (props){
  const {duration, currentTimestamp, videoRef, setCurrentTimestamp} = props;
  const [mousePos, setMousePos] = useState({x:0,y:0});
  const [clientWidth, setClientWidth] = useState(0);
  const [isMouseDown, setMouseDown] = useState(false);
  const selfRef = useRef()
  useEffect(()=>{
    if(selfRef.current === null) return;
    setClientWidth(selfRef.current.clientWidth);
  }, [selfRef]);

  // SET CLIENT WIDTH ON RESIZE BECAUSE IT BREAKS
  
  useEffect(()=>{
      if(isMouseDown) {setCurrentTimestamp(mousePos.x/clientWidth*duration);}

  }, [mousePos, isMouseDown, duration, clientWidth, setCurrentTimestamp]);

  return  <div ref={selfRef} className="relative w-full flex items-center group h-2 rounded-2xl progressbar select-none" 
    onMouseMove={(e)=>{setMousePos({x:e.clientX-selfRef.current.getBoundingClientRect().left, y:e.clientY})}}
    onMouseDown={()=>setMouseDown(true)} onMouseUp={()=>setMouseDown(false)} onMouseLeave={()=>setMouseDown(false)}>

    <div className="bg-blue-500 absolute h-full z-30 pointer-events-none rounded-2xl" style={{width: currentTimestamp/duration*100+"%"}}/>
    <div className="bg-gray-400 opacity-80 absolute h-full w-full z-10 pointer-events-none rounded-2xl"/>
    <div className="h-0 w-0 group-hover:w-6 group-hover:h-6 transition-size bg-blue-500 absolute z-30 pointer-events-none rounded-2xl" 
      style={{left: `calc(${currentTimestamp/duration*100}% - 0.75rem`}}/>
    <div className="bg-gray-200 group-hover:opacity-100 opacity-0 transition-opacity absolute h-full w-full z-10 pointer-events-none rounded-2xl" 
      style={{width: mousePos.x/clientWidth*100+"%"}}/>
    <div className="text-white rounded-2xl z-10 sticky w-24 flex justify-center bg-black bg-opacity-40 p-1 pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity left-0 right-0 -translate-y-8" 
      style={{left: `calc(${mousePos.x/clientWidth*100}% - 3rem)`}}>
      {parseTime(mousePos.x/clientWidth*duration)}
    </div>
  </div>
}


