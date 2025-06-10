import { redirect, LoaderFunctionArgs } from "react-router-dom";
import { routerEndPoints } from "src/constants";
import { store } from "src/redux/store";

type CustomLoaderFunction = (
  loaderArgs: LoaderFunctionArgs
) => Promise<ReturnType<typeof redirect> | null>;

export const routesProtector = () => {
  const protectorArray: CustomLoaderFunction[] = [];

  const processFlow = async (loaderArgs: LoaderFunctionArgs) => {
    const promises = protectorArray.map((protector) => protector(loaderArgs));
    const results = await Promise.all(promises);
    const redirectResult = results.find((result) => result?.status === 302);
    return redirectResult || null;
  };

  processFlow.requireLoggedIn = () => {
    protectorArray.push(async () => {
      const authentication = store.getState().authentication;

      if (!authentication.isAuthenticated) {
        return redirect(routerEndPoints.SIGNIN);
      }

      return null;
    });
    return processFlow;
  };

    processFlow.requireNotLoggedIn = () => {
        protectorArray.push(async () => {
        const authentication = store.getState().authentication;
    
        if (authentication.isAuthenticated) {
            return redirect(routerEndPoints.HOME);
        }
    
        return null;
        });
        return processFlow;
    };

    return processFlow;
};
