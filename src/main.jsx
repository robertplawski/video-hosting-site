import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from '/src/routes/App.jsx'
import VideoPlayer from '/src/components/VideoPlayer.jsx'
import '/src/index.css'

const router = createBrowserRouter([
  {
    path: "/VideoHostingSite/",
    element: <App/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
