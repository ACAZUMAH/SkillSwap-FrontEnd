import { useQuery, gql } from "@apollo/client";
import { Query, QueryGetReviewsArgs, Reviewfilters } from "src/interfaces";

const userReviewsQuery = gql`
  query GetReviews($filters: Reviewfilters!) {
    getReviews(filters: $filters) {
      edges {
        id
        reviewerId
        revieweeId
        reviewer {
          id
          firstName
          lastName
          profile_img
        }
        reviewee {
          id
          firstName
        }
        ratings
        comments
        createdAt
        updatedAt
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

export const useGetUserReviews = (filters: Reviewfilters) => {
  const { data, ...results } = useQuery<
    { getReviews: Query["getReviews"] },
    QueryGetReviewsArgs
  >(userReviewsQuery, {
    variables: {
      filters,
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const reviews = data?.getReviews.edges || [];

  const pageInfo = data?.getReviews.pageInfo;

  return { reviews, pageInfo, ...results };
};
