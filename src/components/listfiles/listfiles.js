import React, { useState } from "react";

import styles from "./listfiles.module.css";
import axios from "axios";

function Listfiles() {
  const [stageFiles, setStageFiles] = useState([]);
  var getFilename = function (str) {
    return str.substring(str.lastIndexOf("/") + 1);
  };

  function listFileIndir() {
    axios
      .get("http://localhost:8080/api/listfiles")
      .then((response) => {
        console.log("response listfiles");
        console.log(response.data);
        setStageFiles(response.data);
      })
      .catch((err) => {
        // Handle error
        console.log(err);
      });
  }

  React.useEffect(() => listFileIndir(), []);
  return (
    <div className={styles.Listfiles} data-testid="Listfiles">
      {stageFiles}
    </div>
  );
}

export default Listfiles;
