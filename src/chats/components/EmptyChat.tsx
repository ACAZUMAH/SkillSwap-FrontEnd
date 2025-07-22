import { Center, Container, Text, Title } from "@mantine/core";
import React from "react";

export const EmptyChat: React.FC = () => {
  return (
    <>
      <Container>
        <Center style={{ height: "90%", display: "flex", flexDirection: "column" }}>
            <Title c="brand" fs="italic" order={1} size={35}>
              SkillSwap
            </Title>
          <Text c="dimmed" size="lg" mt="md">
            Select a chat to start messaging.
          </Text>
        </Center>
      </Container>
    </>
  );
};
