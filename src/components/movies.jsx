import React, { useState, Suspense } from "react";
import { fetchGenres } from "../services/genreService";
import { fetchMovieForm } from "../services/movieFormService";
import auth from "../services/authService";
import GenresDisplay from "./genresDisplay";
import MoviesDisplay from "./moviesDisplay";

const resourceGenres = fetchGenres();

function Movies({ resourceMovies, setResourceMovieForm, history }) {
  const user = auth.currentUser;
  const [settings, setSettings] = useState({
    pageSize: 4,
    currentPage: 1,
    currentGenreId: "genreAll",
    sortColumn: { path: "title", order: "asc" }
  });
  const [searchQuery, setSearchQuery] = useState("");
  const state = { settings, setSettings, searchQuery, setSearchQuery };

  const handleCreate = () => {
    setResourceMovieForm(fetchMovieForm("new"));
    history.push(`/movies/new`);
  };

  return (
    <div className="row">
      <Suspense fallback={<p>Loading</p>}>
        <div className="col-3">
          <div style={{ margin: 20 }}>
            <GenresDisplay resource={resourceGenres} state={state} />
          </div>
        </div>
        <div className="col">
          {user && (
            <a
              className="btn btn-primary"
              style={{ marginTop: 20, color: "white" }}
              onClick={handleCreate}
            >
              New Movie
            </a>
          )}
          <Suspense fallback={<p>Loading</p>}>
            <MoviesDisplay
              resource={resourceMovies}
              state={state}
              setResourceMovieForm={setResourceMovieForm}
              history={history}
            />
          </Suspense>
        </div>
      </Suspense>
    </div>
  );
}

export default Movies;
