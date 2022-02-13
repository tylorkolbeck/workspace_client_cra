import { useState } from "react";

// components
import { Link } from "react-router-dom";

// libraries
import { useFormik } from "formik";

// validation
import { registerFormValidator } from "./registerFormValidator";
import clsx from "clsx";

export default function RegisterForm({ onSubmitHandler, error }) {
  const [formLoading, setFormLoading] = useState(false);
  const rf = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
    validate: registerFormValidator,
  });

  async function handleFormSubmit(event) {
    event.preventDefault();
    setFormLoading(true);

    await onSubmitHandler(rf.values);
    setFormLoading(false);
  }

  return (
    <div>
      <h2 className="is-size-3 has-text-centered mb-3">Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <input
            name="name"
            id="name"
            {...rf.getFieldProps("name")}
            className={clsx("input", {
              "is-danger": rf.touched.name && rf.errors.name,
            })}
            type="text"
          ></input>
          {rf.touched.name && rf.errors.name ? (
            <p className="help is-danger">{rf.errors.name}</p>
          ) : null}
        </div>
        <div className="field">
          <label className="label">Email</label>
          <input
            name="email"
            id="email"
            {...rf.getFieldProps("email")}
            type="email"
            className={clsx("input", {
              "is-danger": rf.touched.email && rf.errors.email,
            })}
          ></input>
          {rf.touched.email && rf.errors.email ? (
            <p className="help is-danger">{rf.errors.email}</p>
          ) : null}
        </div>

        <div className="field">
          <label className="label">Password</label>
          <input
            name="password"
            id="password"
            {...rf.getFieldProps("password")}
            type="password"
            className={clsx("input", {
              "is-danger": rf.touched.password && rf.errors.password,
            })}
          ></input>
          {rf.touched.password && rf.errors.password ? (
            <p className="help is-danger">{rf.errors.password}</p>
          ) : null}
        </div>
        <div className="field">
          <label className="label">Confirm Password</label>
          <input
            name="password2"
            id="password2"
            {...rf.getFieldProps("password2")}
            type="password"
            className={clsx("input", {
              "is-danger": rf.touched.password2 && rf.errors.password2,
            })}
          ></input>
          {rf.touched.password2 && rf.errors.password2 ? (
            <p className="help is-danger">{rf.errors.password2}</p>
          ) : null}
        </div>

        <div>
          <p className="has-text-danger mb-3">{error}</p>
        </div>
        <div className="buttons">
          <button
            className={clsx("button is-primary is-fullwidth", {
              "is-loading": formLoading,
            })}
            type="submit"
            disabled={!(rf.isValid && rf.dirty) || formLoading}
          >
            Signup
          </button>
        </div>
        <p className="mt-2">
          Already have an account?
          <Link to="/login" className=" has-text-primary ">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
