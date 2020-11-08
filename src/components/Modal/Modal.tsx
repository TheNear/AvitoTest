import React, { Component, ReactNode } from "react";
import style from "./Modal.module.css";
import { IFullImage } from "../../types/data";
import { CommentForm } from "../CommentForm/CommentForm";
import { Comments } from "../Comments/Comments";

export interface ModalProps {
  data: IFullImage;
  closeModalHandler: () => void;
}

// export interface ModalStatModale {}

class Modal extends Component<ModalProps, unknown> {
  constructor(props: ModalProps) {
    super(props);
    this.state = {};
  }

  pressEscHandler = ({ key }: KeyboardEvent): void => {
    if (key === "Escape") {
      this.props.closeModalHandler();
    }
  };

  componentDidMount = (): void => {
    window.addEventListener("keydown", this.pressEscHandler);
  };

  componentWillUnmount = (): void => {
    window.removeEventListener("keydown", this.pressEscHandler);
  };

  render(): ReactNode {
    const { data, closeModalHandler } = this.props;

    return (
      <div className={style.background}>
        <div className={style.container}>
          <img className={style.image} src={data.url} alt="fullsize" />
          <Comments data={data.comments} />
          <CommentForm />
          <button onClick={closeModalHandler} type="button" className={style.button}>
            Закрыть окно
          </button>
        </div>
      </div>
    );
  }
}

export { Modal };
