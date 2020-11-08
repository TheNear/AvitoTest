import { IFullImage, IThumbnails } from "../../types/data";
import { BASE_URL } from "./constants";

export const get = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  return response.json();
};

export const getThumbnailsData = async (): Promise<IThumbnails[]> => get(`${BASE_URL}images`);
export const getFullImgData = async (id: number): Promise<IFullImage> => {
  return get(`${BASE_URL}images/${id}`);
};
