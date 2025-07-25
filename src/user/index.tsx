import { Alert, Container, Grid, } from "@mantine/core";
import React from "react";
import { BasicInfo } from "./components/BasicInfo";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "./hooks/useGetUserQuery";
import { SkillsInfo } from "./components/skillsInfo";
//import classes from "./styles/index.module.css";
import { EducationInfo } from "./components/EducationInfo";
import { RatingsAndReviews } from "./components/RatingsAndReviews";
import { Avalability } from "./components/Avalability";
import { useGetSwapQuery } from "./hooks/useGetSwapQuery";
import { Conditional } from "src/components";
import { UserLoader } from "./components/UserLoader";

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
        {/* <Group align="flex-start" gap={35} className={classes.group}>
          <div className={classes.basic}>
            <BasicInfo user={user!} swapData={swap} />
          </div>
          <div className={classes.other}>
            <SkillsInfo user={user!} />

            <EducationInfo educationalInfo={user?.education!} />

            <Avalability available={user?.availability!} />
          </div>
        </Group> */}
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 3.5, lg: 3.3, xl: 3.1 }}>
            <BasicInfo user={user!} swapData={swap} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 8.5, lg: 8.7, xl: 8.9 }}>
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
