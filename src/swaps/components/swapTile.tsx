import { User } from "src/interfaces";

import { Gasture } from "src/components/animation/gasture";
import defaultProfiile from "../../assets/images/defualt-profile.avif";
import { Card, Text, Group, Badge, Image, Stack, Box, Button } from "@mantine/core";

type SwapStatus = "completed" | "in-progress" | "starts-in" | "pending";

interface SwapTileProps {
    user?: User;
    sentSwaps: boolean;
    swapStatus: SwapStatus;
}

const statusBadgeMap: Record<SwapStatus, { color: string; label: string }> = {
    "completed": { color: "green", label: "Completed" },
    "in-progress": { color: "yellow", label: "In-progress" },
    "starts-in": { color: "blue", label: "Starts in" },
    "pending": { color: "gray", label: "Pending" },
};

const SwapTile: React.FC<SwapTileProps> = ({
    user,
    sentSwaps,
    swapStatus = "in-progress",
}) => {
    return (
        <Gasture>
            <Card shadow="sm" padding="md" radius="md" withBorder style={{ overflow: "hidden" }}>
                <Group align="stretch" gap={0} style={{ height: "100%" }}>
                    <Box style={{ height: "100%", minWidth: 120, maxWidth: 140, flex: "0 0 120px" }}>
                        <Image
                            src={defaultProfiile}
                            alt="Profile"
                            height="100%"
                            width="40%"
                            radius="md 0 0 md"
                        />
                    </Box>
                    <Stack gap={8} style={{ flex: 1, paddingLeft: 20, justifyContent: "center" }}>
                        <Group justify="space-between" align="center">
                            <div>
                                <Text fw={500}>
                                    {(user?.firstName || "") + (user?.lastName ? ` ${user.lastName}` : "") || "Anonymous"}
                                </Text>
                            </div>
                        </Group>
                        <Group gap="xs" mt="md">
                            <Badge color={statusBadgeMap[swapStatus].color} variant="light">
                                {statusBadgeMap[swapStatus].label}
                            </Badge>
                        </Group>
                        {sentSwaps ? (
                                    <Button fullWidth variant="light" color="red" radius="md" mt="md">
                                        Cancel Swap
                                    </Button>
                                ) : (
                                    <Stack gap="xs" mt="md">
                                        <Button fullWidth variant="light" color="lime" radius="md">
                                            A C C E P T
                                        </Button>
                                        <Button fullWidth variant="light" color="red" radius="md">
                                            R E J E C T
                                        </Button>
                                    </Stack>
                                )
                            }
                    </Stack>
                </Group>
            </Card>
        </Gasture>
    );
};

export default SwapTile;