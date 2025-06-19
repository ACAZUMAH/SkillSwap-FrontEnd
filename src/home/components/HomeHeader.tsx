import { Title } from "@mantine/core";
import React from "react";
import { useAppAuthentication } from "src/hooks";

export const HomeHeader: React.FC = () => {
    const { user } = useAppAuthentication()
  return (
    <>
      <Title order={3} mt="lg">Hi, {user?.firstName} {user?.lastName}</Title>
    </>
  );
};
