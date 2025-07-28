import React, { useEffect } from "react";
import { useSwapUpdateSubscription } from "./hooks/useUpdateSwapSubcription";
import { useUpdateChatSubscription } from "./hooks/useUpdateChatSubscription";
import { useGetAllChatsQuery } from "src/providers/subscription/hooks/useGetAllChatsQuery";
import { useAppAuthentication } from "src/hooks";
import { useAppChats } from "src/hooks/useAppChats";
import { useNewSwapRequestSubscription } from "./hooks/useNewSwapRequestSubscription";
import { SubscriptionContext } from "src/context/subscriptionContext";

interface SubscriptionProviderProps {
  children?: React.ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({
  children,
}) => {
  const { user } = useAppAuthentication();
  const { chatsLoaded, loadInitialChats } = useAppChats();
  const { chats } = useGetAllChatsQuery(!user || chatsLoaded);
  useEffect(() => {
    if (user && !chatsLoaded && chats && Object.keys(chats).length > 0) {
      loadInitialChats(chats.filter((chat) => chat !== null));
    }
  }, [user?.id!, chats, chatsLoaded, loadInitialChats]);

  useNewSwapRequestSubscription();
  
  useSwapUpdateSubscription();

  useUpdateChatSubscription();

  return (
    <SubscriptionContext.Provider value={{}}>
      {children}
    </SubscriptionContext.Provider>
  );
};
