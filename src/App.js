import React from "react";

import "./App.css";
import Listfiles from "./components/listfiles/listfiles";
import Uploadfile from "./components/uploadfile/uploadfile";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
//import Comparefile from "./components/comparefile/comparefile";
//class App extends Component {
function App() {
  return (
    <>
      <h1 className="title">Pdf Comparator</h1>
      {/* <div className="comparebutton">
          <Comparefile></Comparefile>
        </div> */}
      <Tabs defaultActiveKey="uploadFiles" id="HomeTab" className="mb-3">
        <Tab eventKey="uploadFiles" title="Upload files">
          <Uploadfile></Uploadfile>
        </Tab>
        <Tab eventKey="fileView" title="View Files">
          <Listfiles></Listfiles>
        </Tab>
        {/* <Tab eventKey="compare" title="Compare Files">
            <Comparefile></Comparefile>
          </Tab> */}
      </Tabs>
    </>
  );
}
//render() {

//}
//}

export default App;
