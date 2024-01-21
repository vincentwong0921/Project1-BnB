import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import * as sessionActions from "./store/session";
import { useDispatch } from "react-redux";
import Navigation from "./components/Navigation/Navigation";
import SpotsLandingPage from "./components/SpotsLandingPage/SpotsLandingPage";
import CreateNewSpot from "./components/SpotForm/CreateNewSpot";
import SpotDetail from "./components/SpotDetail/SpotDetail";
import "./index.css";
import EditSpotForm from "./components/SpotForm/EditSpotForm";
import ManageSpots from "./components/ManageSpots/ManageSpots";

const Layout = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SpotsLandingPage />,
      },
      {
        path: "/spots/:spotId",
        element: <SpotDetail />,
      },
      {
        path: "/spots/:spotId/edit",
        element: <EditSpotForm />,
      },
      {
        path: '/spots/current',
        element: <ManageSpots />
      },
      {
        path: "/spots/new",
        element: <CreateNewSpot />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
