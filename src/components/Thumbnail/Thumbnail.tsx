import React, { MouseEvent } from "react";
import { IThumbnails } from "../../types/data";
import style from "./Thumbnail.module.css";

interface ThumbnailProps {
  data: IThumbnails;
  clickHandler: (id: number) => void;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ data, clickHandler }) => {
  const onButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    clickHandler(data.id);
  };

  return (
    <button onClick={onButtonClick} key={data.id} type="button" className={style.button}>
      <img className={style.image} src={data.url} alt="thumbnail" />
    </button>
  );
};

export { Thumbnail };
