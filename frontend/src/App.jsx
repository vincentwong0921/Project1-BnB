import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import * as sessionActions from './store/session'
import { useDispatch } from "react-redux";
import Navigation from "./components/Navigation/Navigation";
import SpotsIndex from "./components/SpotsIndex/SpotsIndex";
import SpotShow from "./components/SpotShow/SpotShow";
import CreateNewSpot from "./components/Navigation/CreateNewSpot";
import './index.css'

const Layout = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    })
  }, [dispatch])

  return(
    <>
      <Navigation isLoaded={isLoaded}/>
      {isLoaded && <Outlet/>}
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <SpotsIndex/>
      },
      {
        path: '/spots/:spotId',
        element: <SpotShow/>
      },
      {
        path: '/spots/new',
        element: <CreateNewSpot/>
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
