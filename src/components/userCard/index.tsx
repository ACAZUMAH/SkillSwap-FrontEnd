import type React from "react";
import {
  Badge,
  Card,
  Group,
  Text,
  Title,
  Button,
  Progress,
  Stack,
  // ActionIcon,
} from "@mantine/core";
import {
  IconArrowsUpDown,
  IconUsers,
  IconExternalLink,
  // IconBrandGithub,
  // IconBrandLinkedin,
  // IconWorld,
} from "@tabler/icons-react";
import classes from "./styles/style.module.css";
import { Conditional } from "../conditional/Conditional";
import defaultProfile from "../../assets/images/defualt-profile.avif";
import { calculateMatchScore, getMatchScoreColor } from "./helpers";
import { Ratings } from "./components/Ratings";
import { Skill, User } from "src/interfaces";
import { useRouteNavigation } from "src/hooks";
import { routerEndPoints } from "src/constants";
import { DisplayAvatar } from "../Avatar/DisplayAvatar";

interface UserCardProps {
  user?: User;
  matchedSkills?: Skill[];
  matchScore?: number;
  levelDifference?: number;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  matchedSkills,
  matchScore = 0,
}) => {
  const navigateToUserDetails = useRouteNavigation(
    routerEndPoints.USER.replace(":id", user?.id!)
  );
  return (
    <Card
      shadow="sm"
      padding={0}
      radius="lg"
      withBorder
      className={classes.card}
    >
      <Conditional condition={matchScore > 0}>
        <div className={classes.matchHeader}>
          <Group justify="space-between" mb="xs">
            <Group gap="xs">
              <IconUsers size={16} color="var(--mantine-color-blue-6)" />
              <Text size="sm" fw={500}>
                Match Score
              </Text>
            </Group>
            <Text
              size="sm"
              fw={700}
              c={getMatchScoreColor(calculateMatchScore(matchScore))}
            >
              {calculateMatchScore(matchScore)}%
            </Text>
          </Group>

          <Conditional condition={Boolean(matchedSkills?.length)}>
            <Group gap="xs">
              {matchedSkills?.slice(0, 3).map((skill, index) => (
                <Badge
                  key={index}
                  variant="light"
                  size="sm"
                  leftSection={<IconArrowsUpDown size={12} />}
                >
                  {skill.name}
                  {skill.level && (
                    <Text span size="xs" c="dimmed" ml={4}>
                      L{skill.level}
                    </Text>
                  )}
                </Badge>
              ))}
              {(matchedSkills?.length || 0) > 3 && (
                <Badge variant="light" size="sm" color="gray">
                  +{(matchedSkills?.length || 0) - 3} more
                </Badge>
              )}
            </Group>
          </Conditional>
        </div>
      </Conditional>

      <Card.Section className={classes.content}>
        <Group gap="md" mb="md" align="flex-start">
          <DisplayAvatar
            url={user?.profile_img || defaultProfile}
            size="xl"
            radius="3rem"
            name={user?.firstName!}
          />
          <Stack gap="xs" style={{ flex: 1 }}>
            <Title order={3} size="lg" className={classes.name}>
              {user?.firstName} {user?.lastName}
            </Title>

            <Group gap="xs">
              <Group gap={2}>
                <Ratings rating={user?.averageRating || 0} />
              </Group>
              <Text size="sm" c="dimmed">
                ({user?.averageRating?.toFixed(1) || "0.0"})
              </Text>
            </Group>

            <Conditional condition={Boolean(user?.bio!)}>
              <Text size="sm" c="dimmed" lineClamp={2}>
                {user?.bio}
              </Text>
            </Conditional>
          </Stack>
        </Group>

        <Stack gap="xs" mb="md">
          <Text size="sm" fw={600} c="green">
            Offering:
          </Text>
          <Group gap="xs">
            {user?.skillsProficientAt?.slice(0, 3).map((skill, i) => (
              <Badge
                key={i}
                variant="outline"
                size="sm"
                color="green"
                className={classes.skillBadge}
              >
                {skill?.name}
                {skill?.level && (
                  <Text span size="xs" c="dimmed" ml={4}>
                    L{skill.level}
                  </Text>
                )}
              </Badge>
            ))}
            {(user?.skillsProficientAt?.length || 0) > 3 && (
              <Badge variant="light" size="sm" color="gray">
                +{(user?.skillsProficientAt?.length || 0) - 3} more
              </Badge>
            )}
          </Group>
        </Stack>

        <Stack gap="xs" mb="md">
          <Text size="sm" fw={600} c="blue">
            Seeking:
          </Text>
          <Group gap="xs">
            {user?.skillsToLearn?.slice(0, 3).map((skill, i) => (
              <Badge
                key={i}
                variant="outline"
                size="sm"
                color="blue"
                className={classes.skillBadge}
              >
                {skill?.name}
                <Conditional condition={Boolean(skill?.level)}>
                  <Text span size="xs" c="dimmed" ml={4}>
                    →L{skill?.level}
                  </Text>
                </Conditional>
              </Badge>
            ))}
            {(user?.skillsToLearn?.length || 0) > 3 && (
              <Badge variant="light" size="sm" color="gray">
                +{(user?.skillsToLearn?.length || 0) - 3} more
              </Badge>
            )}
          </Group>
        </Stack>

        {/* <Conditional
          condition={Boolean(
            user?.gitHub! || user?.linkedIn! || user?.portfolio!
          )}
        >
          <Group gap="xs" mb="md">
            <Conditional condition={Boolean(user?.gitHub!)}>
              <ActionIcon variant="subtle" size="sm" color="gray">
                <IconBrandGithub size={16} />
              </ActionIcon>
            </Conditional>

            <Conditional condition={Boolean(user?.linkedIn!)}>
              <ActionIcon variant="subtle" size="sm" color="blue">
                <IconBrandLinkedin size={16} />
              </ActionIcon>
            </Conditional>
            <Conditional condition={Boolean(user?.portfolio!)}>
              <ActionIcon variant="subtle" size="sm" color="gray">
                <IconWorld size={16} />
              </ActionIcon>
            </Conditional>
          </Group>
        </Conditional> */}

        <Conditional condition={matchScore > 0}>
          <Stack gap="xs" mb="md">
            <Group justify="space-between">
              <Text size="xs" c="dimmed">
                Compatibility
              </Text>
              <Text size="xs" c="dimmed">
                {calculateMatchScore(matchScore)}%
              </Text>
            </Group>
            <Progress
              value={Math.floor(matchScore * 100)}
              color={getMatchScoreColor(calculateMatchScore(matchScore))}
              size="sm"
              radius="xl"
            />
          </Stack>
        </Conditional>

        <Group gap="xs">
          {/* <Button
            onClick={onConnect}
            style={{ flex: 1 }}
            size="sm"
            variant="filled"
            radius="xl"
          >
            Swap
          </Button> */}
          <Button
            onClick={navigateToUserDetails}
            style={{ flex: 1 }}
            size="sm"
            variant="outline"
            radius="xl"
            leftSection={<IconExternalLink size={16} />}
          >
            View Profile
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
};
