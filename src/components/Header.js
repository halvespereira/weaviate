import React from "react";

// Logo img
import logo from "../images/logo-horizontal-payoff.png";

import "./Header.css";

const Header = () => {
  return (
    <header>
      <img src={logo} alt="SeMI logo" className="__logo" />
    </header>
  );
};

export default Header;
