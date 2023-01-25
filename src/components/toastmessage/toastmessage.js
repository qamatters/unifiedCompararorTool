import React, { useState } from "react";

import Toast from "react-bootstrap/Toast";
//import styles from "./toastmessage.module.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ToastContainer from "react-bootstrap/ToastContainer";
//import error from "../../images/error.gif";
function Toastmessage(props) {
  const [show, setShow] = useState(true);

  return (
    <Row>
      <Col xs={6}>
        <ToastContainer className="p-3" position="middle-center">
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={100000}
            autohide
            bg={props.message.includes("Error") ? "danger" : "success"}
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">
                {props.message.includes("Error") ? (
                  <>
                    {/* <img
                      src={error}
                      // className={styles.folderbutton}
                      alt="error"
                      title="Error. Something went wrong."
                      width="15"
                    ></img> */}
                    Error Alert!!
                  </>
                ) : (
                  "Files Comparison Result"
                )}
              </strong>
            </Toast.Header>
            <Toast.Body>
              <strong>
                {props.message}
                {/* . View the files-
                PDFCOMPARATOR/java/files/Summary folder. */}
              </strong>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
}

Toastmessage.propTypes = {};

Toastmessage.defaultProps = {};

export default Toastmessage;
