import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { CreateReviewInput, Mutation, MutationCreateReviewArgs } from "src/interfaces";

const reviewMutation = gql`
  mutation CreateReview($data: CreateReviewInput!) {
    createReview(data: $data) {
      id
    }
  }
`;

export const useReviewMutation = () => {
  const [mutate, result] = useMutation<{
    createReview: Mutation["createReview"];
  }, MutationCreateReviewArgs>(reviewMutation, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    refetchQueries: ["GetUserReviews", "getReviews"],
  });

  const createReview = async (data: CreateReviewInput) => {
    try {
        const res = await mutate({
            variables: { data },
        })

        showNotification({
            title: "Success",
            message: "You have successfully submitted your review.",
            color: "blue",
        })
        return res.data?.createReview;
    } catch (error) {
        showNotification({
            title: "Error",
            message: "Failed to submit review. Please try again.",
            color: "red",
        })
    }
  };

    return { createReview, ...result };
};
