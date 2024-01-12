import LoginFormPage from "./components/LoginFormPage/LoginFormPage";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState, useEffect, Children } from "react";
import * as sessionActions from './store/session'
import { useDispatch } from "react-redux";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage";

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
      },
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: '/signup',
        element: <SignupFormPage/>
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
