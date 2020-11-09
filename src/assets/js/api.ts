import { ICommentPost, IFullImage, IThumbnails } from "../../types/data";
import { BASE_URL } from "./constants";

export const get = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

export const post = async (url: string, body: string): Promise<void> => {
  const fetchOption: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body,
  };
  const response = await fetch(url, fetchOption);
  if (!response.ok) {
    throw Error(response.statusText);
  }
};

export const getThumbnailsData = async (): Promise<IThumbnails[]> => get(`${BASE_URL}images`);
export const getFullImgData = async (id: number): Promise<IFullImage> => {
  return get(`${BASE_URL}images/${id}`);
};

export const postComment = async (id: number, data: ICommentPost): Promise<void> => {
  const postUrl = `${BASE_URL}images/${id}/comments`;
  const jsonData = JSON.stringify(data);
  await post(postUrl, jsonData);
};
