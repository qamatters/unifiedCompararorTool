import React from "react";
import PropTypes from "prop-types";
import styles from "./toastmessage.module.css";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
const Toastmessage = (props) => (
  <div className={styles.Toastmessage} data-testid="Toastmessage">
    <ToastContainer className="p-3" position="middle-center">
      <Toast delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">File Comparison Result</strong>
        </Toast.Header>
        <Toast.Body>{props.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  </div>
);

Toastmessage.propTypes = {};

Toastmessage.defaultProps = {};

export default Toastmessage;
