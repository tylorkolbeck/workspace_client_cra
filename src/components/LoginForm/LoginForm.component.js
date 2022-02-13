import { useState } from "react";

// components
import { Link } from "react-router-dom";

// hooks
import { useFormik } from "formik";
import clsx from "clsx";

// validator
import { loginFormValidator } from "./loginFormValidator";

export default function Login({ submitLogin, errorMsg }) {
  const [formLoading, setFormLoading] = useState(false);

  const lf = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginFormValidator,
  });

  async function handleFormSubmit(event) {
    event.preventDefault();
    setFormLoading(true);
    await submitLogin(lf.values, "/workspaces");
    setFormLoading(false);
  }
  return (
    <div>
      <h2 className="is-size-3 has-text-centered mb-3">Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <input
            id="email"
            name="email"
            className={clsx("input", {
              "is-danger": lf.touched.email && lf.errors.email,
            })}
            type="text"
            {...lf.getFieldProps("email")}
          ></input>
          {lf.touched.email && lf.errors.email ? (
            <p className="help is-danger">{lf.errors.email}</p>
          ) : null}
        </div>

        <div className="field">
          <label className="label">Password</label>
          <input
            id="password"
            name="password"
            {...lf.getFieldProps("password")}
            className={clsx("input", {
              "is-danger": lf.touched.password && lf.errors.password,
            })}
            type="password"
          ></input>
          {lf.touched.password && lf.errors.password ? (
            <p className="help is-danger">{lf.errors.password}</p>
          ) : null}
        </div>
        <div>
          <p className="has-text-danger mb-3">{errorMsg}</p>
        </div>
        <div className="buttons">
          <button
            className={clsx("button is-primary is-fullwidth", {
              "is-loading": formLoading,
            })}
            type="submit"
            disabled={!(lf.isValid && lf.dirty) || formLoading}
          >
            Login
          </button>
        </div>

        <p className="mt-2">
          Need an account?{" "}
          <Link to="/register" className=" has-text-primary ">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
