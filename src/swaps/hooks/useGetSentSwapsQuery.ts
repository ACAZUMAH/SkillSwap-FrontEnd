import { gql, useQuery } from "@apollo/client";
import { Query, QueryGetSwapRequestsArgs } from "src/interfaces";

const getSentSwapsGql = gql`
  query GetRequestedSwaps {
    getRequestedSwaps {
      edges {
        id
        receiverId
        receiver {
          id
          firstName
          lastName
          bio
          averageRating
        }
        status
        senderId
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

export const useGetSentSwapsQuery = () => {
  const { data, ...result } = useQuery<
    Pick<Query, "getRequestedSwaps">,
    QueryGetSwapRequestsArgs
  >(getSentSwapsGql, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const swaps = data?.getRequestedSwaps ? data?.getRequestedSwaps?.edges : [];
  const pageInfo = data?.getRequestedSwaps?.pageInfo;

  return { swaps, pageInfo, ...result };
};
