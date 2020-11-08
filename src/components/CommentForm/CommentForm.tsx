import React from "react";
import style from "./CommentForm.module.css";

const CommentForm: React.FC = () => {
  return (
    <form action="push" className={style.form}>
      <input
        autoFocus
        type="text"
        name="name"
        id=""
        placeholder="Ваше имя"
        className={style.input}
      />
      <input
        type="text"
        name="content"
        id=""
        placeholder="Ваш комментарий"
        className={style.input}
      />
      <button className={style.button} type="submit">
        Оставить комментарий
      </button>
    </form>
  );
};

export { CommentForm };
