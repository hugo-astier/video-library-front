import http from "../services/httpService";
import wrapPromise from "../utils/wrapPromise";

const endpoint = "/movies";
const movieEndpoint = id => `${endpoint}/${id}`;

function fetchMovies() {
  const promise = http.get(endpoint).then(response => response.data);
  return wrapPromise(promise);
}

const saveMovieDb = ({ _id, ...editedMovie }) =>
  _id
    ? http.put(movieEndpoint(_id), editedMovie)
    : http.post(endpoint, editedMovie);

const deleteMovieDb = id => http.delete(movieEndpoint(id));

export { saveMovieDb, deleteMovieDb, fetchMovies };
