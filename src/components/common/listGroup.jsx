import React from "react";
import PropTypes from "prop-types";

const ListGroup = ({
  groups,
  valueProperty,
  textProperty,
  currentGroupId,
  onGroupChange
}) => {
  return (
    <ul className="list-group" style={{ cursor: "pointer" }}>
      {groups.map(group => {
        return (
          <li
            key={group[valueProperty]}
            className={`list-group-item ${group._id === currentGroupId &&
              "active"}`}
            onClick={() => onGroupChange(group)}
          >
            {group[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name"
};

ListGroup.propTypes = {
  groups: PropTypes.array.isRequired,
  currentGroupId: PropTypes.string.isRequired,
  onGroupChange: PropTypes.func.isRequired,
  valueProperty: PropTypes.string,
  textProperty: PropTypes.string
};

export default ListGroup;
