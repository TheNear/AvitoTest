import { IComment, ICommentPost } from "../../types/data";

export const parseDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

export const generateComments = (data: ICommentPost): IComment => {
  const timestamp = Date.now();

  return {
    text: data.comment,
    date: timestamp,
    id: timestamp,
  };
};
