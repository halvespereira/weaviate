import React from "react";

import "./spinner.css";

// Spinner img
import spinner from "../images/color.png";

const Spinner = ({ isSearching }) => {
  return (
    <img
      src={spinner}
      alt="Spinner"
      className={isSearching ? "__spinner" : "__noSpinner"}
    />
  );
};

export default Spinner;
