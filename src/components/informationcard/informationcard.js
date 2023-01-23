import React from "react";
import PropTypes from "prop-types";
import styles from "./informationcard.module.css";
import info from "../../images/info.gif";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Alert from "react-bootstrap/Alert";
const Informationcard = () => (
  <div className={styles.Informationcard} data-testid="Informationcard">
    <OverlayTrigger
      trigger="click"
      key="bottom"
      placement="bottom"
      overlay={
        <Popover id={`popover-positioned-bottom`}>
          <Popover.Header as="h3">Help</Popover.Header>
          <Popover.Body>
            <Alert key="info" variant="info">
              1. Select Files to be uploaded
              <br />
              2. Click on upload doc(x) button to upload the files.
              <br />
              3.Click on compare button to start the compare <br />
              4.View the resulted file- PDFCOMPARATOR/java/files/Summary folder.
            </Alert>
          </Popover.Body>
        </Popover>
      }
    >
      <img src={info} className={styles.infobutton} alt="info"></img>
      {/* <Button variant="secondary">Popover on 'bottom'</Button> */}
    </OverlayTrigger>
  </div>
);

Informationcard.propTypes = {};

Informationcard.defaultProps = {};

export default Informationcard;
