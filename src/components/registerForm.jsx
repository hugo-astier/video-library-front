import React, { useState } from "react";
import Joi from "joi-browser";
import useForm from "./common/useForm";
import auth from "../services/authService";
import { register } from "../services/userService";

function RegisterForm() {
  const initialFields = { email: "", password: "", name: "" };
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState({});

  const schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };
  const doSubmit = async () => {
    try {
      const { headers } = await register(fields);
      auth.loginWithJwt(headers["x-auth-token"]);
      window.location = "/";
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
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {renderFormField("email", "Email")}
        {renderFormField("password", "Password", "password")}
        {renderFormField("name", "Name")}
        {renderSubmitButton("Register")}
      </form>
    </div>
  );
}

export default RegisterForm;
