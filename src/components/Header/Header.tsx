import React from "react";
import style from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <h1 className={style.title}>TEST APP</h1>
    </header>
  );
};

export { Header };
