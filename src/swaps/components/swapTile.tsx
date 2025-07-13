import { User } from "src/interfaces";
import { IconHeart, IconShare, IconMessage, IconCheck, IconX } from "@tabler/icons-react";
import { Card, Text, Group, Badge, Avatar, ActionIcon, Center, Tooltip, Stack, Box, Space } from "@mantine/core";

type SwapStatus = "completed" | "in-progress" | "starts-in";

interface SwapTileProps {
    user?: User;
    likes: number;
    shares: number;
    status: boolean;
    comments: number;
    experience: number;
    swapStatus?: SwapStatus; // New prop for status
}
// Showing a Demo of the swaps
const statusBadgeMap: Record<SwapStatus, { color: string; label: string }> = {
    "completed": { color: "green", label: "Completed" },
    "in-progress": { color: "yellow", label: "In-progress" },
    "starts-in": { color: "blue", label: "Starts in" },
};

const SwapTile: React.FC<SwapTileProps> = ({
    user,
    likes,
    shares,
    status,
    comments,
    experience,
    swapStatus = "in-progress", // Default value
}) => {
    return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
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
                <Space w="md" />
                <Stack gap={8} style={{ flex: 1 }}>
                    <Group justify="space-between" align="center">
                        <div>
                            <Text fw={500}>{user?.lastName || "Anonymous"}</Text>
                            <Text size="xs">
                                {experience} years experience
                            </Text>
                        </div>
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
                        <Space h="lg" />
                    </Group>
                    <Group gap="xs" mt="md">
                        <Badge color={status ? "green" : "red"} variant="light">
                            {status ? (
                                <Group gap={4}><IconCheck size={14} />Swap</Group>
                            ) : (
                                <Group gap={4}><IconX size={14} />Un-swap</Group>
                            )}
                        </Badge>
                        <Badge color={statusBadgeMap[swapStatus].color} variant="light">
                            {statusBadgeMap[swapStatus].label}
                        </Badge>
                    </Group>
                </Stack>
            </Group>
        </Card>
    );
};

export default SwapTile;