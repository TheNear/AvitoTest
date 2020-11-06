import React, { Component, ReactNode } from "react";
import { Modal } from "../../components/Modal/Modal";
import { ThumbnailList } from "../../components/ThumbnailList/ThumbnailList";
import { IFullImage, IThumbnails } from "../../types/data";

// export interface GalleryProps {}

export interface GalleryState {
  thumbnailsData: IThumbnails[];
  openedImage: IFullImage | null;
}

class Gallery extends Component<unknown, GalleryState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      thumbnailsData: [],
      openedImage: null,
    };

    this.showImage = this.showImage.bind(this);
    this.onThumbnailClick = this.onThumbnailClick.bind(this);
    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
  }

  componentDidMount(): void {
    fetch("https://boiling-refuge-66454.herokuapp.com/images")
      .then((res) => res.json())
      .then((thumnails: IThumbnails[]) => {
        this.setState({
          thumbnailsData: thumnails,
        });
      });
  }

  onThumbnailClick(id: number): void {
    this.showImage(id);
  }

  onCloseButtonClick(): void {
    this.setState({
      openedImage: null,
    });
  }

  showImage(id: number): void {
    fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}`)
      .then((res) => res.json())
      .then((image: IFullImage) => {
        this.setState({
          openedImage: image,
        });
      });
  }

  render(): ReactNode {
    const { openedImage, thumbnailsData } = this.state;

    return (
      <>
        <ThumbnailList data={thumbnailsData} clickHandler={this.onThumbnailClick} />
        {openedImage && <Modal data={openedImage} closeModalHandler={this.onCloseButtonClick} />}
      </>
    );
  }
}

export { Gallery };
