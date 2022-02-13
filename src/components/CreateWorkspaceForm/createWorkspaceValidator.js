export const createWorkspaceValidator = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length < 4) {
    errors.name = "Workspace name minimum length is 4 characters";
  }

  return errors;
};
