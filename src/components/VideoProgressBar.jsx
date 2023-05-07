export function VideoProgressBar (props){
  const {duration, currentTimestamp, videoRef} = props;

  return  <div className="relative w-full flex items-center group h-1 rounded-2xl">
    <input step={0.01} value={currentTimestamp} min={0} max={duration} type="range" onChange={(e)=>{videoRef.current.currentTime  = e.target.value}} className="flex cursor-pointer absolute w-full h-full rounded-2xl appearance-none opacity-0 z-20"/>
    <div className="bg-blue-500 absolute h-full z-20 pointer-events-none rounded-2xl" style={{width: currentTimestamp/duration*100+"%"}}/>
    <div className="bg-white absolute h-full w-full z-10 pointer-events-none rounded-2xl"/>
    <div className="h-0 w-0 group-hover:w-4 group-hover:h-4 transition-size bg-blue-500 absolute z-30 pointer-events-none rounded-2xl" style={{left:currentTimestamp/duration*100+"%", translate:`-${currentTimestamp/duration}rem`}}/>
  </div>
}


