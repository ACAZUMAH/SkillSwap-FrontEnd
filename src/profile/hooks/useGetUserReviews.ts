import { useQuery, gql } from "@apollo/client";
import { useAppAuthentication } from "src/hooks";
import { Query, QueryGetUserReviewsArgs } from "src/interfaces";

const userReviewsQuery = gql`
query GetUserReviews($userId: ID!) {
  getUserReviews(userId: $userId) {
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
    }
    ratings
    comments
    createdAt
    updatedAt
  }
}
`;

export const useGetUserReviews = () => {
    const { user } = useAppAuthentication();
  const { data, ...results } = useQuery<
    { getUserReviews: Query["getUserReviews"] },
    QueryGetUserReviewsArgs
  >(userReviewsQuery, {
    variables: {
      userId: user?.id!
    },
    skip: !user?.id,
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const reviews = data?.getUserReviews || [];

  return { reviews, ...results }

};
