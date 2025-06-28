import React, { useEffect } from "react";
import { useAuthenticationDataQuery } from "./hooks/useAuthenticationDataQuery";
import { useAppAuthentication } from "src/hooks";

interface SystemProviderProps {
  children?: React.ReactNode;
}

export const SystemProvider: React.FC<SystemProviderProps> = ({ children }) => {
  const { updateAuthencation, isAuthenticated } = useAppAuthentication();
  const { currentUser } = useAuthenticationDataQuery(isAuthenticated);

  useEffect(() => {
    if (currentUser) {
      updateAuthencation({
        user: currentUser,
      });
    }
  }, [currentUser, updateAuthencation]);

  return <>{children}</>;
};
