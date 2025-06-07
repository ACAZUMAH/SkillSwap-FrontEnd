import { routerEndPoints } from "src/constants";
import { LandingLayout } from "src/layouts/Landing";
//import { Authentication } from "src/authentication";
import type { RouteObject } from "react-router-dom";
import { LandingPage } from "src/layouts/Landing/components";
import { Authentication } from "src/layouts/auth";
import Login from "src/authentication/components/Login";
import { Register } from "src/authentication";
import { Mainlayout } from "src/layouts/main";
import { routesProtector } from "./routes-protector";

export const routes = [
  {
    path: routerEndPoints.home,
    element: <Mainlayout />,
    loader: routesProtector().requireLoggedIn(),
    children: [{}],
  },
  {
    path: routerEndPoints.root,
    element: <LandingLayout />,
    loader: routesProtector().requireNotLoggedIn(),
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
  {
    element: <Authentication />,
    loader: routesProtector().requireNotLoggedIn(),
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
