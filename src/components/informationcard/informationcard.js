import React from "react";

import styles from "./informationcard.module.css";
import info from "../../images/info.gif";
import folderstructure from "../../images/folderstructure.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Alert from "react-bootstrap/Alert";
import ModalContainer from "../modalContainer/modalContainer";
function Informationcard() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className={styles.Informationcard} data-testid="Informationcard">
      <OverlayTrigger
        trigger="click"
        key="bottom"
        placement="bottom"
        overlay={
          <Popover id={`popover-positioned-bottom`}>
            <Popover.Header as="h3">Steps to compare files and compare JSON</Popover.Header>
            <Popover.Body>
              <Alert key="info" variant="info">
                <h6> Comaring Files:</h6>
                1. Select Files to be uploaded
                <br />
                2. Click on Upload doc(x) button to upload the files.
                <br />
                3.Click on Compare button to start the compare <br />
                4.View the resulted file- PDFCOMPARATOR/java/files/Summary
                folder.
                <br />
                <span className={styles.orclass}>OR</span>
                <br />
                1. Click on Compare button to compare files already present in
                the folders.
                <br />
                2.View the resulted file- PDFCOMPARATOR/java/files/Summary
                folder.
                <Alert key="info" variant="danger">
                  Important: Java folder structure need to be maintained as
                  given.
                  <br />
                  click this icon
                  <img
                    src={folderstructure}
                    alt="folderstructure"
                    width="20"
                    onClick={() => setModalShow(true)}
                    title="Click here to view the Java folder structure"
                    className={styles.folderclass}
                  />
                  <ModalContainer
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </Alert>
                <h6> Comaring JSON:</h6>
                1. Enter JSON in the textarea box.
                <br />
                2. Click on compare button to compare them.
                <br />
                3. If the JSON is invalid a error message would be shown at the top.
                <br />
                4. Validate the JSON using Notepad++ or other formatters.
              </Alert>
            </Popover.Body>
          </Popover>
        }
      >
        <img
          src={info}
          className={styles.infobutton}
          alt="info"
          title="Help"
        ></img>
        {/* <Button variant="secondary">Popover on 'bottom'</Button> */}
      </OverlayTrigger>
    </div>
  );
}

Informationcard.propTypes = {};

Informationcard.defaultProps = {};

export default Informationcard;
