import React, { useEffect, useState } from "react";
import styles from "./ActivateAccount.module.scss";
import clsx from "clsx";
import { Link, useParams } from "react-router-dom";
import { activate } from "../../common/auth-api";

export default function ActivateAccount() {
  const params = useParams();
  const [error, setError] = useState(false);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const confirmationCode = params.confirmationCode;

    if (!confirmationCode) {
      setError("Missing confirmation code");
    } else {
      activate(confirmationCode).then(({ success, data }) => {
        if (!success) {
          setError(data);
        } else {
          setError(false);
          setActivated(true);
        }
      });
    }
  }, []);

  if (activated) {
    return (
      <div className={clsx("box", styles.boxWrapper)}>
        <h2>
          Your account is activated! Please login <Link to="/">here</Link>
        </h2>
      </div>
    );
  }
  return (
    <div className={clsx("box", styles.boxWrapper)}>
      <h2>Activate account</h2>
      {error && <p className="has-text-danger">{error}</p>}
    </div>
  );
}
