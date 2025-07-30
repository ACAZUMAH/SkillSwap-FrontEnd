import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useAppAuthentication, useAppChats, useOnlineStatus } from "src/hooks";
import { Query } from "src/interfaces";

const unreadMessagesCountGql = gql`
  query GetUnreadMessagesCount {
    getUnreadMessagesCount {
      chatId
      unreadCount
    }
  }
`;

export const useUnReadMessagesCountQuery = () => {
  const { user } = useAppAuthentication();
  const { justCameOnline, isOnline } = useOnlineStatus();
  const { setUnreadCount } = useAppChats()
  const { data, refetch } = useQuery<{
    getUnreadMessagesCount: Query["getUnreadMessagesCount"];
  }>(unreadMessagesCountGql, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
    skip: !user?.id || !isOnline,
  });

  useEffect(() => {
    if(data?.getUnreadMessagesCount){
      data?.getUnreadMessagesCount?.forEach((item) => {
        if (item) {
          const { chatId, unreadCount } = item;
          setUnreadCount(chatId, unreadCount);
        }
      });
    }
  }, [data, setUnreadCount])

  useEffect(() => {
    if (justCameOnline && user?.id) {
      refetch();
    }
  }, [justCameOnline, user?.id, refetch]);

  const unreadMessagesCount = data?.getUnreadMessagesCount || [];

  return {
    unreadMessagesCount,
  };
};
