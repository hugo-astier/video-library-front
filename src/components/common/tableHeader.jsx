import React from "react";

const TableHeader = ({ columns, sortColumn, onSort }) => {
  const raiseSort = path => {
    const sortColumnClone = { ...sortColumn };
    if (sortColumnClone.path === path)
      sortColumnClone.order = sortColumnClone.order === "asc" ? "desc" : "asc";
    else {
      sortColumnClone.path = path;
      sortColumnClone.order = "asc";
    }
    onSort(sortColumnClone);
  };

  const renderSortIcon = column => {
    const sortColumnClone = { ...sortColumn };
    if (column.path !== sortColumnClone.path) return null;
    if (sortColumnClone.order === "asc")
      return <i className="fa fa-sort-asc"></i>;

    return <i className="fa fa-sort-desc"></i>;
  };

  return (
    <thead>
      <tr style={{ cursor: "pointer" }}>
        {columns.map(column => (
          <th
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
