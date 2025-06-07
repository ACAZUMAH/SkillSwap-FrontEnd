import { useCallback } from "react";
import { useAppDispatch, useAppSelctor } from "./useReduxHooks";
import { Authenticated } from "src/interfaces";
import { authenticationActions } from "src/redux/authentication/slice";

export const useAppAuthentication = () => {
  const dispatch = useAppDispatch();
  const authentication = useAppSelctor((state) => state.authentication);

  const registerUser = useCallback(
    ({ user, token }: Authenticated) => {
      dispatch(
        authenticationActions.update({ user, token, isAuthenticated: true })
      );
    },
    [dispatch]
  );

  const logoutUser = useCallback(() => {
    authenticationActions.reset();
  }, [dispatch]);

  return { registerUser, authentication, logoutUser };
};
