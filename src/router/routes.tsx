import type { RouteObject } from "react-router-dom";
import { LandingLayout } from "src/layouts/Landing";
import { LandingPage } from "src/layouts/Landing/components";

export const routes = [
    {
        path: "/",
        element: <LandingLayout />,
        children: [{
            index: true,
            element: <LandingPage />
        }]
    }
] satisfies RouteObject[]