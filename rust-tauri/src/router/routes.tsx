/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";

const Login = lazy(() => import("../views/login/login"));
const Home = lazy(() => import("../views/index/index"));
const Doctor = lazy(() => import("../views/doctor/index"));

const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Home",
    element: <Home />,
    children: [
      {
        path: "/Home/",
        element: <Doctor />,
      },
    ],
  },
];

export default routes;
