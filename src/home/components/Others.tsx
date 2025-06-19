import { SimpleGrid, Title } from "@mantine/core";
import React from "react";
import { UserCard } from "src/components";
import { User } from "src/interfaces";

interface Props {
  users?: Array<User | null>;
}

export const Others: React.FC<Props> = ({ users }) => {
  return (
    <>
      <Title order={2} fw={500} mb="xl">
        Others you may know
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="2.5rem" mb="xl">
        {users?.map((user, index) => (
          <UserCard key={index} user={user!} />
        ))}
      </SimpleGrid>
    </>
  );
};
