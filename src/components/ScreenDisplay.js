import React from "react";

import "./screenDisplay.css";

// Functions to handle what renders depending on current state
import displayResults, { displayMessages } from "../screenmessages";

const ScreenDisplay = ({ data, isError, screenMessage }) => {
  const displayScreen = () => {
    if (data) {
      return displayResults(data);
    } else {
      return displayMessages(isError, screenMessage);
    }
  };

  return <div className="__ScreenDisplay">{displayScreen()}</div>;
};

export default ScreenDisplay;
