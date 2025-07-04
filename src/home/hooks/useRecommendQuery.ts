import { gql, useQuery } from "@apollo/client";
import {
  QueryRecommendationArgs,
  RecomendationConnection,
  RecommendationFilters,
} from "src/interfaces";

const recommendQueryGql = gql`
  query Recommendation($filters: recommendationFilters) {
    recommendation(filters: $filters) {
      edges {
        user {
          id
          profile_img
          firstName
          lastName
          bio
          averageRating
          availability
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
        matchScore
        mutualExchange
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

export const useGetRecommendationsQuery = (filters?: RecommendationFilters) => {
  const { data, ...result } = useQuery<
    { recommendation: RecomendationConnection },
    QueryRecommendationArgs
  >(recommendQueryGql, {
    variables: { filters },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const recommendations = data?.recommendation.edges || [];
  const pageInfo = data?.recommendation.pageInfo;

  return { recommendations, pageInfo, ...result };
};
