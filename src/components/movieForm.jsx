import React, { useState, Suspense } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import useForm from "./common/useForm";
import { saveMovieDb } from "../services/movieService";
import { fetchMovies } from "../services/movieService";

function MovieForm({ history, resourceMovieForm, setResourceMovies }) {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <MovieFormLocal
        resource={resourceMovieForm}
        history={history}
        setResourceMovies={setResourceMovies}
      />
    </Suspense>
  );
}

const MovieFormLocal = ({ resource, history, setResourceMovies }) => {
  const movieFormData = resource.read();
  const { genres, movie } = movieFormData;
  const [movieViewModel, setMovieViewModel] = useState({
    ...(movie && { _id: movie._id }), // Conditionally add the '_id' property
    title: movie?.title ?? "",
    genreId: movie?.genre?._id ?? "",
    numberInStock: movie?.numberInStock ?? "",
    dailyRentalRate: movie?.dailyRentalRate ?? ""
  });
  const [errors, setErrors] = useState({});

  const schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .integer()
      .min(0)
      .max(100)
      .label("Number in stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Rate")
  };
  const doSubmit = async () => {
    try {
      await saveMovieDb(movieViewModel);
      setResourceMovies(fetchMovies);
      history.push(`/movies`);
    } catch (error) {
      toast.error(error.response?.data);
    }
  };

  // Use of custom hook 'useForm'
  const params = {
    data: movieViewModel,
    setData: setMovieViewModel,
    errors,
    setErrors,
    schema,
    doSubmit
  };
  const { handleSubmit, renderFormField, renderSubmitButton } = useForm(params);
  return (
    <div>
      <h1>Movie Form</h1>
      <form onSubmit={handleSubmit}>
        {renderFormField("title", "Title")}
        {renderFormField("genreId", "Genre", "select", genres)}
        {renderFormField("numberInStock", "Number in stock")}
        {renderFormField("dailyRentalRate", "Rate")}
        {renderSubmitButton("Add")}
      </form>
    </div>
  );
};

export default MovieForm;
