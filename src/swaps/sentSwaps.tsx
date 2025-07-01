import SwapTile from "./components/swapTile";
import { Paper, SimpleGrid, Space } from "@mantine/core";

// Trying to replicate what the actual page would look like when it fetches and displays
// data from the backend.
export const sentSwaps = () => {
    return (
        <>
            <Space h="md" />
            <Paper>
                <SimpleGrid cols={3} spacing="lg">
                    {[1, 2, 3].map((i) => (
                        <SwapTile
                            key={i}
                            user={{
                                firstName: "John",
                                lastName: "Doe",
                                profile_img: "https://via.placeholder.com/150",
                                createdAt: new Date().toISOString(),
                                id: `${i}`,
                                averageRating: 4.5,
                                phoneNumber: "",
                                updatedAt: null
                            }}
                            likes={10 * i}
                            shares={5 * i}
                            status={i % 2 === 0}
                            comments={2 * i}
                            experience={3 + i}
                        />
                    ))}
                </SimpleGrid>
            </Paper>
        </>
    )
}