import http from "../services/httpService";
import wrapPromise from "../utils/wrapPromise";

const moviesEndpoint = "/movies";
const genresEndpoint = "/genres";
const movieEndpoint = id => `${moviesEndpoint}/${id}`;

function fetchMovieForm(id) {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const movieFormData = {};
      const { data: genresDb } = await http.get(genresEndpoint);
      movieFormData.genres = genresDb;

      if (id !== "new") {
        const { data: movieDb } = await http.get(movieEndpoint(id));
        movieFormData.movie = movieDb;
      }

      resolve(movieFormData);
    } catch (error) {
      reject(error);
    }
  });

  return wrapPromise(promise);
}

export { fetchMovieForm };
