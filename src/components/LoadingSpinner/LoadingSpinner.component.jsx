import React from "react";
import styles from "./LoadingSpinner.module.scss";

export default function LoadingSpinner() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}></div>
    </div>
  );
}
