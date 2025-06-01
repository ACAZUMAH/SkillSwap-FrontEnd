import React from "react";

interface Props {
  condition: boolean;
  children?: React.ReactNode;
}

export const Conditional: React.FC<Props> = ({ condition, children }) => {
  if (!condition) return null;

  return <>{children}</>;
};
