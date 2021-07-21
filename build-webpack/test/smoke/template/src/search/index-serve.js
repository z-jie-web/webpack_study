"use strict";

// import React from "react";
// import ReactDOM from "react-dom";
// import logo from "../../../../images/loaders.png";
// import { common } from "../../common";
// import { a } from "./tree-shaking";
// import largerNumber from "larger-number";
// import "./search.less";

const React = require("react");
const largerNumber = require("larger-number");
const logo = require("./images/loaders.png").default;
const { common } = require("../../common");
const { a } = require("./tree-shaking");
require("./search.less");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Text: null,
    };
  }
  loadComponent = () => {
    import("./text.js").then((Text) => {
      this.setState({
        Text: Text.default,
      });
    });
  };

  render() {
    const { Text } = this.state;
    const num = largerNumber("888", "22");
    return (
      <div className="search">
        {Text ? <Text /> : "11"}
        {num}
        <img onClick={this.loadComponent} src={logo} alt="" />
        Search Text1111333
        {common()}
        {a()}
      </div>
    );
  }
}

module.exports = <App />;
