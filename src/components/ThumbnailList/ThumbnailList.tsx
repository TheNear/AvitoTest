import React from "react";
import { IThumbnails } from "../../types/data";
import { Thumbnail } from "../Thumbnail/Thumbnail";
import style from "./ThumbnailList.module.css";

interface ThumbnailListProps {
  data: IThumbnails[];
  clickHandler: (id: number) => void;
}

const ThumbnailList: React.FC<ThumbnailListProps> = ({ data, clickHandler }) => {
  return (
    <main className={style.thumbnails}>
      {data.map((thumbnail: IThumbnails) => (
        <Thumbnail key={thumbnail.id} data={thumbnail} clickHandler={clickHandler} />
      ))}
    </main>
  );
};

export { ThumbnailList };
