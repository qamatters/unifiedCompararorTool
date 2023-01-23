import React, { useState } from "react";

import Toast from "react-bootstrap/Toast";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ToastContainer from "react-bootstrap/ToastContainer";

function Toastmessage(props) {
  const [show, setShow] = useState(true);

  return (
    <Row>
      <Col xs={6}>
        <ToastContainer className="p-3" position="middle-center">
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={10000}
            autohide
            bg="success"
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Files Comparison Result</strong>
            </Toast.Header>
            <Toast.Body>
              <strong>
                {props.message}. View the files-
                PDFCOMPARATOR/java/files/Summary folder.
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
