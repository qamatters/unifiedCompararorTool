import React from "react";

import styles from "./loading-spinner.module.css";

const LoadingSpinner = () => (
  <div className={styles.LoadingSpinner} data-testid="LoadingSpinner">
    <div className={styles.spinnercontainer}>
      <div className={styles.loadingspinner}></div>
    </div>
  </div>
);

export default LoadingSpinner;
