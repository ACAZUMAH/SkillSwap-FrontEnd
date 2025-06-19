import React, { useEffect } from "react";
import { useAuthenticationDataQuery } from "./hooks/useAuthenticationDataQuery";
import { useAppAuthentication } from "src/hooks";

interface SystemProviderProps {
  children?: React.ReactNode;
}

export const SystemProvider: React.FC<SystemProviderProps> = ({ children }) => {
  const { updateAuthencation } = useAppAuthentication();
  const { currentUser } = useAuthenticationDataQuery();

  useEffect(() => {
    if (currentUser) {
      updateAuthencation({
        user: currentUser,
      });
    }
  }, [currentUser, updateAuthencation]);

  return <>{children}</>;
};
