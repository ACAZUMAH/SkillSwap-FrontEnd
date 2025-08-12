import { Alert, Group, Select, Stack, Text, Title } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import React from "react";
import { Conditional } from "src/components";
import { ReviewsCard, ReviewsLoader } from "src/components/reviews";
import { useGetUserReviews } from "../hooks/useGetUserReviews";

interface RatingsAndReviewsProps {
    averageRating?: number;
}

export const RatingsAndReviews: React.FC<RatingsAndReviewsProps> = ({ averageRating  }) => {
  const { reviews, loading, error } = useGetUserReviews();

  return (
    <>
      <Group justify="space-between" align="center" mb="md" mt="xl">
        <Title>⭐ {`${averageRating}.0`} Reviews</Title>
        <Group>
          <Group>
            <Text>Filter By:</Text>
            <Select
              //variant="unstyle"
              size="sm"
              w={80}
              placeholder="Filter by"
              defaultValue={"all"}
              data={[
                { value: "all", label: "All" },
                { value: "positive", label: "Positive" },
                { value: "negative", label: "Negative" },
              ]}
              rightSection={<IconChevronDown stroke={1.5} size={20} />}
            />
          </Group>
          <Group>
            <Text>Sort By:</Text>
            <Select
              //variant="unstyle"
              size="sm"
              w={100}
              placeholder="Sort by"
              defaultValue={"newest"}
              data={[
                { value: "newest", label: "Newest" },
                { value: "oldest", label: "Oldest" },
                { value: "rating-high", label: "Rating: high to low" },
                { value: "rating-low", label: "Rating: low to high" },
              ]}
              rightSection={<IconChevronDown stroke={1.5} size={20} />}
            />
          </Group>
        </Group>
      </Group>
      <Stack>
        <Conditional condition={loading}>
          {Array.from({ length: 8 }).map((_, i) => (
            <ReviewsLoader key={i} />
          ))}
        </Conditional>
        <Conditional condition={!loading && reviews.length > 0}>
          {reviews.map((review) => (
            <ReviewsCard
              key={review.id}
              reviewerName={`${review.reviewer.firstName} ${review.reviewer.lastName}`}
              reviewerProfilePic={review.reviewer.profile_img!}
              rating={review.ratings}
              comment={review.comments!}
              date={review.createdAt}
            />
          ))}
        </Conditional>
      </Stack>
      <Conditional condition={!loading && !error && reviews.length === 0}>
        <Alert>
          <Text size="md">You haven't received reviews yet!.</Text>
        </Alert>
      </Conditional>
      <Conditional condition={Boolean(error)}>
        <Alert color="red">
          <Text size="md">
            There is an error fetching reviews. Please try again later.
          </Text>
        </Alert>
      </Conditional>
    </>
  );
};
