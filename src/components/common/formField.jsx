import React from "react";
import Select from "./select";
import Input from "./input";

const FormField = ({ items, type, ...rest }) => {
  if (type === "select") return <Select options={items} {...rest} />;
  return <Input type={type} {...rest} />;
};

export default FormField;
