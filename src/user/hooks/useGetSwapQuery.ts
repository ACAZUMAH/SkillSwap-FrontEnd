import { gql, useQuery } from "@apollo/client";
import { useAppAuthentication } from "src/hooks";
import { Query, QueryGetSwapByUsersArgs } from "src/interfaces";

const getSwapQuerygql = gql`
  query GetSwapByUsers($data: SwapByUsers) {
    getSwapByUsers(data: $data) {
      id
      senderId
      receiverId
      status
    }
  }
`;

export const useGetSwapQuery = (id: string) => {
  const { user } = useAppAuthentication();

  const { data, ...result } = useQuery<
    Pick<Query, "getSwapByUsers">,
    QueryGetSwapByUsersArgs
  >(getSwapQuerygql, {
    variables: { data: { receiverId: id, senderId: user?.id || "" } },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const swap = data?.getSwapByUsers ? data.getSwapByUsers : null;

  return { swap, ...result };
};
