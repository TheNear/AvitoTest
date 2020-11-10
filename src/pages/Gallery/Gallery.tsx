import React, { Component, ReactNode } from "react";
import { getThumbnailsData } from "../../assets/js/api";
import { EventPopup } from "../../components/EventPopup/EventPopup";
import { Loader } from "../../components/Loader/Loader";
import { Modal } from "../../components/Modal/Modal";
import { ThumbnailList } from "../../components/ThumbnailList/ThumbnailList";
import { IThumbnails } from "../../types/data";

export interface GalleryState {
  data: IThumbnails[];
  openedImageID: number | null;
  isLoading: boolean;
  error: string;
}

class Gallery extends Component<unknown, GalleryState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      openedImageID: null,
      error: "",
    };
  }

  clearErrors = (): void => {
    this.setState({ error: "" });
  };

  loadData = async (): Promise<void> => {
    try {
      await this.setState({ isLoading: true });
      const data = await getThumbnailsData();
      this.setState({ data });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount = (): void => {
    this.loadData();
  };

  onThumbnailClick = (id: number): void => {
    this.setState({ openedImageID: id });
  };

  onCloseButtonClick = (): void => {
    this.setState({
      openedImageID: null,
    });
  };

  render(): ReactNode {
    const { openedImageID, data, isLoading, error } = this.state;

    return (
      <>
        {error && <EventPopup content={error} clear={this.clearErrors} popupType="error" />}
        {!isLoading ? (
          <ThumbnailList data={data} clickHandler={this.onThumbnailClick} />
        ) : (
          <Loader />
        )}
        {openedImageID && <Modal id={openedImageID} closeModalHandler={this.onCloseButtonClick} />}
      </>
    );
  }
}

export { Gallery };
