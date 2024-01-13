import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import * as sessionActions from './store/session'
import { useDispatch } from "react-redux";
import Navigation from "./components/Navigation/Navigation";

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
        path: "/",
        element: <h1>Welcome!</h1>,
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
