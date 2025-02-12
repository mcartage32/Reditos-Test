import { useRoutes, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./Login";
import Registration from "./Registration";
import Home from "./Home";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";

const Routes = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth?.accesToken && location.pathname !== "/registration") {
      navigate("/");
    }
  }, [auth?.accesToken, navigate, location.pathname]);

  return useRoutes([
    {
      path: "/",
      element: !auth?.accesToken ? <Login /> : <Home />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
    {
      path: "/tasks",
      element: auth?.accesToken ? <Home /> : <Login />,
    },
    {
      path: "/create",
      element: auth?.accesToken ? <CreateTask /> : <Login />,
    },
    {
      path: "/edit/:taskId",
      element: auth?.accesToken ? <EditTask /> : <Login />,
    },
  ]);
};

export default Routes;
