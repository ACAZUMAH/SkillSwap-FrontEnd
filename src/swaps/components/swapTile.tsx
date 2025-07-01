import { User } from "src/interfaces";
import { IconHeart, IconShare, IconMessage, IconCheck, IconX } from "@tabler/icons-react";
import { Card, Text, Group, Badge, Avatar, ActionIcon, Center, Tooltip, Stack, Box } from "@mantine/core";

interface SwapTileProps {
    user?: User;
    likes: number;
    shares: number;
    status: boolean;
    comments: number;
    experience: number;
}

const SwapTile: React.FC<SwapTileProps> = ({
    user,
    likes,
    shares,
    status,
    comments,
    experience,
}) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group align="flex-start" gap="md">
                {/* Profile image as rounded box */}
                <Center>
                    <Box>
                        <Avatar
                            src={user?.profile_img}
                            radius={16}
                            size={100}
                            alt={user?.firstName || "Unknown"}
                            styles={{
                                root: { borderRadius: 16, width: 100, height: 100, objectFit: "cover" }
                            }}
                        />
                    </Box>
                </Center>
                {/* All other info in a column */}
                <Stack gap={8} style={{ flex: 1 }}>
                    <Group justify="space-between" align="center">
                        <div>
                            <Text fw={500}>{user?.lastName || "Anonymous"}</Text>
                            <Text size="xs">
                                {experience} years experience
                            </Text>
                        </div>
                        <Badge color={status ? "green" : "red"} variant="light">
                            {status ? (
                                <Group gap={4}><IconCheck size={14} />Swap</Group>
                            ) : (
                                <Group gap={4}><IconX size={14} />Un-swap</Group>
                            )}
                        </Badge>
                    </Group>
                    <Group mt="xs" gap="xs">
                        <Tooltip label="Likes">
                            <ActionIcon variant="light" color="red">
                                <IconHeart size={18} />
                            </ActionIcon>
                        </Tooltip>
                        <Text size="sm">{likes}</Text>

                        <Tooltip label="Shares">
                            <ActionIcon variant="light" color="blue">
                                <IconShare size={18} />
                            </ActionIcon>
                        </Tooltip>
                        <Text size="sm">{shares}</Text>

                        <Tooltip label="Comments">
                            <ActionIcon variant="light" color="teal">
                                <IconMessage size={18} />
                            </ActionIcon>
                        </Tooltip>
                        <Text size="sm">{comments}</Text>
                    </Group>
                </Stack>
            </Group>
        </Card>
    );
};

export default SwapTile;