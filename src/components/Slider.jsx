import {useRef, useState, useEffect} from "react";
import {useResize} from "/src/hooks/ResizeHook.jsx"
import {publish, subscribe} from "/src/utils/eventUtils.jsx"

export function Slider (props){
  const {min = 0 , max = 100, start = 10, step = 0.1, selfRef = useRef(), className, onChange = () => {}} = props;

  const [value, setValue] = useState(start);
  const [mousePos, setMousePos] = useState({x:0,y:0});
  const [isMouseDown, setMouseDown] = useState(false);

  useEffect(()=>{
    setValue(start);     
    publish('onChange', {value: value});
    subscribe('onChange', (e)=>{onChange(e)});
  },[])

  useEffect(()=>{
      if(isMouseDown) {setValue(mousePos.x/selfRef.current.getBoundingClientRect().width*max); 
      publish('onChange', {value: value});
    }
  }, [mousePos, isMouseDown, value, max]);

  return  <div ref={selfRef} className={`relative cursor-pointer  flex items-center group h-8 justify-center rounded-2xl progressbar select-none ${className}`}
    onMouseMove = {(e)=>{setMousePos({x:e.clientX-selfRef.current.getBoundingClientRect().left, y:e.clientY})}}
    onMouseDown={()=>setMouseDown(true)} onMouseUp={()=>setMouseDown(false)} onMouseLeave={()=>setMouseDown(false)}>
    <div className="absolute h-1 w-[90%] flex items-center">
      <div className="bg-blue-500 absolute h-full z-30 pointer-events-none rounded-2xl" style={{width: value/max*100+"%"}}/>
      <div className="bg-gray-400 opacity-80 absolute h-full w-full z-10 pointer-events-none rounded-2xl"/>
      <div className="h-4 w-4 group-hover:w-5 group-hover:h-5 transition-size bg-blue-500 absolute z-30 pointer-events-none rounded-2xl" 
        style={{left: `calc(${value/max*100}% - 0.75rem)`}}/>
      <div className="bg-gray-200 group-hover:opacity-100 opacity-0 transition-opacity absolute h-full w-full z-10 pointer-events-none rounded-2xl" 
        style={{width: value/max*100+"%"}}/>
    </div>
  </div>
}


