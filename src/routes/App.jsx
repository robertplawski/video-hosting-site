import VideoPlayer from "../components/VideoPlayer.jsx"

function App() {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-4">
      <h1>Simple react video player</h1>
      <VideoPlayer className="w-4/5" source="https://ia600300.us.archive.org/17/items/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.ogv"/>
    </div>
  )
}
   
export default App
