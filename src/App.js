import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import Listfiles from "./components/listfiles/listfiles";
import Uploadfile from "./components/uploadfile/uploadfile";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
//import Multiplefileupload from "./components/multiplefileupload/multiplefileupload";
//import Comparefile from "./components/comparefile/comparefile";
//class App extends Component {
function App() {
  const [stageFilenames, setStageFilenames] = useState([]);
  const [prodfilenames, setProdfilenames] = useState([]);
  const [summaryfilenames, setSummaryfilenames] = useState([]);
  const [newSummaryFile, setNewSummaryFile] = useState([]);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const prevSummaryfiles = usePrevious(summaryfilenames);
  useEffect(() => {
    let difference = summaryfilenames.filter(
      (x) => !prevSummaryfiles.includes(x)
    );
    console.log("summary different files===", difference);
    setNewSummaryFile(difference);
  }, [summaryfilenames]);

  function listFileIndir() {
    axios
      .get("http://localhost:8080/api/listfiles")
      .then((response) => {
        console.log("response listfiles");
        console.log(response.data);

        setStageFilenames(response.data.stagefilenames);
        setProdfilenames(response.data.prodfilenames);
        setSummaryfilenames(response.data.summaryfilenames);
      })
      .catch((err) => {
        // Handle error
        console.log(err);
      });
  }

  useEffect(() => listFileIndir(), []);
  return (
    <>
      <h1 className="title">Pdf Comparator</h1>
      {/* <div className="comparebutton">
          <Comparefile></Comparefile>
        </div> */}
      <Tabs defaultActiveKey="uploadFiles" id="HomeTab" className="mb-3">
        <Tab eventKey="uploadFiles" title="Upload files">
          <Uploadfile
            listFileIndir={listFileIndir}
            newSummaryFile={newSummaryFile}
          ></Uploadfile>
          {/* <Multiplefileupload></Multiplefileupload> */}
        </Tab>
        <Tab eventKey="fileView" title="View Files">
          <Listfiles
            stageFilenames={stageFilenames}
            prodfilenames={prodfilenames}
            summaryfilenames={summaryfilenames}
            newSummaryFile={newSummaryFile}
          ></Listfiles>
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
