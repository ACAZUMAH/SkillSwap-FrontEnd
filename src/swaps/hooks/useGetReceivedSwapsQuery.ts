import { gql, useQuery } from "@apollo/client";
import { Query, QueryGetSwapRequestsArgs } from "src/interfaces";

const getReceivedSwapsGql = gql`
  query GetSwapRequests {
    getSwapRequests {
      edges {
        id
        senderId
        sender {
          firstName
          lastName
          averageRating
          bio
        }
        status
      }
      pageInfo {
        hasNextPage
        page
        limit
        total
      }
    }
  }
`;

export const useGetReceivedSwapsQuery = () => {
  const { data, ...result } = useQuery<
    Pick<Query, "getSwapRequests">,
    QueryGetSwapRequestsArgs
  >(getReceivedSwapsGql, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const swaps = data?.getSwapRequests ? data?.getSwapRequests?.edges : [];
  const pageInfo = data?.getSwapRequests?.pageInfo;

  return { swaps, pageInfo, ...result };
};
