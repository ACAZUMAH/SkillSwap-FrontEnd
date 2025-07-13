import { Badge, Card, Group, Image, Rating, Text, Title } from "@mantine/core";
import React from "react";
import { User } from "src/interfaces";
import classes from "./styles/index.module.css";
import defaultProfiile from "../../assets/images/defualt-profile.avif";
import { Gasture } from "../animation/gasture";
import { Conditional } from "../conditional/Conditional";
import { useRouteNavigation } from "src/hooks";
import { routerEndPoints } from "src/constants";

interface UserCardProps {
  user?: User;
  matchedSkill?: string;
  matchScore?: number;
  levelDifference?: number;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigateToUserDetails = useRouteNavigation(routerEndPoints.USER.replace(":id", user?.id!));
  return (
    <>
      <Gasture>
        <Card
          radius="lg"
          withBorder
          p={0}
          className={classes.card}
          onClick={navigateToUserDetails}
        >
          <Image
            src={user?.profile_img || defaultProfiile}
            className={classes.image}
          />
          <div className={classes.body}>
            <Title order={2} className={classes.title}>
              {user?.firstName} {user?.lastName}
            </Title>

            <Rating
              size="sm"
              readOnly
              value={user?.averageRating || 0}
              mt="xs"
            />

            <Group mt="xs" gap={5}>
              <Text fw="bold" c="brand">
                Offering:{" "}
              </Text>
              {user?.skillsProficientAt?.slice(0, 2).map((s, i) => (
                <Badge key={i} size="xs" variant="outline">
                  {s?.name}
                </Badge>
              ))}
              <Conditional condition={user?.skillsProficientAt?.length! > 2}>
                <Badge size="xs" variant="light">
                  +{user?.skillsProficientAt?.length! - 2}
                </Badge>
              </Conditional>
            </Group>

            <Group mt="xs" gap={5}>
              <Text fw="bold" c="brand">
                Seeking:{" "}
              </Text>
              {user?.skillsToLearn?.slice(0, 2).map((s, i) => (
                <Badge key={i} size="xs" variant="outline">
                  {s?.name}
                </Badge>
              ))}
              <Conditional condition={user?.skillsToLearn?.length! > 2}>
                <Badge size="xs" variant="light">
                  +{user?.skillsToLearn?.length! - 3}
                </Badge>
              </Conditional>
            </Group>
          </div>
        </Card>
      </Gasture>
    </>
  );
};
