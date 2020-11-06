import React from "react";
import { IThumbnails } from "../../types/data";
import style from "./Thumbnail.module.css";

interface ThumbnailProps {
  data: IThumbnails;
  clickHandler: (id: number) => void;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ data, clickHandler }) => {
  return (
    <button
      onClick={() => {
        clickHandler(data.id);
      }}
      key={data.id}
      type="button"
      className={style.button}>
      <img className={style.image} src={data.url} alt="thumbnail" />
    </button>
  );
};

export { Thumbnail };
