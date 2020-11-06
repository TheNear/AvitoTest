import React from "react";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Gallery } from "./pages/Gallery/Gallery";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Gallery />
      <Footer />
    </>
  );
};

export { App };
