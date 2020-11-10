import React, { Component, ReactNode } from "react";
import style from "./Modal.module.css";
import { ICommentPost, IFullImage } from "../../types/data";
import { CommentForm } from "../CommentForm/CommentForm";
import { Comments } from "../Comments/Comments";
import { getFullImgData, postComment } from "../../assets/js/api";
import { generateComments } from "../../assets/js/helpers";
import { EventPopup } from "../EventPopup/EventPopup";

export interface ModalProps {
  id: number;
  closeModalHandler: () => void;
}

export interface ModalState {
  data: IFullImage | null;
  form: ICommentPost;
  error: string;
}

class Modal extends Component<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);
    this.state = {
      error: "",
      data: null,
      form: {
        name: "",
        comment: "",
      },
    };
  }

  clearErrors = (): void => {
    this.setState({ error: "" });
  };

  getImageData = async (): Promise<void> => {
    try {
      const data = await getFullImgData(this.props.id);
      this.setState((prevState) => ({
        ...prevState,
        data,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  changeInputHandler = ({ currentTarget }: React.FormEvent<HTMLInputElement>): void => {
    const { value, name } = currentTarget;
    this.setState(
      (prevState) =>
        ({
          form: {
            ...prevState.form,
            [name]: value,
          } as { [T in keyof ICommentPost]: ICommentPost[T] },
        } as ModalState)
    );
  };

  submitHandler = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();
    try {
      const postID = this.props.id;
      const newComment = generateComments(this.state.form);
      await postComment(postID, this.state.form);
      this.setState((prevState) => {
        if (prevState.data) {
          return {
            ...prevState,
            data: { ...prevState.data, comments: [...prevState.data.comments, newComment] },
            form: { name: "", comment: "" },
          };
        }

        return prevState;
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  pressEscHandler = (evt: KeyboardEvent): void => {
    if (evt.key === "Escape") {
      this.props.closeModalHandler();
    }
  };

  componentDidMount = (): void => {
    this.getImageData();
    window.addEventListener("keydown", this.pressEscHandler);
  };

  componentWillUnmount = (): void => {
    window.removeEventListener("keydown", this.pressEscHandler);
  };

  render(): ReactNode {
    const { closeModalHandler } = this.props;
    const { data, form, error } = this.state;
    const { name, comment } = form;

    return (
      <div className={style.background}>
        {error && <EventPopup content={error} clear={this.clearErrors} popupType="error" />}
        {data ? (
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
        ) : (
          <div className={style.container}>Loading...</div>
        )}
      </div>
    );
  }
}

export { Modal };
