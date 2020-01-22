import React, { useState } from "react";
import Joi from "joi-browser";
import useForm from "./common/useForm";
import auth from "../services/authService";

function LoginForm({ location }) {
  const initialFields = { email: "", password: "" };
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState({});
  const schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };
  const doSubmit = async () => {
    try {
      const { email, password } = fields;
      await auth.login(email, password);
      const { state } = location;
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response.status === 400) {
        const errorsClone = { ...errors };
        errorsClone.email = error.response.data;
        setErrors(errorsClone);
      }
    }
  };

  // Use of custom hook 'useForm'
  const params = {
    data: fields,
    setData: setFields,
    errors,
    setErrors,
    schema,
    doSubmit
  };
  const { handleSubmit, renderFormField, renderSubmitButton } = useForm(params);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {renderFormField("email", "Email")}
        {renderFormField("password", "Password", "password")}
        {renderSubmitButton("Login")}
      </form>
    </div>
  );
}

export default LoginForm;
