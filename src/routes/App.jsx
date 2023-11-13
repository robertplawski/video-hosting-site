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
      <VideoPlayer className="w-3/5" source="https://ia600300.us.archive.org/17/items/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.ogv"/>
    </div>
  )
}
   
export default App
