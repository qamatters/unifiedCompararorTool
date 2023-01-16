import React, { Component } from "react";

import "./App.css";
import Uploadfile from "./components/uploadfile/uploadfile";

class App extends Component {
  render() {
    return (
      <>
        <h1 className="title">Pdf Comparator</h1>
        <Uploadfile></Uploadfile>
      </>
    );
  }
}

export default App;
