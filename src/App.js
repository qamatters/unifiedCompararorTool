import React, { Component } from "react";

import "./App.css";
import Listfiles from "./components/listfiles/listfiles";
import Uploadfile from "./components/uploadfile/uploadfile";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
class App extends Component {
  render() {
    return (
      <>
        <h1 className="title">Pdf Comparator</h1>
        <Tabs defaultActiveKey="fileView" id="HomeTab" className="mb-3">
          <Tab eventKey="fileView" title="View Files">
            <Listfiles></Listfiles>
          </Tab>
          <Tab eventKey="uploadFiles" title="Upload files">
            <Uploadfile></Uploadfile>
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default App;
