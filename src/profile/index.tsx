import React from "react";
import ProfilePage from "./components/profilepage";
import { Container, Grid } from "@mantine/core";
import { PersonalDetails } from "./components/PersonalDetails";
import { useAppAuthentication } from "src/hooks";
import { AdditionalInfo } from "./components/AdditionalInfo";
import { SkillSet } from "./components/SkillSet";
import { EducationalInfo } from "./components/EducationalInfo";
import { Availability } from "./components/Availability";

export const UserProfile: React.FC = () => {
  const { user } = useAppAuthentication();
  return (
    <>
      <Container w="100%" maw={1400} py={40}>
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 3.7, lg: 3.5, xl: 3 }}>
            <div>
              <PersonalDetails user={user} />

              <AdditionalInfo user={user} />
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 8.3, lg: 8.5, xl: 8.95 }}>
            <div>
              <SkillSet user={user} />

              <EducationalInfo user={user} />

              <Availability user={user} />
            </div>
          </Grid.Col>
        </Grid>
      </Container>
      <ProfilePage />
    </>
  );
};
