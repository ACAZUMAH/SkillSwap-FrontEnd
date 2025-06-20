import { Location } from "react-router-dom";
import { routerEndPoints } from "src/constants";
import { AuthTabs } from "src/layouts/interfaces";

export const authTabs: AuthTabs[] = [
    {
        label: "Sign Up",
        route: routerEndPoints.SIGNUP,
    },
    {
        label: "Sign In",
        route: routerEndPoints.SIGNIN,
    },
]

export const getCurrentTab = (tabs: AuthTabs[], location: Location) => {
    return tabs.find((tab) => tab.route === location.pathname)?.label || tabs[0].label;
}