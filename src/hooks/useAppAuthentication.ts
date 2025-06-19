import { useCallback } from "react";
import { useAppDispatch, useAppSelctor } from "./useReduxHooks";
import { Authenticated, Authentication } from "src/interfaces";
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
    dispatch(authenticationActions.reset());
  }, [dispatch]);

  const updateAuthencation = useCallback(
    (authentication: Partial<Authentication>) => {
      dispatch(authenticationActions.update(authentication));
    },
    [dispatch]
  );

  return { registerUser, ...authentication, logoutUser, updateAuthencation };
};
