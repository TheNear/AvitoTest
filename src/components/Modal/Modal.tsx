import React, { Component, ReactNode } from "react";
import style from "./Modal.module.css";
import { ICommpentPost, IFullImage } from "../../types/data";
import { CommentForm } from "../CommentForm/CommentForm";
import { Comments } from "../Comments/Comments";
import { postComment } from "../../assets/js/api";

export interface ModalProps {
  data: IFullImage;
  closeModalHandler: () => void;
}

export interface ModalState {
  form: ICommpentPost;
}

class Modal extends Component<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);
    this.state = {
      form: {
        name: "",
        comment: "",
      },
    };
  }

  changeInputHandler = ({ currentTarget }: React.FormEvent<HTMLInputElement>): void => {
    const { value, name } = currentTarget;
    this.setState(
      (prevState) =>
        ({
          form: {
            ...prevState.form,
            [name]: value,
          } as { [T in keyof ICommpentPost]: ICommpentPost[T] },
        } as ModalState)
    );
  };

  submitHandler = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();
    try {
      const postID = this.props.data.id;
      await postComment(postID, this.state.form);
      this.setState({ form: { name: "", comment: "" } });
    } catch (error) {
      // console.log(error.message);
    }
  };

  pressEscHandler = (evt: KeyboardEvent): void => {
    if (evt.key === "Escape") {
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
    const { name, comment } = this.state.form;

    return (
      <div className={style.background}>
        <div className={style.container}>
          <img className={style.image} src={data.url} alt="fullsize" />
          <Comments data={data.comments} />
          <CommentForm
            name={name}
            comment={comment}
            submitHandler={this.submitHandler}
            changeInputHandler={this.changeInputHandler}
          />
          <button onClick={closeModalHandler} type="button" className={style.button}>
            Закрыть окно
          </button>
        </div>
      </div>
    );
  }
}

export { Modal };
