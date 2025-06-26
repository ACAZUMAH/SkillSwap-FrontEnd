import { User } from "src/interfaces"

interface SwapTileProps {
    user?: User;
    likes: number
    shares: number;
    status: boolean;
    comments: number;
    imagePath: string;
    experience: number;
}

const swapTile:React.FC<SwapTileProps> = () => {
    return (
        <div>swapTile</div>
    )
}

export default swapTile