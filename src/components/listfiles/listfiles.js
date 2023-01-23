//import React, { useState, useEffect } from "react";
import React from "react";
import styles from "./listfiles.module.css";
//import axios from "axios";
import Table from "react-bootstrap/Table";
import pdf from "../../images/pdfdownload.png";
import folderfile from "../../images/folderfile.gif";

//import Pdfviewer from "../pdfviewer/pdfviewer";
//import { Button } from "react-bootstrap";

function Listfiles(props) {
  // const [stageFilenames, setStageFilenames] = useState([]);
  // const [prodfilenames, setProdfilenames] = useState([]);
  // const [summaryfilenames, setSummaryfilenames] = useState([]);

  const stageFilenames = props.stageFilenames;
  const prodfilenames = props.prodfilenames;
  const summaryfilenames = props.summaryfilenames;

  //const [file, setFile] = useState(null);

  /* function assignFilename(filename, foldername) {
    console.log("getfilename", filename, foldername);
    let summaryfilename = "../../java/files/Summary/" + filename;
    let stagefilename = "../../java/files/Stage/" + filename;
    let prodfilename = "../../java/files/prod/" + filename;
    console.log(summaryfilename, stagefilename, prodfilename);
    if (foldername === "summary") {
      //setFile(summaryfilename);
      return summaryfilename;
    }
  } */
  /* function listFileIndir() {
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
  } */
  /* const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/listfiles");
      setStageFilenames(response.data.stagefilenames);
      setProdfilenames(response.data.prodfilenames);
      setSummaryfilenames(response.data.summaryfilenames);
    } catch (e) {
      console.log(e);
    }
  }; */

  /*  useEffect(() => {
    const intervalCall = setInterval(() => {
      getData();
    }, 1000);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  }, []); */
  //useEffect(() => listFileIndir(), []);
  if (stageFilenames.length > 0) {
    return (
      <>
        <header>
          <h1>List of files</h1>
        </header>
        {/* <span>
          New files generated in summay folder are{" "}
          {props.newSummaryFile.join(",")}
        </span> */}
        <div className={styles.Listfiles} data-testid="Listfiles">
          <div className={styles.divTable} id="stBox">
            <Table size="sm" responsive>
              <thead>
                <tr>
                  <th>
                    <img
                      src={folderfile}
                      className={styles.imgicon}
                      alt="folderfile"
                    ></img>
                    STAGE
                  </th>
                </tr>
              </thead>
              <tbody>
                {stageFilenames.map(function (d, index) {
                  return (
                    <tr key={index}>
                      <td>{d}</td>
                      <td>
                        {/* <a
                      href={require("../../java/files/Stage/" + d)}
                      target="_blank"
                      rel="noopener noreferrer"
                    > */}
                        <img
                          src={pdf}
                          className={styles.imgicon}
                          alt="pdffile"
                          aria-disabled="true"
                        ></img>
                        {/* </a> */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div className={styles.divTable} id="ndBox">
            <Table size="sm" responsive>
              <thead>
                <tr>
                  <th>
                    <img
                      src={folderfile}
                      className={styles.imgicon}
                      alt="folderfile"
                    ></img>
                    PROD
                  </th>
                </tr>
              </thead>
              <tbody>
                {prodfilenames.map(function (d, index) {
                  return (
                    <tr key={index}>
                      <td>{d}</td>
                      <td>
                        <img
                          src={pdf}
                          className={styles.imgicon}
                          alt="pdffile"
                        ></img>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div className={styles.divTable} id="rd-box">
            <Table size="sm" responsive>
              <thead>
                <tr>
                  <th>
                    <img
                      src={folderfile}
                      className={styles.imgicon}
                      alt="folderfile"
                    ></img>
                    SUMMARY
                  </th>
                </tr>
              </thead>
              <tbody>
                {summaryfilenames.map(function (d, index) {
                  return (
                    <tr key={index}>
                      <td>{d}</td>
                      <td>
                        <img
                          src={pdf}
                          className={styles.imgicon}
                          alt="pdffile"
                        ></img>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>

        {/* <div> */}
        {/* {file} && <Pdfviewer file={file}></Pdfviewer> */}
        {/* <Pdfviewer file={file}></Pdfviewer> */}
        {/* <Pdfviewer file="../../java/files/prod/sample.pdf"></Pdfviewer> */}
        {/* </div> */}
      </>
    );
  } else {
    return (
      <h6>
        There are no files present in the folders.
        <br />
        Please upload the files to compare.
      </h6>
    );
  }
}

export default Listfiles;
