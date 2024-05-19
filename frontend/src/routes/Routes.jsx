import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Student from "../pages/Student";
import Lecturer from "../pages/Lecturer";
import Admin from "../pages/Admin";

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    { path: "student", element: <Student /> },
    { path: "lecturer", element: <Lecturer /> },
    { path: "admin", element: <Admin /> },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};

export default Routes;
