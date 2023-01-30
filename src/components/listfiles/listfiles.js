//import React, { useState, useEffect } from "react";
import React from "react";
import styles from "./listfiles.module.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import pdf from "../../images/pdfdownload.png";
import folderfile from "../../images/folderfile.gif";
import eye from "../../images/eye.jpg";
import { saveAs } from "file-saver";
import { Button } from "react-bootstrap";
import Pdfviewer from "../pdfviewer/pdfviewer";

function Listfiles(props) {
  // const [stageFilenames, setStageFilenames] = useState([]);
  // const [prodfilenames, setProdfilenames] = useState([]);
  // const [summaryfilenames, setSummaryfilenames] = useState([]);

  const stageFilenames = props.stageFilenames;
  const prodfilenames = props.prodfilenames;
  const summaryfilenames = props.summaryfilenames;
  async function downloadpdf(filepath, filename) {
    const { data } = await getTicketsPdf(filepath);
    const blob = new Blob([data], { type: "application/pdf" });
    saveAs(blob, filename);
    //Build a URL from the file
    // const fileURL = URL.createObjectURL(blob);
    //Open the URL on new Window
    //window.open(fileURL);
  }
  async function viewpdf(filepath, filename) {
    const { data } = await getTicketsPdf(filepath);
    const blob = new Blob([data], { type: "application/pdf" });
    //saveAs(blob, filename);
    //Build a URL from the file
    const fileURL = URL.createObjectURL(blob);
    //Open the URL on new Window
    window.open(fileURL);
  }

  async function getTicketsPdf(filepath) {
    /* return axios.get("http://localhost:8080/api/getPdf", {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "arraybuffer",
    }); */
    //return axios.post("http://localhost:8080/api/getPdf?path=" + filepath, {
    return axios.get("http://localhost:8080/api/getPdf", {
      params: {
        path: filepath,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "arraybuffer",
    });
  }

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
                      <td></td>
                      <td>
                        {/* <a
                      href={require("../../java/files/Stage/" + d)}
                      target="_blank"
                      rel="noopener noreferrer"
                    > */}
                        <Button
                          variant="outline-primary"
                          onClick={() => viewpdf("Stage/" + d, d)}
                        >
                          <img
                            src={eye}
                            className={styles.imgicon}
                            alt="pdfreadfile"
                            aria-disabled="true"
                          ></img>
                        </Button>
                        <Button
                          variant="outline-primary"
                          onClick={() => downloadpdf("Stage/" + d, d)}
                        >
                          <img
                            src={pdf}
                            className={styles.imgicon}
                            alt="pdffile"
                            aria-disabled="true"
                          ></img>
                        </Button>
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
                      <td></td>
                      <td>
                        <Button
                          variant="outline-primary"
                          onClick={() => viewpdf("Prod/" + d, d)}
                        >
                          <img
                            src={eye}
                            className={styles.imgicon}
                            alt="pdfreadfile"
                            aria-disabled="true"
                          ></img>
                        </Button>
                        <Button
                          variant="outline-primary"
                          onClick={() => downloadpdf("Prod/" + d, d)}
                        >
                          <img
                            src={pdf}
                            className={styles.imgicon}
                            alt="pdffile"
                            aria-disabled="true"
                          ></img>
                        </Button>
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
                      <td></td>
                      <td>
                        <Button
                          variant="outline-primary"
                          onClick={() => viewpdf("Summary/" + d, d)}
                        >
                          <img
                            src={eye}
                            className={styles.imgicon}
                            alt="pdfreadfile"
                            aria-disabled="true"
                          ></img>
                        </Button>
                        <Button
                          variant="outline-primary"
                          onClick={() => downloadpdf("Summary/" + d, d)}
                        >
                          <img
                            src={pdf}
                            className={styles.imgicon}
                            alt="pdffile"
                            aria-disabled="true"
                          ></img>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>

        {/* <div>
          
          <Pdfviewer file={downloadpdf}></Pdfviewer>
        </div> */}
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
