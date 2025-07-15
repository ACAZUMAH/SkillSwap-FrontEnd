import SwapTile from "./swapTile";
import { Paper, SimpleGrid, Space } from "@mantine/core";


const dummySwaps = [
    {
        user: {
            firstName: "John",
            lastName: "Doe",
            // TODO: insert profile picture here @ACAZUMAH
            profile_img: "Some placeholder image",
            createdAt: new Date().toISOString(),
            id: "1",
            averageRating: 4.5,
            phoneNumber: "",
            updatedAt: null,
        },
        swapStatus: "pending",
    },
    {
        user: {
            firstName: "Jane",
            lastName: "Smith",
            // TODO: insert profile picture here @ACAZUMAH
            profile_img: "Some placeholder image",
            createdAt: new Date().toISOString(),
            id: "2",
            averageRating: 4.8,
            phoneNumber: "",
            updatedAt: null,
        },
        swapStatus: "in-progress",
    },
    {
        user: {
            firstName: "Alice",
            lastName: "Johnson",
            // TODO: insert profile picture here @ACAZUMAH
            profile_img: "Some placeholder image",
            createdAt: new Date().toISOString(),
            id: "3",
            averageRating: 4.2,
            phoneNumber: "",
            updatedAt: null,
        },
        swapStatus: "completed",
    },
];

export const receivedSwaps = () => {
    return (
        <>
            <Space h="md"/>
            <Paper p="md">
                <SimpleGrid cols={3} spacing="lg">
                    {dummySwaps.map((straw, i) => (
						<SwapTile key={i}
                            user={straw.user}
                            sentSwaps={false}
                            // @ts-ignore
                            swapStatus={straw.swapStatus}
                        />
					))}
                </SimpleGrid>
            </Paper>
        </>
    )
}
