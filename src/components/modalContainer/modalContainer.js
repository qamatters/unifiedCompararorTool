import React from "react";

import styles from "./modalContainer.module.css";
import folder from "../../images/folder.jpg";

import Modal from "react-bootstrap/Modal";
const ModalContainer = (props) => (
  <div className={styles.ModalContainer} data-testid="ModalContainer">
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Java folder structure
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={folder}
          // className={styles.folderbutton}
          alt="info"
          title="Folder Structure for Java"
          width="150"
        ></img>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  </div>
);

ModalContainer.propTypes = {};

ModalContainer.defaultProps = {};

export default ModalContainer;
