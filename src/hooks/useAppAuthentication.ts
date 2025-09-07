import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { Authenticated, Authentication } from "src/interfaces";
import { authenticationActions } from "src/redux/authentication/slice";

export const useAppAuthentication = () => {
  const dispatch = useAppDispatch();
  const authentication = useAppSelector((state) => state.authentication);

  const registerUser = useCallback(
    ({ user, token, zegoToken }: Authenticated) => {
      dispatch(
        authenticationActions.update({ user, token, isAuthenticated: true, zegoToken })
      );
    },
    [dispatch]
  );

  const logoutUser = useCallback(() => {
    dispatch(authenticationActions.reset());
  }, [dispatch]);

  const updateAuthentication = useCallback(
    (authentication: Partial<Authentication>) => {
      dispatch(authenticationActions.update(authentication));
    },
    [dispatch]
  );

  return { registerUser, ...authentication, logoutUser, updateAuthentication };
};
