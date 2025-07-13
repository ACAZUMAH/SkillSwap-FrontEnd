import SwapTile from "./swapTile";
import { Paper, SimpleGrid, Space } from "@mantine/core";

export const receivedSwaps = () => {
    return (
        <>
            <Space h="md"/>
            <Paper p="md">
                <SimpleGrid cols={3} spacing="lg">
                    {[4, 5, 6].map((i) => (
                        <SwapTile
                            key={i}
                            user={{
                                firstName: "Jane",
                                lastName: "Smith",
                                profile_img: "https://via.placeholder.com/150",
                                createdAt: new Date().toISOString(),
                                id: `${i}`,
                                averageRating: 4.0,
                                phoneNumber: "",
                                updatedAt: null
                            }}
                            likes={15 * i}
                            shares={7 * i}
                            status={i % 2 === 0}
                            comments={3 * i}
                            experience={2 + i}
                            sentSwaps={false}
                        />
                    ))}
                </SimpleGrid>
            </Paper>
        </>
    )
}
