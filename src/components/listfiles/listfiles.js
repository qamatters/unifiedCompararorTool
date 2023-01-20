import React, { useState, useEffect } from "react";

import styles from "./listfiles.module.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import pdf from "../../images/pdfdownload.png";
//import Pdfviewer from "../pdfviewer/pdfviewer";
//import { Button } from "react-bootstrap";

function Listfiles() {
  const [stageFilenames, setStageFilenames] = useState([]);
  const [prodfilenames, setProdfilenames] = useState([]);
  const [summaryfilenames, setSummaryfilenames] = useState([]);
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
  if (stageFilenames.length > 0) {
    return (
      <>
        <div className={styles.Listfiles} data-testid="Listfiles">
          <div className={styles.divTable} id="stBox">
            <Table size="sm" responsive>
              <thead>
                <tr>
                  <th>Stage Folder Files</th>
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
                  <th>Prod Folder Files</th>
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
                  <th>Summary Folder Files</th>
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
        <div>
          {/* {file} && <Pdfviewer file={file}></Pdfviewer> */}
          {/* <Pdfviewer file={file}></Pdfviewer> */}
          {/* <Pdfviewer file="../../java/files/prod/sample.pdf"></Pdfviewer> */}
        </div>
      </>
    );
  } else {
    return (
      <h2>
        There are no files present in the folders.
        <br />
        Please upload the files to compare.
      </h2>
    );
  }
}

export default Listfiles;
