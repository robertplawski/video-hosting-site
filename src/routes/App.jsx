import {useEffect, useRef, useState} from "react";
import VideoPlayer from "/src/components/VideoPlayer.jsx";
import {subscribe} from "/src/utils/eventUtils.jsx"


function App() {
  const slider = useRef();
  const [svalue, setsvalue] = useState(0);

  useEffect(()=>{
    if(slider.current == undefined) return;
    subscribe('onChange', (e)=> {console.log(e);setsvalue(e.detail.value)});
    console.log(slider.current)
  }, [slider])

  return (
    <div className="flex justify-center items-center h-screen flex-col gap-4">
      <h1>Simple react video player</h1>
      <VideoPlayer className="w-3/5" source="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"/>
    </div>
  )
}
   
export default App
