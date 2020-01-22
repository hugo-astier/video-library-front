import React from "react";

const SearchInput = ({ searchQuery, onChange }) => {
  return (
    <input
      className="form-control"
      type="text"
      placeholder="Search..."
      style={{ marginBottom: 20 }}
      onChange={e => onChange(e.currentTarget.value)}
      value={searchQuery}
    />
  );
};

export default SearchInput;
