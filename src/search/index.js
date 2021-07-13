"use strict";

import React from "react";
import ReactDOM from "react-dom";
import logo from "../../../images/loaders.png";
import { common } from "../../common";
import "./search.less";

class App extends React.Component {
  render() {
    return (
      <div className="search">
        <img src={logo} alt="" />
        Search Text1111333
        {common()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
