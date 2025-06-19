import {
  Badge,
  Box,
  Card,
  Image,
  Rating,
  Title,
} from "@mantine/core";
import React from "react";
import { User } from "src/interfaces";
import classes from "./styles/index.module.css";
import defaultProfiile from "../../assets/images/defualt-profile.avif";
import { Gasture } from "../animation/gasture";

interface UserCardProps {
  user?: User;
  matchedSkill?: string;
  matchScore?: number;
  levelDifference?: number;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <>
      <Gasture>
        <Card shadow="md" radius="lg" withBorder p={0} className={classes.card}>
          <Image
            src={user?.profile_img || defaultProfiile}
            className={classes.image}
          />
          <div className={classes.body}>
            <Title order={2} className={classes.title}>
              {user?.firstName} {user?.lastName}
            </Title>

            <Box mt="xs">
              {user?.skillsProficientAt?.slice(0, 3).map((s, i) => (
                <Badge key={i} size="sm" variant="light" mr="xs">
                  {s?.name}
                </Badge>
              ))}
            </Box>

            <Rating size="sm" readOnly value={user?.averageRating!} mt="xs" />
          </div>
        </Card>
      </Gasture>
    </>
  );
};

// export const UserCard: React.FC<UserCardProps> = ({ user }) => {
//   return (
//     <>
//       <Gasture>
//         <Card
//           className={classes.Card}
//           shadow="md"
//           radius="md"
//           withBorder
//           p={0}
//           h={350}
//         >
//           <Card.Section>
//             <Image
//               src={user?.profile_img || defaultProfiile}
//               alt={`${user?.firstName} ${user?.lastName}`}
//               height={200}
//               fit="cover"
//             />
//           </Card.Section>
//           <Group justify="space-between" align="center" mx="xs">
//             <Title order={2} >
//               {user?.firstName} {user?.lastName}
//             </Title>
//             <Rating size="xs" value={user?.averageRating!} />
//           </Group>
//           <div className={classes.body}>
//             <Box>
//               <Text>Offering:</Text>
//               <Group>
//                 {user?.skillsProficientAt?.slice(0, 4).map((skill, index) => (
//                   <Badge key={index} size="sm" variant="light">
//                     {skill?.name}
//                   </Badge>
//                 ))}
//               </Group>
//             </Box>
//             <Box>
//               <Text>For:</Text>
//               <Group>
//                 {user?.skillsToLearn?.slice(0, 4).map((skill, index) => (
//                   <Badge key={index} size="sm" variant="light">
//                     {skill?.name}
//                   </Badge>
//                 ))}
//               </Group>
//             </Box>
//           </div>
//         </Card>
//       </Gasture>
//     </>
//   );
// };
