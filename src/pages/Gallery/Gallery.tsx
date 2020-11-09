import React, { Component, ReactNode } from "react";
import { getFullImgData, getThumbnailsData } from "../../assets/js/api";
import { Modal } from "../../components/Modal/Modal";
import { ThumbnailList } from "../../components/ThumbnailList/ThumbnailList";
import { IFullImage, IThumbnails } from "../../types/data";

// export interface GalleryProps {}

export interface GalleryState {
  data: IThumbnails[];
  openedImage: IFullImage | null;
  // error: string;
}

class Gallery extends Component<unknown, GalleryState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      data: [],
      openedImage: null,
      // error: "",
    };
  }

  loadData = async (): Promise<void> => {
    try {
      const data = await getThumbnailsData();
      this.setState({ data });
    } catch (error) {
      // this.setState({ error: error.message });
    }
  };

  componentDidMount = (): void => {
    this.loadData();
  };

  onThumbnailClick = (id: number): void => {
    this.showImage(id);
  };

  onCloseButtonClick = (): void => {
    this.setState({
      openedImage: null,
    });
  };

  showImage = async (id: number): Promise<void> => {
    try {
      const data = await getFullImgData(id);
      this.setState({ openedImage: data });
    } catch (error) {
      // this.setState({ error: error.message });
    }
  };

  render(): ReactNode {
    const { openedImage, data } = this.state;

    return (
      <>
        <ThumbnailList data={data} clickHandler={this.onThumbnailClick} />
        {openedImage && <Modal data={openedImage} closeModalHandler={this.onCloseButtonClick} />}
      </>
    );
  }
}

export { Gallery };
