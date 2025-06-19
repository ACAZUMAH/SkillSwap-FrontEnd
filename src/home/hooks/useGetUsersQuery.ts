import { gql, useQuery } from "@apollo/client";
import { Filters, Query } from "src/interfaces";

export const getUsersQueryGql = gql`
  query Search($filters: Filters) {
    search(filters: $filters) {
      edges {
        id
        profile_img
        firstName
        lastName
        bio
        averageRating
        skillsProficientAt {
          id
          level
          name
        }
        skillsToLearn {
          id
          level
          name
        }
      }
      pageInfo {
        hasNextPage
        limit
        page
        total
      }
    }
  }
`;

export const useGetUsersQuery = (filters: Filters) => {
  const { data, ...result } = useQuery<Pick<Query, "search">>(
    getUsersQueryGql,
    {
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
      variables: { filters },
    }
  );

  const users = data?.search?.edges || [];
  const pageInfo = data?.search?.pageInfo;

  return { users, pageInfo, ...result };
};
