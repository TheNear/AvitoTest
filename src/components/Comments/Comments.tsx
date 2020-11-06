import React from "react";
import { parseDate } from "../../assets/js/helpers";
import { IComment } from "../../types/data";
import style from "./Comments.module.css";

export interface CommentsProps {
  data: IComment[];
}

const Comments: React.FC<CommentsProps> = ({ data }) => {
  return (
    <div className={style.list}>
      {data.map((comment) => (
        <div key={comment.id} className={style.wrapper}>
          <p className={style.date}>{parseDate(comment.date)}</p>
          <p className={style.text}>{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export { Comments };
