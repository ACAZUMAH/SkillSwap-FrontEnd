export const getLevelDifferenceText = (diff: number) => {
  if (diff === 0) return "Same level";
  if (diff > 0) return `${diff} level${diff > 1 ? "s" : ""} above`;
  return `${Math.abs(diff)} level${Math.abs(diff) > 1 ? "s" : ""} below`;
};

export const calculateMatchScore = (score: number) => {
  return Math.round(score * 100);
};

export const getMatchScoreColor = (score: number) => {
  if (score >= 80) return "green";
  if (score >= 60) return "yellow";
  return "red";
};
