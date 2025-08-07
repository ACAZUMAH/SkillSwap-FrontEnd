import React from "react";
import { Conditional } from "src/components";

interface DayContentProps {
  date: string;
  hasAnyClass?: boolean;
}

export const DayContent: React.FC<DayContentProps> = ({
  date,
  hasAnyClass,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span>{new Date(date).getDate()}</span>
      <Conditional condition={hasAnyClass!}>
        <span
          style={{
            marginTop: 2,
            display: "block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "var(--mantine-color-blue-6)",
          }}
        />
      </Conditional>
    </div>
  );
};
