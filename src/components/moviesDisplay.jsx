import React, { useState } from "react";
import { deleteMovieDb } from "../services/movieService";
import { toast } from "react-toastify";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import SearchInput from "./common/searchInput";
import MoviesTable from "./moviesTable";
import { fetchMovieForm } from "../services/movieFormService";

function MoviesDisplay({ resource, state, setResourceMovieForm, history }) {
  const allMoviesDb = resource.read();
  const { settings, setSettings, searchQuery, setSearchQuery } = state;
  const [allMovies, setAllMovies] = useState(allMoviesDb);

  const handleDelete = async movie => {
    const movies = allMovies;
    setAllMovies(movies.filter(m => m._id !== movie._id));

    try {
      await deleteMovieDb(movie._id);
    } catch (error) {
      if (error.response?.status === 404)
        toast.error("This post has already been deleted.");
      setAllMovies(movies);
    }
  };

  const handleLike = movie => {
    const movies = [...allMovies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    setAllMovies(movies);
  };

  const handlePageChange = page => {
    setSettings({ ...settings, currentPage: page }); // TODO:A checker si ça fonctionne
  };

  const handleSort = sortColumn => {
    setSettings({ ...settings, sortColumn }); // TODO:A checker si ça fonctionne
  };

  const handleSearch = query => {
    setSettings({
      ...settings,
      currentGenreId: "genreAll",
      currentPage: 1
    });
    setSearchQuery(query);
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();
    setResourceMovieForm(fetchMovieForm(id));
    history.push(`/movies/${id}`);
  };

  const getPagedData = () => {
    const { pageSize, currentPage, currentGenreId, sortColumn } = settings;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (currentGenreId !== "genreAll") {
      filtered = allMovies.filter(m => m.genre._id === currentGenreId);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  const { totalCount, data: movies } = getPagedData();

  return (
    <>
      <p style={{ marginTop: 20 }}>
        Showing {totalCount} movies in the database.
      </p>
      <SearchInput searchQuery={searchQuery} onChange={handleSearch} />
      <MoviesTable
        movies={movies}
        sortColumn={settings.sortColumn}
        onLike={handleLike}
        onDelete={handleDelete}
        onSort={handleSort}
        onUpdate={handleUpdate}
      />
      <Pagination
        itemsCount={totalCount}
        pageSize={settings.pageSize}
        currentPage={settings.currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default MoviesDisplay;
