import { IconStar } from "@tabler/icons-react";
import React from "react";

interface RatingsProps {
  rating: number;
}
export const Ratings: React.FC<RatingsProps> = ({ rating }) => {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <IconStar
          key={i}
          size={16}
          style={{
            fill: i < Math.floor(rating) ? "#ffd43b" : "transparent",
            color: i < Math.floor(rating) ? "#ffd43b" : "#ced4da",
          }}
        />
      ))}
    </>
  );
};
