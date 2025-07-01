import { Card, Image, Text, Group, Badge, Avatar, ActionIcon, Tooltip } from "@mantine/core";
import { IconHeart, IconShare, IconMessage, IconCheck, IconX } from "@tabler/icons-react";
import { User } from "src/interfaces";

interface SwapTileProps {
    user?: User;
    likes: number;
    shares: number;
    status: boolean;
    comments: number;
    imagePath: string;
    experience: number;
}

const SwapTile: React.FC<SwapTileProps> = ({
    user,
    likes,
    shares,
    status,
    comments,
    imagePath,
    experience,
}) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image src={imagePath} height={180} alt="Swap image" />
            </Card.Section>

            <Group gap="apart" mt="md" mb="xs">
                <Group>
                    {user && (
                        <Avatar src={user.profile_img} radius="xl" size="md" alt={user?.firstName || "Unknown"} />
                    )}
                    <div>
                        <Text fw={500}>{user?.lastName || "Anonymous"}</Text>
                        <Text size="xs" color="dimmed">
                            {experience} years experience
                        </Text>
                    </div>
                </Group>
                <Badge color={status ? "green" : "red"} variant="light">
                    {status ? (
                        <Group gap={4}><IconCheck size={14} />Active</Group>
                    ) : (
                        <Group gap={4}><IconX size={14} />Inactive</Group>
                    )}
                </Badge>
            </Group>

            <Group mt="md" gap="xs">
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
        </Card>
    );
};

export default SwapTile;