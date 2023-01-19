import React, { useState } from "react";

import styles from "./listfiles.module.css";
import axios from "axios";

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
      <div>
        {stageFilenames.map(function (d, idx) {
          return <li key={idx}>{d}</li>;
        })}
        {prodfilenames.map(function (d, idx) {
          return <li key={idx}>{d}</li>;
        })}
        {summaryfilenames.map(function (d, idx) {
          return <li key={idx}>{d}</li>;
        })}
      </div>
    </div>
  );
}

export default Listfiles;
