import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./dashboard.routes";
import Checkout from "../pages/sale-management/Checkout";

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/admin',
      element: <App />,
      children: routeGenerator(adminPaths),
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/checkout',
      element: <Checkout />,
    },
  ]);
  
  export default router;