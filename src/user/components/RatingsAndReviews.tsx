import { Alert, Group, Select, Text, Title } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import React from "react";
import { Conditional } from "src/components";

export const RatingsAndReviews: React.FC = () => {
  return (
    <>
      <Group justify="space-between" align="center" mb="md" mt="xl">
        <Title>⭐ 0.0 Reviews</Title>
        <Group>
          <Group>
            <Text>Filter By:</Text>
            <Select
              variant="unstyle"
              size="sm"
              w={100}
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
              variant="unstyle"
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

      <Conditional condition={true}>
        <Alert>
          <Text size="md">
            No reviews yet!.
          </Text>
        </Alert>
      </Conditional>
    </>
  );
};
