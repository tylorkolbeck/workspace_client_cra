export const registerFormValidator = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length < 2) {
    errors.name = "Name must be atleast 2 characters long";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be atleast 8 characters long";
  }

  if (!values.password2) {
    errors.password2 = "Required";
  } else if (values?.password2 !== values?.password) {
    errors.password2 = "Password do not match";
  }

  return errors;
};
