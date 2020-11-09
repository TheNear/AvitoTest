import React from "react";
import style from "./CommentForm.module.css";

export interface CommentFormProps {
  name: string;
  comment: string;
  submitHandler: (evt: React.FormEvent<HTMLFormElement>) => void;
  changeInputHandler: (evt: React.FormEvent<HTMLInputElement>) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  name,
  comment,
  changeInputHandler,
  submitHandler,
}) => {
  return (
    <form action="push" className={style.form} onSubmit={submitHandler}>
      <input
        autoFocus
        type="text"
        name="name"
        id="comment-form-author"
        required
        minLength={3}
        maxLength={25}
        value={name}
        onChange={changeInputHandler}
        placeholder="Ваше имя"
        className={style.input}
      />
      <input
        type="text"
        name="comment"
        required
        minLength={3}
        maxLength={300}
        value={comment}
        id="comment-form-content"
        placeholder="Ваш комментарий"
        onChange={changeInputHandler}
        className={style.input}
      />
      <button className={style.button} type="submit">
        Оставить комментарий
      </button>
    </form>
  );
};

export { CommentForm };
