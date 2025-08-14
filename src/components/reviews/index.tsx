import { Group, Skeleton, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { DisplayAvatar } from "../Avatar/DisplayAvatar";
import { formatSideBarChatDate } from "src/helpers/date";
import { IconStar } from "@tabler/icons-react";

interface ReviewsCardProps {
  reviewerName: string;
  reviewerProfilePic: string;
  rating: number;
  comment: string;
  date: string;
}

export const ReviewsCard: React.FC<ReviewsCardProps> = ({
  reviewerName,
  reviewerProfilePic,
  comment,
  rating,
  date,
}) => {
  return (
    <>
      <Group align="flex-start" gap="md" py="md" style={{ width: "100%" }}>
        <DisplayAvatar
          url={reviewerProfilePic}
          name={reviewerName}
          size="md"
          radius="xl"
          style={{ border: "1px solid #e9ecef", width: 40, height: 40 }}
        />
        <Stack gap={8} style={{ flex: 1 }}>
          <Group justify="space-between" align="center">
            <Title order={3} size="sm" fw={600}>
              {reviewerName}
            </Title>
            <Group gap={2}>
              {Array.from({ length: 5 }, (_, i) => (
                <IconStar
                  key={i}
                  size={16}
                  style={{
                    fill: i < Math.floor(rating) ? "#ffd43b" : "#e9ecef",
                    color: i < Math.floor(rating) ? "#ffd43b" : "#ced4da",
                  }}
                />
              ))}
            </Group>
          </Group>
          <Text size="sm">
            {comment}
          </Text>
          <Text size="xs">
            {formatSideBarChatDate(new Date(date))}
          </Text>
        </Stack>
      </Group>
    </>
  );
};

export const ReviewsLoader: React.FC = () => (
  <Group align="flex-start" gap="md" py="md">
    <Skeleton height={40} width={40} radius="xl" />
    <Stack gap={8} style={{ flex: 1 }}>
      <Group justify="space-between" align="center">
        <Skeleton height={16} width={128} />
        <Group gap={5}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} height={14} width={100} circle/>
          ))}
        </Group>
      </Group>
      <Skeleton height={16} width="100%" />
      <Skeleton height={16} width="75%" />
      <Skeleton height={12} width={80} />
    </Stack>
  </Group>
);
