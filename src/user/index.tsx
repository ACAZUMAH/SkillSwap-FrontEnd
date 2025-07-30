import { Alert, Container, Grid } from "@mantine/core";
import React from "react";
import { BasicInfo } from "./components/BasicInfo";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "./hooks/useGetUserQuery";
import { SkillsInfo } from "./components/skillsInfo";
import { EducationInfo } from "./components/EducationInfo";
import { RatingsAndReviews } from "./components/RatingsAndReviews";
import { Avalability } from "./components/Avalability";
import { useGetSwapQuery } from "./hooks/useGetSwapQuery";
import { Conditional } from "src/components";
import { UserLoader } from "./components/UserLoader";
import { Links } from "./components/Links";

export const UserDetails: React.FC = () => {
  const param = useParams();
  const { user, loading, error } = useGetUserQuery(param.id!);
  const { swap } = useGetSwapQuery(param.id!);

  const showDetails = !loading && !error && user;
  const showLoading = loading && !error;
  const showError = Boolean(error) && !loading;

  return (
    <Container w="100%" maw={1400} py={40}>
      <Conditional condition={Boolean(showDetails)}>
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 4.5, lg: 3.5, xl: 3 }}>
            <div>
              <BasicInfo user={user!} swapData={swap} />

              <Links user={user!} />
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 7.5, lg: 8.5, xl: 9 }}>
            <div>
              <SkillsInfo user={user!} />

              <EducationInfo educationalInfo={user?.education!} />

              <Avalability available={user?.availability!} />
            </div>
          </Grid.Col>
        </Grid>
      </Conditional>
      <Conditional condition={showLoading}>
        <UserLoader />
      </Conditional>
      <Conditional condition={showError}>
        <Alert title="Error" color="red">
          <p>Something went wrong while fetching user details.</p>
        </Alert>
      </Conditional>
      <RatingsAndReviews />
    </Container>
  );
};
