import React, { Component } from "react";

import "./App.css";
import Listfiles from "./components/listfiles/listfiles";
import Uploadfile from "./components/uploadfile/uploadfile";

class App extends Component {
  render() {
    return (
      <>
        <h1 className="title">Pdf Comparator</h1>
        <Uploadfile></Uploadfile>
        <Listfiles></Listfiles>
      </>
    );
  }
}

export default App;
