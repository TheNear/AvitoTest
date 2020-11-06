export const parseDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};
