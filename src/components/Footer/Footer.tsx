import React from "react";
import style from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <p className={style.copyright}>&copy; 2018-2019</p>
    </footer>
  );
};

export { Footer };
