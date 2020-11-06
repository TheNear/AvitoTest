import React, { ReactNode } from "react";
import "./App.css";

// type AppProps = {
//   // images: [];
// };

interface IComment {
  id: number;
  text: string;
  date: number;
}

interface IFullImage {
  id: number;
  url: string;
  comments: IComment[];
}

interface IThumbnails {
  id: number;
  url: string;
}

type AppState = {
  thumbnailsData: IThumbnails[];
  openedImage: IFullImage | null;
};

const parseDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

class App extends React.Component<unknown, AppState> {
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
    const { thumbnailsData, openedImage } = this.state;

    return (
      <div className="App">
        <header className="header">
          <h1 className="header__title">TEST APP</h1>
        </header>
        <main className="thumbnails">
          {thumbnailsData.map((thumbnail) => (
            <button
              onClick={() => {
                this.onThumbnailClick(thumbnail.id);
              }}
              key={thumbnail.id}
              type="button"
              className="thumbnail__button">
              <img className="thumbnail__image" src={thumbnail.url} alt="thumbnail" />
            </button>
          ))}
        </main>
        <footer className="footer">
          <p className="footer__copyright">&copy; 2018-2019</p>
        </footer>
        {openedImage && (
          <div className="modal-background">
            <div className="modal">
              <img className="modal__image" src={openedImage.url} alt="fullsize" />
              <div className="modal__comments">
                {openedImage.comments.map((comment) => {
                  const parse = parseDate(comment.date);
                  return (
                    <div key={comment.id} className="comments__wrapper">
                      <p className="comments__date">{parse}</p>
                      <p className="comments__text">{comment.text}</p>
                    </div>
                  );
                })}
              </div>
              <form action="PUSH" className="comment-form">
                <input
                  type="text"
                  name="name"
                  id=""
                  placeholder="Ваше имя"
                  className="comment-form__input"
                />
                <input
                  type="text"
                  name="content"
                  id=""
                  placeholder="Ваш комментарий"
                  className="comment-form__input"
                />
                <button className="comment-form__button" type="submit">
                  Оставить комментарий
                </button>
              </form>
              <button onClick={this.onCloseButtonClick} type="button" className="modal__btn-close">
                Закрыть окно
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
