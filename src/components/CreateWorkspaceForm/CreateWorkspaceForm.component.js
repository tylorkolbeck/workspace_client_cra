import { useState } from "react";
import { useFormik } from "formik";
import { createWorkspaceValidator } from "./createWorkspaceValidator";
import clsx from "clsx";

export default function CreateWorkspaceForm({
  onSubmit,
  onCancel,
  formLoading,
}) {
  const form = useFormik({
    initialValues: {
      name: "",
    },
    validate: createWorkspaceValidator,
  });

  async function handleFormSubmit(event) {
    event.preventDefault();
    onSubmit(form.values);
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="field">
          <label className="label" htmlFor="name">
            Workspace Name
          </label>
          <div className="control">
            <input
              id="name"
              name="name"
              className="input"
              className={clsx("input", {
                "is-danger": form.touched.name && form.errors.name,
              })}
              type="text"
              {...form.getFieldProps("name")}
            />
            {form.touched.name && form.errors.name ? (
              <p className="help is-danger">{form.errors.name}</p>
            ) : null}
          </div>
        </div>
        <div className="field">
          <div className="buttons is-flex is-justify-content-flex-end">
            <button className="button is-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button
              className={clsx("button is-primary", {
                "is-loading": formLoading,
              })}
              disabled={!(form.isValid && form.dirty) || formLoading}
            >
              Create Space
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
