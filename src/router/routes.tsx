import { routerEndPoints } from "src/constants";
import { LandingLayout } from "src/layouts/Landing";
import type { RouteObject } from "react-router-dom";
import { LandingPage } from "src/layouts/Landing/components";
import { Authentication } from "src/layouts/auth";
import { Login, Register } from "src/authentication";
import { Mainlayout } from "src/layouts/main";
import { routesProtector } from "./routes-protector";
import { Home } from "src/home";
import { Learning } from "src/learning";
import { Teaching } from "src/teaching";
import { UserProfile } from "src/profile";
import { Swaps } from "src/swaps";
import { Chats } from "src/chats";
import { UserDetails } from "src/user";
import { Recommendations } from "src/recommendations";
import { Settings } from "src/settings";
import { WhiteBoard } from "src/whiteboard";

export const routes = [
  {
    path: routerEndPoints.HOME,
    element: <Mainlayout />,
    loader: routesProtector().requireLoggedIn(),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: routerEndPoints.RECOMMENDATIONS,
        element: <Recommendations />
      },
      {
        path: routerEndPoints.PROFILE,
        element: <UserProfile />
      },
      {
        path: routerEndPoints.CHAT,
        element: <Chats />
      },
      {
        path: routerEndPoints.SWAPS,
        element: <Swaps />
      },
      {
        path: routerEndPoints.MY_LEARNING,
        element: <Learning />,
      },
      {
        path: routerEndPoints.USER,
        element: <UserDetails />
      },
      {
        path: routerEndPoints.MY_TEACHING,
        element: <Teaching />,
      },
      {
        path: routerEndPoints.SETTINGS,
        element: <Settings />
      },
      {
        path: routerEndPoints.WHITEBOARD,
        element: <WhiteBoard />
      }
    ],
  },
  {
    path: routerEndPoints.ROOT,
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
        path: routerEndPoints.SIGNUP,
        element: <Register />,
      },
      {
        path: routerEndPoints.SIGNIN,
        element: <Login />,
      },
    ],
  },
] satisfies RouteObject[];
