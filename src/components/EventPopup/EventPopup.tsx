import React, { Component, ReactNode } from "react";
import { createPortal } from "react-dom";
import { POPUP_LIFETIME, POPUP_UNMOUNT_DELAY } from "../../assets/js/constants";
import style from "./EventPopup.module.css";

const modalRoot = document.getElementById("popup") as HTMLElement;

export type PopupType = "error" | "warn" | "success";

export interface EventPopupProps {
  content: string;
  clear: () => void;
  lifetime?: number;
  popupType?: PopupType;
}

export interface EventPopupState {
  show: boolean;
}

class EventPopup extends Component<EventPopupProps, EventPopupState> {
  constructor(props: EventPopupProps) {
    super(props);
    this.state = {
      show: true,
    };
  }

  componentDidMount = (): void => {
    setTimeout(() => {
      this.setState({ show: false });
      setTimeout(() => {
        this.props.clear();
      }, POPUP_UNMOUNT_DELAY);
    }, this.props.lifetime || POPUP_LIFETIME);
  };

  render(): ReactNode {
    const { content, popupType } = this.props;
    const { show } = this.state;

    return createPortal(
      <div
        className={`${style.wrapper} ${show ? style.show : style.hidden} ${
          popupType && style[popupType]
        }`}>
        {content}
      </div>,
      modalRoot
    );
  }
}

export { EventPopup };
