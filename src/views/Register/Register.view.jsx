import React, { useState } from "react";
import styles from "./Register.module.scss";

// components
import RegisterForm from "../../components/RegisterForm/RegisterForm.component";
import { Link } from "react-router-dom";

// libraries
import clsx from "clsx";

// hooks
import useAuth from "../../common/hooks/useAuth";

export default function Register() {
  const [registerError, setRegisterError] = useState(false);
  const [showRegisterSuccess, setShowRegisterSuccess] = useState(false);
  const { register } = useAuth();

  async function registerHandler(userData) {
    const { success, error } = await register(userData);

    console.log(success);

    if (!success) {
      setRegisterError(error);
    } else {
      setShowRegisterSuccess(true);
    }

    return;
  }

  if (showRegisterSuccess) {
    return (
      <div className={clsx("box", styles.registerFormWrapper)}>
        <h2>Registration Complete!</h2>
        <p>
          Please Login <Link to="/login">here</Link>
        </p>
      </div>
    );
  }
  return (
    <div className={clsx("box", styles.registerFormWrapper)}>
      <RegisterForm onSubmitHandler={registerHandler} error={registerError} />
    </div>
  );
}
