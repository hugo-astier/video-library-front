import React from "react";
import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";

const MoviesTable = ({
  movies,
  sortColumn,
  onLike,
  onDelete,
  onSort,
  onUpdate
}) => {
  const user = auth.currentUser;
  const columns = [
    {
      path: "title",
      label: "Title",
      content: movie => {
        return (
          <a
            href=""
            className="card-link"
            onClick={e => onUpdate(e, movie._id)}
          >
            {movie.title}
          </a>
        );
      }
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onClick={() => onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => {
        if (user?.isAdmin)
          return (
            <button
              onClick={() => onDelete(movie)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          );
        return "";
      }
    }
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      data={movies}
    />
  );
};

export default MoviesTable;
