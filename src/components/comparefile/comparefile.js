import React from "react";

import styles from "./comparefile.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios";

function Comparefile() {
  function generateCompareFile() {
    console.log("compare axios call");
    axios
      .get("http://localhost:8080/api/compare")
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        // Handle error
        console.log(err);
      });
  }
  //React.useEffect(() => generateCompareFile(), []);
  return (
    <>
      <div className={styles.Comparefile} data-testid="Comparefile">
        <form>
          <Form.Group className="mb-3" controlId="compare">
            <Button variant="primary" size="sm" onClick={generateCompareFile()}>
              Compare
            </Button>
          </Form.Group>
        </form>
      </div>
    </>
  );
}

export default Comparefile;
