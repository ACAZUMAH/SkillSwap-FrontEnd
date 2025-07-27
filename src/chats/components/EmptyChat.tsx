import { Center, Container, Text, Title } from "@mantine/core";
import React from "react";
import classes from "../styles/index.module.css";

export const EmptyChat: React.FC = () => {
  return (
    <>
      <Container>
        <Center className={classes.emptyChatContainer}>
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
