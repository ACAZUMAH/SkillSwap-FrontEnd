import { routerEndPoints } from "src/constants";
import { LandingLayout } from "src/layouts/Landing";
import { Authentication } from "src/authentication";
import type { RouteObject } from "react-router-dom";
import Login from "src/authentication/components/Login";
import Register from "src/authentication/components/Register";
import { LandingPage } from "src/layouts/Landing/components";

export const routes = [
  {
    path: routerEndPoints.home,
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: routerEndPoints.register,
        element: <Authentication />,
      },
      {
        path: routerEndPoints.login,
        element: <Authentication />,
      },
    ],
  },
] satisfies RouteObject[];
