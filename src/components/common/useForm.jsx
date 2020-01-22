import React from "react";
import Joi from "joi-browser";
import FormField from "./formField";

// Custom hook 'useForm'
function useForm({ data, setData, errors, setErrors, schema, doSubmit }) {
  const validate = () => {
    const options = { abortEarly: false };
    const { error: result } = Joi.validate(data, schema, options);

    if (!result) return null;

    const errors = result.details.reduce((errors, error) => {
      errors[error.path[0]] = error.message;
      return errors;
    }, {});

    return errors;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    doSubmit(data);
  };

  const validateProperty = ({ name, value }) => {
    const propertyObj = { [name]: value };
    const propertySchema = { [name]: schema[name] };
    const { error: result } = Joi.validate(propertyObj, propertySchema);

    return result ? result.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }) => {
    const errorsBis = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errorsBis[input.name] = errorMessage;
    else delete errorsBis[input.name];

    const dataClone = { ...data };
    dataClone[input.name] = input.value;
    setData(dataClone);
    setErrors(errorsBis);
  };

  const renderSubmitButton = label => {
    return (
      <button disabled={validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  const renderFormField = (name, label, type = "text", items) => {
    return (
      <FormField
        label={label}
        name={name}
        onChange={handleChange}
        value={data[name]}
        error={errors[name]}
        type={type}
        items={items} // if items is falsy React will omit this attribute
      />
    );
  };

  return { handleSubmit, renderFormField, renderSubmitButton };
}

export default useForm;
