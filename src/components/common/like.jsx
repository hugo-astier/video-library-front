import React from "react";

const Like = ({ liked, onClick }) => (
  <i
    style={{ cursor: "pointer" }}
    onClick={onClick}
    className={`fa fa-heart${liked ? "" : "-o"}`}
  ></i>
);

export default Like;
