import { routerEndPoints } from "src/constants";
import { LandingLayout } from "src/layouts/Landing";
//import { Authentication } from "src/authentication";
import type { RouteObject } from "react-router-dom";
import { LandingPage } from "src/layouts/Landing/components";
import { Authentication } from "src/layouts/auth";
import Login from "src/authentication/components/Login";
import { Register } from "src/authentication";

export const routes = [
  {
    path: routerEndPoints.home,
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
  {

  },
  {
    element: <Authentication />,
    children: [
      {
        path: routerEndPoints.register,
        element: <Register />,
      },
      {
        path: routerEndPoints.login,
        element: <Login />,
      },
    ],
  },
] satisfies RouteObject[];
