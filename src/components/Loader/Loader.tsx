import React from "react";
import LoaderSVG from "../../assets/images/Loader.svg";

const Loader: React.FC = () => {
  return (
    <div>
      <img src={LoaderSVG} alt="Loading SVG" />
    </div>
  );
};

export { Loader };
