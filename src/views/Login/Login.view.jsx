import React from "react";
import styles from "./Login.module.scss";

// hooks
import useAuth from "../../common/hooks/useAuth";

// components
import LoginForm from "../../components/LoginForm/LoginForm.component";

// libraries
import clsx from "clsx";

export default function LoginSignup() {
  const { login, authError } = useAuth();

  return (
    <div className={clsx("box", styles.loginFormWrapper)}>
      <LoginForm submitLogin={login} errorMsg={authError} />
    </div>
  );
}
