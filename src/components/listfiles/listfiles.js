import React, { useState } from "react";

import styles from "./listfiles.module.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import pdf from "../../images/pdfdownload.png";

function Listfiles() {
  const [stageFilenames, setStageFilenames] = useState([]);
  const [prodfilenames, setProdfilenames] = useState([]);
  const [summaryfilenames, setSummaryfilenames] = useState([]);

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
  React.useEffect(() => listFileIndir(), []);
  return (
    <div className={styles.Listfiles} data-testid="Listfiles">
      <div className={styles.stBox} id="stBox">
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
      <div className={styles.ndBox} id="ndBox">
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
      <div className={styles.rdBox} id="rd-box">
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
  );
}

export default Listfiles;
