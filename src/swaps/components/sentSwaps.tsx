import SwapTile from "./swapTile";
import { Paper, SimpleGrid, Space } from "@mantine/core";

const dummySwaps = [
	{
		user: {
			firstName: "John",
			lastName: "Doe",
            // TODO: @ACAZUMAH
			profile_img: "Placeholder text",
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
            // TODO: @ACAZUMAH
			profile_img: "Placeholder text",
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
            // TODO: @ACAZUMAH
			profile_img: "Placeholder text",
			createdAt: new Date().toISOString(),
			id: "3",
			averageRating: 4.2,
			phoneNumber: "",
			updatedAt: null,
		},
		swapStatus: "completed",
	},
];

// Trying to replicate what the actual page would look like when it fetches and displays
// data from the backend.
export const sentSwaps = () => {
	return (
		<>
			<Space h="md" />
			<Paper p="md">
				<SimpleGrid cols={3} spacing="lg">
					{dummySwaps.map((props, i) => (
						<SwapTile key={i}
                            user={props.user}
                            sentSwaps={true}
                            // @ts-ignore
                            swapStatus={props.swapStatus}
                        />
					))}
				</SimpleGrid>
			</Paper>
		</>
	);
};